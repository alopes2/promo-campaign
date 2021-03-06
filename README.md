# Promo Campaign Project

Project for adding promotional campaigns for products.

## Client folder

This is our frontend client app built using [create-react-app 2.1.1](https://github.com/facebook/create-react-app)

App folders are separated by features.

### Running

You first need to install all dependencies by executing
```
npm i
```

Then just execute
```
npm start
```

Endpoints will only work after API is up

## server

Our API project.

The project was separted in API, Core features and Data access project.

### PromoCampaign (API)

This is our API

This project was built using .NET Core default React project built with
```
dotnet new webapi
```

It contains the API endpoints and serves our frontend client app.
It also contains all files related to the endpoint and project configuration.
* Controllers/Resources contains our API Resources/ViewModels .
* Controllers refers to our endpoints.
* Mappings contains our MappingProfile.cs file, which is used by AutoMapper to map domain models to resource models and vice-versa.

### PromoCampaign.Core

This project was built using .NET Core default console project built with
```
dotnet new console
```
This was selected due to some conflicts with classlib project

This project contains everything that designs our application business logics and behaviors.
* Extenstions contains all extension files like IQueryableExtensions.cs, which adds filtering methods to our IQueryable interface. 
    * IQueryObject and CampaignQuery are files used for facilitating passing query params for our endpoints and filtering queries in our database classes.

* Models contains all models used in our applications.
    * Campaign and Products refer to our domain models
    * QueryResult refer to an object containing a list from the result of a query (including pagination) and the total number of items of the query (excluding pagination)
* Services refer to all classes that are responsible to running business logic or just connecting the API to the Data project
* IUnitOfWork is the interfacing represent what the UnitOfWork should be

### PromoCampaign.Data

This project was built using .NET Core default console project built with
```
dotnet new console
```
This was selected due to some conflicts with classlib project

This project contains the connection to the database (in this case SQL Server)
* Configuration are all files to configure the domain models in the database
* Migrations contains all migrations done for the database
* Repository contains all classes that make requests to the database for that give model (Like CampaignRepository makes requests related to the Campaign model/table)
* PromoCampaignDbContext.cs is the database context for SQL Server using EntityFramework Core
* UnitOfWork is the implementation of the IUnitOfWork for EntityFramework SQL Server

### Running

To run the API you first need a up and running SQL Server in localhost:1433.
For that we used Docker by executing:
```
docker run -p 1433:1433 -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=MyComplexPassword!234' -d microsoft/mssql-server-linux
```

Set the environment as Development with
```
export ASPNETCORE_ENVIRONMENT=Development
```

After that just restore all packages with
```
dotnet restore
```

Then run the project
```
dotnet run -p PromoCampaign/PromoCampaign.csproj
```

## Nginx

This is a folder container nginx configuration for deploying using docker.
It has the purpose to route requests to the client or the server.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

```
dotnet 2.1.500
NodeJS
Docker
```
### Running

This project is set with Docker and docker-compose to run a production ready version in your local machine.
Just type
```
docker-compose up
```
And it should build the images and run the containers connected.
Once the containers are up, the application will udpate the database with the current migrations when it first runs.

If it fails, type
```
docker-compose up --build
```
To build the images again.

And if it fails again that's because the application containers is up before the database container.
Just re-run the first command.

To start using it just access http://localhost:5000

### Installing

First install the client dependencies by running the follwing command in the client folder:

```
npm install
```

Then you need to restore the dotnet dependencies by running the following command in the server folder

```
dotnet restore
```

To get a functional SQL Server running you can run the following docker command

```
docker run -p 1433:1433 -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=MyComplexPassword!234' -d microsoft/mssql-server-linux
```

Then just run the following command for running the application

```
dotnet run -p PromoCampaign/PromoCampaign.csproj
```

And the client app

```
npm start
```

To start using it just access http://localhost:3000

In this setup the API should be accessible from http://localhost:5000/api/{endpoint}

## Running tests

### Backend

To run backend unit tests you need to navigate to PromoCampaign.Tests project folder in the server foler
```
cd ./server/PromoCampaign.Tests
```

And then just run
```
dotnet test
```

### Frontend

There wasn't any custom tests built yet, just the ones that comes from create-react-app

To run test you need to navigate to the Client folder

And then just run 
```
npm test
```

## Built With

* [.NET Core 2.1.500](https://docs.microsoft.com/en-us/dotnet/core/) - Backend Framwork
* [ReactJS 16.6](https://reactjs.org/docs/getting-started.html) - Frontend Framework
* [Entity Framework Core](https://docs.microsoft.com/en-us/ef/core/) - Used to connect to the database
* [AutoMapper](http://docs.automapper.org/en/stable/) - Used to map domain models to api resources/viewmodels and vice-versa
* [Bootstrap (3.3.7)](https://getbootstrap.com/docs/3.3/) - Frontend Style Framework
* [React-Bootstrap](https://react-bootstrap.github.io/getting-started/introduction) - React Boostrap implementation
* [React-Dates](https://github.com/airbnb/react-dates) - Airbnb react library to select dates
* [Moment](https://momentjs.com/docs/) - Used as dependecy for React-Dates
* [Aphrodite](https://github.com/Khan/aphrodite) - Used for style theme dependency in react-dates
* [react-with-styles-interface-aphrodite](https://github.com/airbnb/react-with-styles-interface-aphrodite) - Interface to use react-with-styles with Aphrodite
* [Docker](https://www.docker.com/get-started) - Used to deploy application to containers
* [XUnit](https://xunit.github.io) - Testing framework
* [Moq](https://github.com/moq/moq4/) - Used for mocking classes in test unit