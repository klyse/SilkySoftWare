using JetBrains.Annotations;
using Microsoft.AspNetCore.Mvc;
using Sieve.Models;

namespace Web.Requests.Models;

public class SieveWrapper
{
	[UsedImplicitly]
	[FromQuery]
	public string? Filters { get; set; }

	[UsedImplicitly]
	[FromQuery]
	public string? Sorts { get; set; }

	[UsedImplicitly]
	[FromQuery]
	public int? Page { get; set; }

	[UsedImplicitly]
	[FromQuery]
	public int? PageSize { get; set; }

	protected SieveModel GetSieve() => new()
	{
		Filters = Filters,
		Sorts = Sorts,
		Page = Page,
		PageSize = PageSize
	};
}