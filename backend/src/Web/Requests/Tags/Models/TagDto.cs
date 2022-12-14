using JetBrains.Annotations;

namespace Web.Requests.Tags.Models;

[UsedImplicitly]
public struct TagDto
{
	public Guid Id { get; set; }
	public string? TagId { get; set; }

	public Dictionary<string,string>? Values { get; set; }
}