FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build-env
WORKDIR /app

ARG VERSION=manual
ENV VERSION=$VERSION

COPY . ./
RUN dotnet publish Web -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /app
COPY --from=build-env /app/out .

ARG PORT=5042

ENV ASPNETCORE_URLS=http://+:$PORT
EXPOSE $PORT

CMD ["/EventHandler"]
ENTRYPOINT ["dotnet", "Web.dll"]
