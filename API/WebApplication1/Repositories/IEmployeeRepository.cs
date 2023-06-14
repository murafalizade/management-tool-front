using System.Collections.Generic;
using System.Threading.Tasks;
using WebApplication1.Models;

namespace WebApplication1.Repositories
{
    public interface IEmployeeRepository
    {
        Task AddEmployee(Employee employee);
        Task DeleteEmployee(int employeeId);
        Task<Employee> GetEmployeeById(int employeeId);
        Task<List<Employee>> GetEmployees();
        Task<Employee> GetEmployeeByFin(string fin);
        Task<Employee> UpdateEmployee(Employee employee);
    }
}