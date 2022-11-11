using AutoMapper;
using AutoMapper.QueryableExtensions;
using JetBrains.Annotations;
using MediatR;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sieve.Services;
using Web.Database;
using Web.Requests.Documents.Models;
using Web.Requests.Models;

namespace Web.Requests.Documents.GetDocuments;

[UsedImplicitly]
public class GetDocumentsQuery : SieveWrapper, IRequest<Results<Ok<PaginatedListDto<DocumentDto>>, NotFound>>
{
    [UsedImplicitly]
    public class Handler : IRequestHandler<GetDocumentsQuery, Results<Ok<PaginatedListDto<DocumentDto>>, NotFound>>
    {
        private readonly ICrazyContext _dbContext;
        private readonly IMapper _mapper;

        public Handler(IMapper mapper, ICrazyContext dbContext)
        {
            _mapper = mapper;
            _dbContext = dbContext;
        }

        public async Task<Results<Ok<PaginatedListDto<DocumentDto>>, NotFound>> Handle(GetDocumentsQuery request,
            CancellationToken cancellationToken)
        {
            var documents = await _dbContext.Documents
                .ProjectTo<DocumentDto>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

            return TypedResults.Ok(new PaginatedListDto<DocumentDto>
            {
                Data = documents
            });
        }
    }
}