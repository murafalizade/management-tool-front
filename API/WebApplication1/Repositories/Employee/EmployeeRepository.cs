using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Models;
using WebApplication1.Repositories;

namespace WebApplication1.Repositories
{
    class EmployeeRepository : IEmployeeRepository
    {
        private readonly ApplicationDbContext _context;
        public EmployeeRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<int> AddEmployee(Employee employee)
        {
            await _context.Employees.AddAsync(employee);
            await _context.SaveChangesAsync();
            return employee.Id;
        }

        public async Task DeleteEmployee(int employeeId)
        {
            _context.Employees.Remove(_context.Employees.Find(employeeId));
            await _context.SaveChangesAsync();

        }

        public async Task<Employee> GetEmployeeByFin(string fin)
        {
            return await _context.Employees.FirstOrDefaultAsync(x => x.Fin == fin);
        }

        public async Task<Employee> GetEmployeeById(int employeeId)
        {
            return await _context.Employees.
            FirstOrDefaultAsync(x => x.Id == employeeId);
        }

        public async Task<List<EmployeeSalaryRecord>> GetEmployeeByPosition(int positionId)
        {
            return await _context.EmployeeSalaryRecords.Where(x => x.PositionId == positionId && 
            x.RecordDate.Month == DateTime.Now.Month && x.RecordDate.Year == DateTime.Now.Year)
            .Include(x => x.Employee).ToListAsync();
        }

        public async Task<List<Employee>> GetEmployees()
        {
            return await _context.Employees.ToListAsync();
        }

        public async Task<Employee> UpdateEmployee(Employee employee)
        {
            var existingEmployee = await _context.Employees.FindAsync(employee.Id);

            if (existingEmployee == null)
            {
                // Handle error or return null if the employee doesn't exist
                return null;
            }

            // Get the type of the Employee class
            var employeeType = typeof(Employee);

            // Get the properties of the Employee class
            var properties = employeeType.GetProperties();

            foreach (var property in properties)
            {
                // Skip properties that are null in the updatedEmployee
                var updatedValue = property.GetValue(employee);

                if (updatedValue != null)
                {
                    // Set the corresponding property value in the existingEmployee
                    property.SetValue(existingEmployee, updatedValue);
                }
            }
            await _context.SaveChangesAsync();
            return employee;

        }
    }

}