# Use the official SQL Server 2019 image
FROM mcr.microsoft.com/mssql/server:2019-latest

# Set environment variables
ENV SA_PASSWORD=Murad1979
ENV ACCEPT_EULA=Y

# Create a new database and user
ENV MSSQL_DB_NAME=MillitaryAccountingSystem
ENV MSSQL_DB_USER=testUser
ENV MSSQL_DB_PASSWORD=Murad1979

# Copy SQL script to initialize the database
COPY init.sql /docker-entrypoint-initdb.d/
