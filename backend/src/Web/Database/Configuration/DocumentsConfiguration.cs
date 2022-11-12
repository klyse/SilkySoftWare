using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Web.Database.Entities;

namespace Web.Database.Configuration;

public class DocumentsConfiguration : IEntityTypeConfiguration<Tag>
{
	public void Configure(EntityTypeBuilder<Tag> builder)
	{
		builder.ToTable("tags")
			.HasKey(c => c.Id);

		builder.Property(c => c.Id)
			.ValueGeneratedOnAdd();

		builder.Property(c => c.Values)
			.HasConversion(
				v => JsonSerializer.Serialize(v, JsonSerializerOptions.Default),
				v => JsonSerializer.Deserialize<Dictionary<string, string>>(v, JsonSerializerOptions.Default));

		builder.HasQueryFilter(c => c.DeletedDateTime == null);
	}
}