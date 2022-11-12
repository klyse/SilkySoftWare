using AutoMapper;
using AutoMapper.QueryableExtensions;
using JetBrains.Annotations;
using MediatR;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Web.Database;
using Web.Requests.Models;
using Web.Requests.Tags.Models;

namespace Web.Requests.Tags.GetTags;

[UsedImplicitly]
public class GetTagsQuery : IRequest<Results<Ok<PaginatedListDto<TagDto>>, NotFound>>
{
    [UsedImplicitly]
    public class Handler : IRequestHandler<GetTagsQuery, Results<Ok<PaginatedListDto<TagDto>>, NotFound>>
    {
        private readonly ICrazyContext _dbContext;
        private readonly IMapper _mapper;

        public Handler(IMapper mapper, ICrazyContext dbContext)
        {
            _mapper = mapper;
            _dbContext = dbContext;
        }

        public async Task<Results<Ok<PaginatedListDto<TagDto>>, NotFound>> Handle(GetTagsQuery request,
            CancellationToken cancellationToken)
        {
            var documents = await _dbContext.Documents
                .ProjectTo<TagDto>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

            return TypedResults.Ok(new PaginatedListDto<TagDto>
            {
                Data = documents
            });
        }
    }
}