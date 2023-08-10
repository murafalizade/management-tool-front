using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using WebApplication1.Data;
using WebApplication1.Models;

namespace WebApplication1.Helpers
{
    public static class DataSeeder
    {
        //public static async void SeedData(IServiceProvider serviceProvider)
        //{
        //    //using (var scope = serviceProvider.CreateScope())
        //    //{
        //    //    var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

        //    //    if (!dbContext.Employees.Any())
        //    //    {
        //    //        var Rank = new List<Rank>
        //    //{
        //    //    new Rank {  Name = "org", Salary = 1223, ShortName = "org"  },
        //    //};
        //    //        dbContext.Ranks.AddRange(Rank);
        //    //        dbContext.SaveChanges();

        //    //        var Department = new List<Department>
        //    //{
        //    //    new Department {  Name = "test"  },
        //    //};

        //    //        var Position = new List<Position>
        //    //{
        //    //    new Position { Name = "test", Salary = 23, DepartmentId = 1  },
        //    //};

        //    //        dbContext.Positions.AddRange(Position);
        //    //        dbContext.SaveChanges();

        //    //        // Create and add the initial employee data
        //    //        var employees = new List<Employee>
        //    //{
        //    //    new Employee {
        //    //        LastName = "Doe",
        //    //        FirstName = "John",
        //    //        PositionId = 1,
        //    //        RankId = 1,
        //    //        InjuranceNo  = "123456789",
        //    //        FatherName = "Father"
        //    //     },
        //    //};

        //    //        dbContext.Employees.AddRange(employees);
        //    //        dbContext.SaveChanges();

        //    //        Console.WriteLine(employees[0].Id);

        //    //        Employee employee = await dbContext.Employees.
        //    //        Include(x => x.Rank).
        //    //        Include(x => x.Position).
        //    //        FirstOrDefaultAsync(x => x.Id == employees[0].Id);

        //    //        Console.WriteLine(employee.Id);

        //    //        var EmployeeSalaryRecord = new List<EmployeeSalaryRecord>
        //    //{
        //    //    new EmployeeSalaryRecord {
        //    //        Employee = employee,
        //    //        RankSalary = 0,
        //    //        PositionSalary = 0,
        //    //     },
        //    //};

        //    //        dbContext.EmployeeSalaryRecords.AddRange(EmployeeSalaryRecord);
        //    //        dbContext.SaveChanges();

        //    //    }
        //    //}
        //}
    }
}