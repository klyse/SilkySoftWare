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
public class UpdateDocumentCommand : IRequest<Results<Ok<DocumentDto>, NotFound, BadRequest>>
{
    [FromBody]
    public Dictionary<string, string> Values { get; set; }
    public Guid Id { get; set; }

    [UsedImplicitly]
    public class Handler : IRequestHandler<UpdateDocumentCommand, Results<Ok<DocumentDto>, NotFound, BadRequest>>
    {
        private readonly ICrazyContext _dbContext;
        private readonly IMapper _mapper;

        public Handler(IHttpContextAccessor httpContextAccessor, ICrazyContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<Results<Ok<DocumentDto>, NotFound, BadRequest>> Handle(UpdateDocumentCommand request,
            CancellationToken cancellationToken)
        {
            var item = await _dbContext.Documents
                .SingleOrDefaultAsync(c => c.Id == request.Id, cancellationToken);

            if (item is null)
                return TypedResults.NotFound();

            item.Values = request.Values;

            await _dbContext.SaveChangesAsync(cancellationToken);

            return TypedResults.Ok(_mapper.Map<DocumentDto>(item));
        }
    }
}