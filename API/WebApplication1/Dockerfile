# Use the official ASP.NET Core image
FROM mcr.microsoft.com/dotnet/core/aspnet:3.1

# Set the working directory
WORKDIR /app

# Copy the published output of the ASP.NET Core app to the container
COPY bin/Release/netcoreapp3.1/publish/ .

# Expose the port that the app will run on
EXPOSE 80

# Start the ASP.NET Core app
ENTRYPOINT ["dotnet", "YourAspNetApp.dll"]
