using AutoMapper;
using JetBrains.Annotations;
using Web.Database.Entities;

namespace Web.Requests.Tags.Models;

[UsedImplicitly]
public class TagProfile : Profile
{
	public TagProfile()
	{
		CreateMap<Tag, TagDto>();
	}
}