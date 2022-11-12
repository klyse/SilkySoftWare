using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Web.Database.Entities;

namespace Web.Database;

public interface ICrazyContext
{
	DbSet<Tag> Documents { get; }
	DbSet<TEntity> Set<TEntity>() where TEntity : class;
	EntityEntry<TEntity> Entry<TEntity>(TEntity entity) where TEntity : class;

	Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}