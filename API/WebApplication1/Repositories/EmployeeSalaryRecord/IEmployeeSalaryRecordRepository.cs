using System.Collections.Generic;
using System.Threading.Tasks;
using WebApplication1.Models;

namespace WebApplication1.Repositories
{
    public interface IEmployeeSalaryRecordRepository
    {
        Task AddEmployee(EmployeeSalaryRecord employee);
        Task<List<EmployeeSalaryRecord>> GetEmployees(string search, int month, int year);
        Task<EmployeeSalaryRecord> GetEmployeeById(int id);
        Task<List<EmployeeSalaryRecord>> GetEmployeeById(int employeeId, int year);
        Task<EmployeeSalaryRecord> UpdateEmployee(EmployeeSalaryRecord employee);
        Task<EmployeeSalaryRecord> GetLastEmployeeRecord();
    }
}