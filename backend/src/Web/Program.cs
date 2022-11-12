using System.Diagnostics;
using System.Text.Json.Serialization;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Serilog;
using Web.Database;
using Web.Requests;
using Web.Requests.Documents.CreateDocument;
using Web.Requests.Documents.GetDocuments;
using Web.Requests.Documents.Models;
using Web.Requests.Documents.UpdateDocument;
using Web.Requests.Models;

static LoggerConfiguration ConfigureLogger(LoggerConfiguration loggerConfig)
{
    var outputTemplate = Debugger.IsAttached
        ? "[{Timestamp:HH:mm:ss} {Level:u3}] {Message:lj} => {SourceContext}{NewLine}{Exception}"
        : "[{Timestamp:HH:mm:ss} {Level:u3}] {Message:lj}{NewLine}{Exception}";
    loggerConfig
        .Enrich.FromLogContext()
        .WriteTo.Console(outputTemplate: outputTemplate);

    return loggerConfig;
}

Log.Logger = ConfigureLogger(new LoggerConfiguration())
    .CreateBootstrapLogger();

var builder = WebApplication.CreateBuilder(args);

builder.Logging.ClearProviders();

builder.Host.UseSerilog((context, _, loggerConfig) =>
    ConfigureLogger(loggerConfig).ReadFrom.Configuration(context.Configuration));

builder.Services
    // enums should be returned as strings
    .Configure<Microsoft.AspNetCore.Http.Json.JsonOptions>(c =>
        c.SerializerOptions.Converters.Add(new JsonStringEnumConverter()))
    // configure newtonsoft enum conversion too as swagger uses that one
    .Configure<JsonOptions>(c => c.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()))
    .AddHttpContextAccessor()
    .AddAutoMapper(typeof(Program))
    .AddMediatR(typeof(Program))
    .AddCors(c => c.AddDefaultPolicy(p => p
        .WithOrigins("http://localhost:3000", "http://localhost:5000")
        .AllowAnyHeader()
        .AllowCredentials()
        .AllowAnyMethod()))
    .AddEndpointsApiExplorer()
    .AddSignalR();

builder.Services.AddDbContext<ICrazyContext, CrazyContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("Db")!));

builder.Services.AddEndpointsApiExplorer();
builder.Services
    .AddSwaggerGen(c => { });

builder.Services.AddTransient<IStartupFilter, DataContextAutomaticMigrationStartupFilter<CrazyContext>>();

var app = builder.Build();

app.UseSerilogRequestLogging();

var documentsGroup = app.MapGroup("/tags");
documentsGroup.MediatePost<CreateTagCommand, Results<Created<TagDto>, BadRequest>>();
documentsGroup.MediateGet<GetTagsQuery, Results<Ok<PaginatedListDto<TagDto>>, NotFound>>();
documentsGroup.MediatePatch<UpdateTagCommand, Results<Ok<TagDto>, NotFound, BadRequest>>("/{Id}");
documentsGroup.MapPost("/scan/{Id}",(string Id, [FromServices] IHubContext<MyHub> hub) =>
{
    Log.Information("Scanned {Id}", Id);
    return hub.Clients.All.SendCoreAsync("scanned", new[] { Id });
});


documentsGroup.MapHub<MyHub>("/scan-hub");

if (app.Environment.IsDevelopment())
    app.UseSwagger()
        .UseSwaggerUI();

app.UseCors();

// validate mapper when in develop
if (app.Environment.IsDevelopment())
{
    var mapper = app.Services.GetRequiredService<IMapper>();
    mapper.ConfigurationProvider.AssertConfigurationIsValid();
}

app.Run();