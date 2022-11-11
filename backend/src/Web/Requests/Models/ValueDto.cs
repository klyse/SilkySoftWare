using System.Text.Json;
using JetBrains.Annotations;
using Microsoft.AspNetCore.Mvc;

namespace Web.Requests.Models;

[UsedImplicitly]
public record ValueDto([FromBody] JsonElement Value);