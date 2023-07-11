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
        public async Task AddEmployee(Employee employee)
        {
            await _context.Employees.AddAsync(employee);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteEmployee(int employeeId)
        {
            _context.Employees.Remove(_context.Employees.Find(employeeId));
            await _context.SaveChangesAsync();

        }

        public async Task<Employee> GetEmployeeByFin(string fin)
        {
            return await _context.Employees.Include(x => x.Rank).
             Include(x => x.Position).FirstOrDefaultAsync(x => x.Fin == fin);
        }

        public async Task<Employee> GetEmployeeById(int employeeId)
        {
            return await _context.Employees.Include(x => x.Rank).
             Include(x => x.Position).
            FirstOrDefaultAsync(x => x.Id == employeeId);
        }

        public async Task<List<Employee>> GetEmployeeByPosition(int positionId)
        {
            return await _context.Employees.Where(x => x.PositionId == positionId).ToListAsync();
        }

        public async Task<List<Employee>> GetEmployees()
        {
            return await _context.Employees.ToListAsync();
        }

        public async Task<Employee> UpdateEmployee(Employee employee)
        {
            _context.Employees.Update(employee);
            await _context.SaveChangesAsync();
            return employee;
        }
    }

}