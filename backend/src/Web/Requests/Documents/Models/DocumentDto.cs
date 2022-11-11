using JetBrains.Annotations;

namespace Web.Requests.Documents.Models;

[UsedImplicitly]
public struct DocumentDto
{
	public Guid Id { get; set; }
	
	public Dictionary<string,string> Values { get; set; }
}