using System.Collections.Generic;
using System.Threading.Tasks;
using WebApplication1.Dtos;
using WebApplication1.Models;

namespace WebApplication1.Services{
    public interface IEmployeeSalaryRecordService
    {
        Task<ErrorHandelerDto> GetEmployee(int id);
        // Task<ErrorHandelerDto> AddEmployee(EmployeeInputDto employee);
        Task<ErrorHandelerDto> GetAllEmployee();
        Task<ErrorHandelerDto> UpdateEmployee(EmployeeEditDto employee);
    }
}