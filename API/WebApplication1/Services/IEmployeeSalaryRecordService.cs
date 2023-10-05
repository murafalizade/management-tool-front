using System.Collections.Generic;
using System.Threading.Tasks;
using WebApplication1.Dtos;
using WebApplication1.Models;

namespace WebApplication1.Services
{
    public interface IEmployeeSalaryRecordService
    {
        Task<ErrorHandelerDto> GetEmployee(int id, int year);
        Task<ErrorHandelerDto> GetEmployee(int id);
        Task<ErrorHandelerDto> AddEmployee(int employeeId);
        Task<ErrorHandelerDto> GetAllEmployee(string search, int month, int year);
        Task<ErrorHandelerDto> UpdateEmployee(EmployeeSalaryEditDto employee);
        Task<ErrorHandelerDto> AddEmployeeForNextMonth();
        Task<ErrorHandelerDto> CalculateSalary();
        Task<byte[]> ExportExcel(string search, int month, int year);
        Task<byte[]> ExportDistribution(string search, int month, int year);
        Task<byte[]> ExportReestr(string search, int month, int year);
        Task<ErrorHandelerDto> AddKirayeQat(int kirayeQat);
        Task<ErrorHandelerDto> AddFoodQat(int foodQat);
        Task<ErrorHandelerDto> AddVeteranQat(int veteranQat);
        Task<ErrorHandelerDto> AddBPMQat(int bpmQat);
        Task<ErrorHandelerDto> GetAidStatus(int recordId);
    }
}