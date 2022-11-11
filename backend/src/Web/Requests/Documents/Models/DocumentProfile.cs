using AutoMapper;
using JetBrains.Annotations;
using Web.Database.Entities;

namespace Web.Requests.Documents.Models;

[UsedImplicitly]
public class DocumentProfile : Profile
{
	public DocumentProfile()
	{
		CreateMap<Document, DocumentDto>();
	}
}