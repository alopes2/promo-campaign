FROM microsoft/dotnet:sdk AS build-env
WORKDIR /app

# Copy csproj and restore as distinct layers
COPY PromoCampaign/*.csproj ./PromoCampaign/
COPY PromoCampaign.Core/*.csproj ./PromoCampaign.Core/
COPY PromoCampaign.Data/*.csproj ./PromoCampaign.Data/
COPY PromoCampaign.Tests/*.csproj ./PromoCampaign.Tests/
COPY *.sln ./
RUN dotnet restore

# Copy everything else and build
COPY . ./
RUN dotnet publish -c Release -o out

# Build runtime image
FROM microsoft/dotnet:aspnetcore-runtime
WORKDIR /app
COPY --from=build-env /app/PromoCampaign/out .
EXPOSE 80
ENTRYPOINT ["dotnet", "PromoCampaign.dll"]