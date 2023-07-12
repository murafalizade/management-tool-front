using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Models;
using WebApplication1.Repositories;

namespace WebApplication1.Repositories
{
    class EmployeeSalaryRecordRepository : IEmployeeSalaryRecordRepository
    {
        private readonly ApplicationDbContext _context;
        public EmployeeSalaryRecordRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task AddEmployee(EmployeeSalaryRecord employee)
        {
            await _context.EmployeeSalaryRecords.AddAsync(employee);
            await _context.SaveChangesAsync();
        }

        public Task<List<EmployeeSalaryRecord>> GetEmployeeById(int employeeId, int year)
        {
            return _context.EmployeeSalaryRecords.
            Include(x => x.Employee).
            Include(x => x.Employee.Rank).
            Include(x => x.Employee.Position).
            Include(x => x.Employee.Position.Department).
            Include(x => x.Employee.Position.Department.Adminstration).
            Where(x => x.EmployeeId == employeeId && x.RecordDate.Year == year).ToListAsync();
        }

        public async Task<EmployeeSalaryRecord> GetEmployeeById(int id)
        {
            return await _context.EmployeeSalaryRecords.Include(x => x.Employee).
            Include(x => x.Employee.Rank).
            Include(x => x.Employee.Position).
            Include(x => x.Employee.Position.Department).
            Include(x => x.Employee.Position.Department.Adminstration).
            FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<EmployeeSalaryRecord>> GetEmployees(int month, int year)
        {
            return await _context.EmployeeSalaryRecords.Include(x => x.Employee).
            Include(x => x.Employee.Rank).
            Include(x => x.Employee.Position).
            Include(x => x.Employee.Position.Department).
            Include(x => x.Employee.Position.Department.Adminstration).
            Where(x => x.RecordDate.Year == year && x.RecordDate.Month == month).
            ToListAsync();
        }

        public async Task<EmployeeSalaryRecord> GetLastEmployeeRecord()
        {
            return await _context.EmployeeSalaryRecords.OrderByDescending(e => e.Id).FirstAsync();
        }

        public async Task<EmployeeSalaryRecord> UpdateEmployee(EmployeeSalaryRecord employee)
        {
            var existingEmployee = await _context.EmployeeSalaryRecords.FindAsync(employee.Id);

            if (existingEmployee == null)
            {
                System.Console.WriteLine("Employee not found.");
                // Handle the case where the employee record is not found.
                // You might throw an exception or return an appropriate response.
                // For example:
                // throw new NotFoundException("Employee not found.");
                // or
                // return NotFound();
            }

            // Update the properties of the existingEmployee object with the values from the employee parameter.
            existingEmployee.XariciDil = employee.XariciDil;
            existingEmployee.ElmiDerece = employee.ElmiDerece;
            existingEmployee.Aliment = employee.Aliment;
            existingEmployee.BPM = employee.BPM;
            existingEmployee.DSMF = employee.DSMF;
            existingEmployee.Comment = employee.Comment;
            existingEmployee.RankSalary = employee.RankSalary;
            existingEmployee.PositionSalary = employee.PositionSalary;
            existingEmployee.Kibertehlukesizlik = employee.Kibertehlukesizlik;
            existingEmployee.FexriAd = employee.FexriAd;
            existingEmployee.Meharetlilik = employee.Meharetlilik;
            existingEmployee.Kesfiyyat = employee.Kesfiyyat;
            existingEmployee.Temsilcilik = employee.Temsilcilik;
            existingEmployee.Zererlilik = employee.Zererlilik;
            existingEmployee.Tax = employee.Tax;
            existingEmployee.Kesirler =  employee.Kesirler;
            existingEmployee.Extra211100 = employee.Extra211100;
            existingEmployee.HealthInsurance = employee.HealthInsurance;
            existingEmployee.AccountNumber = employee.AccountNumber;

            // existingEmployee.TotalSalary = employee.TotalSalary;



            await _context.SaveChangesAsync();
            return existingEmployee;
        }

    }
}