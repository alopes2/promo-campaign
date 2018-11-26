FROM microsoft/dotnet:sdk AS build-env
WORKDIR /app
RUN apt-get install curl
RUN curl -sL https://deb.nodesource.com/setup_11.x | bash
RUN apt-get install nodejs

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
ENTRYPOINT ["dotnet", "PromoCampaign.dll"]