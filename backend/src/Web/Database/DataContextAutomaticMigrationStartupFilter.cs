using Microsoft.EntityFrameworkCore;
using Serilog;
using ILogger = Serilog.ILogger;

namespace Web.Database;

public class DataContextAutomaticMigrationStartupFilter<T> : IStartupFilter where T : DbContext
{
	private static readonly ILogger Logger = Log.ForContext(typeof(DataContextAutomaticMigrationStartupFilter<T>));

	public Action<IApplicationBuilder> Configure(Action<IApplicationBuilder> next) =>
		app =>
		{
			using (var scope = app.ApplicationServices.CreateScope())
			{
				Logger.Debug("Checking if migrations need to be applied");

				var db = scope.ServiceProvider.GetRequiredService<T>().Database;

				var pendingMigrations = db.GetPendingMigrations().ToList();

				if (pendingMigrations.Any())
				{
					Logger.Debug("Migrations to apply: {@Migrations}", pendingMigrations);

					db.Migrate();

					Logger.Information("Applied migrations");
				}
			}

			next(app);
		};
}