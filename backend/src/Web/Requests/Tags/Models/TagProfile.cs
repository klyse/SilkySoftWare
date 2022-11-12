using AutoMapper;
using JetBrains.Annotations;
using Web.Database.Entities;

namespace Web.Requests.Documents.Models;

[UsedImplicitly]
public class TagProfile : Profile
{
	public TagProfile()
	{
		CreateMap<Document, TagDto>();
	}
}