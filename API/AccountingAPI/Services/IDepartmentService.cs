using System.Collections.Generic;
using System.Threading.Tasks;
using WebApplication1.Dtos;
using WebApplication1.Models;
namespace WebApplication1.Services
{
    public interface IDepartmentService
    {
        Task<ErrorHandelerDto> GetDepartments();
        Task<ErrorHandelerDto> GetDepartment(int departmentId);
        Task<ErrorHandelerDto> AddDepartment(DepartmentInputDto department);
        Task<ErrorHandelerDto> UpdateDepartment(Department department);
        Task<ErrorHandelerDto> DeleteDepartment(int departmentId);
        Task<ErrorHandelerDto> SaveDepartment(List<DepartmentBasicDto> department);
    }
}