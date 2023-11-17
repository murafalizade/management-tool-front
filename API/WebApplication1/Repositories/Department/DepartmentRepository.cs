using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Models;

namespace WebApplication1.Repositories
{
    public class DepartmentRepository : IDepartmentRepository
    {
        private readonly ApplicationDbContext _appDbContext;
        public DepartmentRepository(ApplicationDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }
        public async Task<Department> AddDepartment(Department department)
        {
            var result = await _appDbContext.Departments.AddAsync(department);
            await _appDbContext.SaveChangesAsync();
            return result.Entity;
        }
        public async Task<Department> DeleteDepartment(int departmentId)
        {
            var result = await _appDbContext.Departments.FirstOrDefaultAsync(e => e.Id == departmentId);
            if (result != null)
            {
                _appDbContext.Departments.Remove(result);
                await _appDbContext.SaveChangesAsync();
                return result;
            }
            return null;
        }
        public async Task<Department> GetDepartment(int departmentId)
        {
            return await _appDbContext.Departments.Include(e => e.Adminstration).Include(x => x.Positions).
            FirstOrDefaultAsync(e => e.Id == departmentId);
        }
        public async Task<List<Department>> GetDepartments()
        {
            return await _appDbContext.Departments.ToListAsync();
        }
        public async Task<Department> UpdateDepartment(Department department)
        {
            return await _appDbContext.Departments.FirstOrDefaultAsync(e => e.Id == department.Id);
        }
    }
}