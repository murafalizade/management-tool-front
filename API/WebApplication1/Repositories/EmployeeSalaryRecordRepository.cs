using System.Collections.Generic;
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

        public Task<EmployeeSalaryRecord> GetEmployeeById(int employeeId)
        {
            return _context.EmployeeSalaryRecords.
            Include(x => x.Employee).
            Include(x => x.Employee.Rank).
            FirstOrDefaultAsync(x => x.Id == employeeId);
        }

        public async Task<List<EmployeeSalaryRecord>> GetEmployees()
        {
            return await _context.EmployeeSalaryRecords.Include(x => x.Employee).
            Include(x => x.Employee.Rank).
            Include(x => x.Employee.Position).
            ToListAsync();
        }

        public async Task<EmployeeSalaryRecord> UpdateEmployee(EmployeeSalaryRecord employee)
        {
            _context.EmployeeSalaryRecords.Update(employee);
            await _context.SaveChangesAsync();
            return employee;
        }
    }
}