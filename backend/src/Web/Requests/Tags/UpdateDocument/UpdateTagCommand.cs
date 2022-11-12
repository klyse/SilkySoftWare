using AutoMapper;
using JetBrains.Annotations;
using MediatR;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Web.Database;
using Web.Requests.Documents.Models;

namespace Web.Requests.Documents.UpdateDocument;

[UsedImplicitly]
public class UpdateTagCommand : IRequest<Results<Ok<TagDto>, NotFound, BadRequest>>
{
    [FromBody]
    public Dictionary<string, string> Values { get; set; }
    public string Id { get; set; }

    [UsedImplicitly]
    public class Handler : IRequestHandler<UpdateTagCommand, Results<Ok<TagDto>, NotFound, BadRequest>>
    {
        private readonly ICrazyContext _dbContext;
        private readonly IMapper _mapper;

        public Handler(IHttpContextAccessor httpContextAccessor, ICrazyContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<Results<Ok<TagDto>, NotFound, BadRequest>> Handle(UpdateTagCommand request,
            CancellationToken cancellationToken)
        {
            var item = await _dbContext.Documents
                .SingleOrDefaultAsync(c => c.TagId == request.Id, cancellationToken);

            if (item is null)
                return TypedResults.NotFound();

            item.Values = request.Values;

            await _dbContext.SaveChangesAsync(cancellationToken);

            return TypedResults.Ok(_mapper.Map<TagDto>(item));
        }
    }
}