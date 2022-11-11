#pragma warning disable CS8618

namespace Web.Requests.Models;

public struct PaginatedListDto<TType>
{
	public ICollection<TType> Data { get; set; }
}