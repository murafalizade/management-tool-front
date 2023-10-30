using System.Collections.Generic;
using System.Threading.Tasks;
using WebApplication1.Models;
namespace WebApplication1.Repositories
{
    public interface IDepartmentRepository
    {
        Task<List<Department>> GetDepartments();
        Task<Department> GetDepartment(int departmentId);
        Task<Department> AddDepartment(Department department);
        Task<Department> UpdateDepartment(Department department);
        Task<Department> DeleteDepartment(int departmentId);
    }
}
