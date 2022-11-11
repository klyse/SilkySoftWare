namespace Web.Requests.Models;

public interface IEditProperty
{
	public string Name { get; set; }

	public ValueDto ValueObj { get; set; }
}