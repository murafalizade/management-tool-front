using System.Collections.Generic;
using System.Threading.Tasks;
using WebApplication1.Dtos.EmployeeSalaryRecord;
using WebApplication1.Models;

namespace WebApplication1.Repositories
{
    public interface IEmployeeSalaryRecordRepository
    {
        Task AddEmployee(EmployeeSalaryRecord employee);
        Task<List<EmployeeSalaryRecord>> GetEmployees(string search, int month, int year);
        Task<List<EmployeeReestrDto>> GetEmployeeReestr(string search, int month, int year);
        Task<EmployeeSalaryRecord> GetEmployeeById(int id);
        Task<List<EmployeeSalaryRecord>> GetEmployeeById(int employeeId, int year);
        Task<EmployeeSalaryRecord> UpdateEmployee(EmployeeSalaryRecord employee);
        Task AddKirayeQat(int kirayeQat);
        Task AddFoodQat(int foodQat);
        Task AddVeteranQat(int veteranQat);
        Task AddBPMQat (int bpmQat);
        Task<EmployeeSalaryRecord> GetLastEmployeeRecord();
    }
}