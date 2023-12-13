USE master;
GO

-- Extract the database name from the connection string
DECLARE @databaseName NVARCHAR(50)
SET @databaseName = 'MillitaryAccountingSystem'

-- Check if the database already exists
IF NOT EXISTS (SELECT name FROM master.sys.databases WHERE name = @databaseName)
BEGIN
    -- Create the database
    CREATE DATABASE [MillitaryAccountingSystem];
END
GO
