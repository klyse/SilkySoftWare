using System.Diagnostics;
using System.Text.Json.Serialization;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Serilog;
using Sieve.Services;
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
        .WriteTo.Sentry()
        .WriteTo.Console(outputTemplate: outputTemplate);

    return loggerConfig;
}

Log.Logger = ConfigureLogger(new LoggerConfiguration())
    .CreateBootstrapLogger();

var builder = WebApplication.CreateBuilder(args);

builder.Logging.ClearProviders();

builder.Host.UseSerilog((context, _, loggerConfig) =>
    ConfigureLogger(loggerConfig).ReadFrom.Configuration(context.Configuration));
builder.WebHost.UseSentry();

builder.Services
    // enums should be returned as strings
    .Configure<Microsoft.AspNetCore.Http.Json.JsonOptions>(c =>
        c.SerializerOptions.Converters.Add(new JsonStringEnumConverter()))
    // configure newtonsoft enum conversion too as swagger uses that one
    .Configure<JsonOptions>(c => c.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()))
    .AddHttpContextAccessor()
    .AddAutoMapper(typeof(Program))
    .AddMediatR(typeof(Program))
    .AddScoped<ISieveProcessor, SieveProcessor>()
    .AddCors(c => c.AddDefaultPolicy(p => p
        .WithOrigins(
            new[] { "http://localhost:3000" })
        .SetIsOriginAllowedToAllowWildcardSubdomains()
        .AllowAnyHeader()
        .AllowCredentials()
        .AllowAnyMethod()
        .SetPreflightMaxAge(TimeSpan.FromDays(1))
    ))
    .AddEndpointsApiExplorer();

builder.Services.AddDbContext<ICrazyContext, CrazyContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("Db")!));

builder.Services.AddEndpointsApiExplorer();
builder.Services
    .AddSwaggerGen(c => { });

builder.Services.AddTransient<IStartupFilter, DataContextAutomaticMigrationStartupFilter<CrazyContext>>();

var app = builder.Build();

app.UseSerilogRequestLogging();

var documentsGroup = app.MapGroup("/tags");
documentsGroup.MediatePost<CreateDocumentCommand, Results<Created<DocumentDto>, BadRequest>>();
documentsGroup.MediateGet<GetDocumentsQuery, Results<Ok<PaginatedListDto<DocumentDto>>, NotFound>>();
documentsGroup.MediatePatch<UpdateDocumentCommand, Results<Ok<DocumentDto>, NotFound, BadRequest>>("/{Id:guid}");

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