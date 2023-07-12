﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using WebApplication1.Dtos;
using WebApplication1.Services;

namespace WebApplication1.Controllers
{
    [Route("api/employee/salary/record")]
    [ApiController]
    public class EmployeeSalaryRecordController : ControllerBase
    {
        private readonly IEmployeeSalaryRecordService _employeeSalaryRecordService;
        public EmployeeSalaryRecordController(IEmployeeSalaryRecordService employeeService)
        {
            _employeeSalaryRecordService = employeeService;
        }

        [HttpGet("employee")]
        public async Task<IActionResult> GetEmployee([FromQuery] int employeeId, [FromQuery] int year)
        {
            ErrorHandelerDto obj = await _employeeSalaryRecordService.GetEmployee(employeeId, year);
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

        [HttpGet("{id}")]
        public async Task<IActionResult> GetEmployeeById(int id)
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
        public async Task<IActionResult> GetAllEmployee([FromQuery] int month, [FromQuery] int year)
        {
            ErrorHandelerDto obj = await _employeeSalaryRecordService.GetAllEmployee(month, year);
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
        public async Task<IActionResult> UpdateEmployee([FromBody] EmployeeSalaryEditDto employee)
        {
            ErrorHandelerDto obj = await _employeeSalaryRecordService.UpdateEmployee(employee);
            if (obj.StatusCode == 200)
            {
                return Ok(obj.data);
            }
            return BadRequest(obj.data);
        }

        [HttpPost("nextmonth")]
        public async Task<IActionResult> AddEmployeeForNextMonth()
        {
            ErrorHandelerDto obj = await _employeeSalaryRecordService.AddEmployeeForNextMonth();
            if (obj.StatusCode == 200)
            {
                return Ok(obj.data);
            }
            return BadRequest(obj.data);
        }

        [HttpPut("calculate")]
        public async Task<IActionResult> CalculateSalary()
        {
            ErrorHandelerDto obj = await _employeeSalaryRecordService.CalculateSalary();
            if (obj.StatusCode == 200)
            {
                return Ok(obj.data);
            }
            return BadRequest(obj.data);
        }


        [HttpPost]
        public async Task<IActionResult> AddEmployee([FromBody] int id)
        {
            ErrorHandelerDto obj = await _employeeSalaryRecordService.AddEmployee(id);
            if (obj.StatusCode == 200)
            {
                return Ok(obj.data);
            }
            return BadRequest(obj.data);
        }



    }
}
