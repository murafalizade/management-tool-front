using System.Collections.Generic;
using System.Threading.Tasks;
using WebApplication1.Dtos;
using WebApplication1.Models;

namespace WebApplication1.Services{
    public interface IEmployeeSalaryRecordService
    {
        Task<ErrorHandelerDto> GetEmployee(int id, int year);
        Task<ErrorHandelerDto> GetEmployee(int id);
        Task<ErrorHandelerDto> AddEmployee(int employeeId);
        Task<ErrorHandelerDto> GetAllEmployee(string search, int month, int year);
        Task<ErrorHandelerDto> UpdateEmployee(EmployeeSalaryEditDto employee);
        Task<ErrorHandelerDto> AddEmployeeForNextMonth();
        Task<ErrorHandelerDto> CalculateSalary();
    }
}