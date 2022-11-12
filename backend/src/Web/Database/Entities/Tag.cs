namespace Web.Database.Entities;

public class Tag : BaseEntity
{
	public Guid Id { get; set; }
	public string? TagId { get; set; }

	public Dictionary<string,string>? Values { get; set; }
}