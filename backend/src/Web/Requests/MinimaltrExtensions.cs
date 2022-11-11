using System.Diagnostics.CodeAnalysis;
using MediatR;

namespace Web.Requests;

public static class MinimaltrExtensions
{
	public static RouteHandlerBuilder MediateGet<TRequest, TResults>(this IEndpointRouteBuilder app, [StringSyntax("Route")] string pattern = "")
		where TRequest : IRequest<TResults> =>
		app.MapGet(pattern, async (IMediator mediator, [AsParameters] TRequest request) => await mediator.Send(request));

	public static RouteHandlerBuilder MediatePost<TRequest, TResults>(this IEndpointRouteBuilder app, [StringSyntax("Route")] string pattern = "")
		where TRequest : IRequest<TResults> =>
		app.MapPost(pattern, async (IMediator mediator, [AsParameters] TRequest request) => await mediator.Send(request));

	public static RouteHandlerBuilder MediatePut<TRequest, TResults>(this IEndpointRouteBuilder app, [StringSyntax("Route")] string pattern = "")
		where TRequest : IRequest<TResults> =>
		app.MapPut(pattern, async (IMediator mediator, [AsParameters] TRequest request) => await mediator.Send(request));

	public static RouteHandlerBuilder MediateDelete<TRequest, TResults>(this IEndpointRouteBuilder app, [StringSyntax("Route")] string pattern = "")
		where TRequest : IRequest<TResults> =>
		app.MapDelete(pattern, async (IMediator mediator, [AsParameters] TRequest request) => await mediator.Send(request));

	public static RouteHandlerBuilder MediatePatch<TRequest, TResults>(this IEndpointRouteBuilder app, [StringSyntax("Route")] string pattern = "")
		where TRequest : IRequest<TResults> =>
		app.MapPatch(pattern, async (IMediator mediator, [AsParameters] TRequest request) => await mediator.Send(request));
}