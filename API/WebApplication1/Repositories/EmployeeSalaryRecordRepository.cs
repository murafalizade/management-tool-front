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
            _context.EmployeeSalaryRecords.Update(employee);
            await _context.SaveChangesAsync();
            return employee;
        }
    }
}