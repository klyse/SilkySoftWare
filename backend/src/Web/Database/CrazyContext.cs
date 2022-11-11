using Microsoft.EntityFrameworkCore;
using Web.Database.Entities;

namespace Web.Database;

public class CrazyContext : DbContext, ICrazyContext
{
	public CrazyContext(DbContextOptions<CrazyContext> options) : base(options)
	{
	}

	public DbSet<Document> Documents => Set<Document>();
	public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
	{
		AddTimestamps();
		HandleSoftDelete();
		return await base.SaveChangesAsync(cancellationToken);
	}

	private void AddTimestamps()
	{
		var changes = ChangeTracker.Entries<BaseEntity>().Where(x => x.State is EntityState.Added or EntityState.Modified);

		foreach (var change in changes)
		{
			if (change.State == EntityState.Added) change.Entity.CreatedDateTime = DateTimeOffset.UtcNow;

			change.Entity.ModifiedDateTime = DateTimeOffset.UtcNow;
		}
	}

	private void HandleSoftDelete()
	{
		var changes = ChangeTracker.Entries<BaseEntity>().Where(x => x.State is EntityState.Added or EntityState.Deleted);

		foreach (var change in changes)
		{
			switch (change.State)
			{
				case EntityState.Added:
					if (change.Entity.DeletedDateTime is not null) change.Entity.DeletedDateTime = null;

					break;

				case EntityState.Deleted:
					change.State = EntityState.Modified;
					change.Entity.DeletedDateTime = DateTimeOffset.UtcNow;
					break;
			}
		}
	}


	protected override void OnModelCreating(ModelBuilder modelBuilder)
	{
		base.OnModelCreating(modelBuilder);
		modelBuilder.ApplyConfigurationsFromAssembly(typeof(CrazyContext).Assembly);

		// todo add bulk deleted query filter?
		// https://docs.microsoft.com/en-gb/ef/core/modeling/bulk-configuration
	}
}