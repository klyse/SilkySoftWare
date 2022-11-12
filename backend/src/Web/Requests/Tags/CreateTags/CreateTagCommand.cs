using AutoMapper;
using JetBrains.Annotations;
using MediatR;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Serilog;
using Web.Database;
using Web.Database.Entities;
using Web.Requests.Tags.Models;
using ILogger = Serilog.ILogger;

namespace Web.Requests.Tags.CreateTags;

[UsedImplicitly]
public class CreateTagCommand : IRequest<Results<Created<TagDto>, BadRequest>>
{
	private static readonly ILogger Logger = Log.ForContext<CreateTagCommand>();

	[FromBody]
	public Dictionary<string, string> Values { get; set; }

	[UsedImplicitly]
	public class Handler : IRequestHandler<CreateTagCommand, Results<Created<TagDto>, BadRequest>>
	{
		private readonly ICrazyContext _dbContext;
		private readonly IMapper _mapper;

		public Handler(ICrazyContext dbContext, IMapper mapper)
		{
			_dbContext = dbContext;
			_mapper = mapper;
		}

		public async Task<Results<Created<TagDto>, BadRequest>> Handle(CreateTagCommand request, CancellationToken cancellationToken)
		{
			var doc = _dbContext.Documents.Add(new Tag
			{
				Values = request.Values
			});

			await _dbContext.SaveChangesAsync(cancellationToken);

			return TypedResults.Created($"/{doc.Entity.Id}", _mapper.Map<TagDto>(doc.Entity));
		}
	}
}