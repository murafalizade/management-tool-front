using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Dtos;
using WebApplication1.Models;
using WebApplication1.Services;

namespace WebApplication1.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;
        public EmployeeController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetEmployee(int id)
        {
            ErrorHandelerDto obj = await _employeeService.GetEmployee(id);
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
        [HttpGet("position/{positionId}")]
        public async Task<IActionResult> GetEmployeeByPosition(int positionId)
        {
            ErrorHandelerDto obj = await _employeeService.GetEmployeeByPosition(positionId);
            // if(obj.isError == true){
            //     switch(obj.StatusCode){
            //         case 400:
            //             return BadRequest(obj.data);
            //         case 404:
            //             return NotFound(obj.data);
            //         default:
            //             return BadRequest(obj.data);
            //     }
            // }
            return Ok(obj.data);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllEmployee()
        {
            ErrorHandelerDto obj = await _employeeService.GetAllEmployee();
            if (obj.StatusCode == 200)
            {
                return Ok(obj.data);
            }
            return BadRequest(obj.data);
        }

        [HttpPost]
        public async Task<IActionResult> AddEmployee([FromBody] EmployeeInputDto employee)
        {
            ErrorHandelerDto obj = await _employeeService.AddEmployee(employee);
            if (obj.StatusCode == 200)
            {
                return Ok(obj.data);
            }
            return BadRequest(obj.data);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            ErrorHandelerDto obj = await _employeeService.DeleteEmployee(id);
            if (obj.StatusCode == 200)
            {
                return Ok(obj.data);
            }
            return BadRequest(obj.data);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateEmployee([FromBody] EmployeeEditDto employee)
        {
            ErrorHandelerDto obj = await _employeeService.UpdateEmployee(employee);
            if (obj.StatusCode == 200)
            {
                return Ok(obj.data);
            }
            return BadRequest(obj.data);
        }
    }
}