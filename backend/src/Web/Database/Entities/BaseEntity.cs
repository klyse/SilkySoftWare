namespace Web.Database.Entities;

/// <summary>
///     Base documents for all entities
/// </summary>
public abstract class BaseEntity
{
	public DateTimeOffset CreatedDateTime { get; set; }
	public DateTimeOffset ModifiedDateTime { get; set; }
	public DateTimeOffset? DeletedDateTime { get; set; }
}