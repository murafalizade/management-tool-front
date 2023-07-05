using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using WebApplication1.Dtos;
using WebApplication1.Services;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeSalaryRecordController : ControllerBase
    {
        private readonly IEmployeeSalaryRecordService _employeeSalaryRecordService;
        public EmployeeSalaryRecordController(IEmployeeSalaryRecordService employeeService)
        {
            _employeeSalaryRecordService = employeeService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetEmployee(int id)
        {
            ErrorHandelerDto obj = await _employeeSalaryRecordService.GetEmployee(id);
            if (obj.isError == true)
            {
                switch (obj.StatusCode)
                {
                    case 400:
                        return BadRequest(obj.data);
                    case 404:
                        return NotFound(obj.data);
                    default:
                        return BadRequest(obj.data);
                }
            }
            return Ok(obj.data);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllEmployee()
        {
            ErrorHandelerDto obj = await _employeeSalaryRecordService.GetAllEmployee();
            if (obj.StatusCode == 200)
            {
                return Ok(obj.data);
            }
            return BadRequest(obj.data);
        }

        // [HttpPost]
        // public async Task<IActionResult> AddEmployee([FromBody] EmployeeInputDto employee)
        // {
        //     ErrorHandelerDto obj = await _employeeSalaryRecordService.AddEmployee(employee);
        //     if (obj.StatusCode == 200)
        //     {
        //         return Ok(obj.data);
        //     }
        //     return BadRequest(obj.data);
        // }

        // [HttpDelete("{id}")]
        // public async Task<IActionResult> DeleteEmployee(int id)
        // {
        //     ErrorHandelerDto obj = await _employeeSalaryRecordService.DeleteEmployee(id);
        //     if (obj.StatusCode == 200)
        //     {
        //         return Ok(obj.data);
        //     }
        //     return BadRequest(obj.data);
        // }

        [HttpPut]
        public async Task<IActionResult> UpdateEmployee([FromBody] EmployeeEditDto employee)
        {
            ErrorHandelerDto obj = await _employeeSalaryRecordService.UpdateEmployee(employee);
            if (obj.StatusCode == 200)
            {
                return Ok(obj.data);
            }
            return BadRequest(obj.data);
        }
    }
}
