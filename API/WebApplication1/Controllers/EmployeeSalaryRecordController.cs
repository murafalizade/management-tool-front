﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using WebApplication1.Dtos;
using WebApplication1.Services;

namespace WebApplication1.Controllers
{
    [Route("api/employee/salary/record")]
    [ApiController]
    [Authorize]
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
        public async Task<IActionResult> GetAllEmployee([FromQuery] int month, [FromQuery] int year, [FromQuery] string search)
        {
            ErrorHandelerDto obj = await _employeeSalaryRecordService.GetAllEmployee(search, month, year);
            if (obj.StatusCode == 200)
            {
                return Ok(obj.data);
            }
            return BadRequest(obj.data);
        }

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

        [HttpGet("export")]
        public async Task<IActionResult> ExportExcel([FromQuery] int month, [FromQuery] int year, [FromQuery] string search)
        {
            return File(await _employeeSalaryRecordService.ExportExcel(search, month, year), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "EmployeeSalaryRecord.xlsx");
        }

        [HttpGet("distribution")]
        public async Task<IActionResult> ExportDistribution([FromQuery] int month, [FromQuery] int year, [FromQuery] string search)
        {
            return File(await _employeeSalaryRecordService.ExportDistribution(search, month, year), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "EmployeeSalaryDistribution.xlsx");
        }

        [HttpGet("reestr")]
        public async Task<IActionResult> ExportReestr([FromQuery] int month, [FromQuery] int year, [FromQuery] string search)
        {
            return File(await _employeeSalaryRecordService.ExportReestr(search, month, year), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "EmployeeSalaryReestr.xlsx");
        }
        
        [HttpPost("kiraye")]
        public async Task<IActionResult> AddKirayeQat([FromQuery] int kirayeQat)
        {
            ErrorHandelerDto obj = await _employeeSalaryRecordService.AddKirayeQat(kirayeQat);
            if ((bool)!obj.isError)
            {
                return Ok(obj.data);
            }
            return BadRequest(obj.data);
        }

        [HttpPost("food")]
        public async Task<IActionResult> AddFoodQat([FromQuery] int foodQat)
        {
            ErrorHandelerDto obj = await _employeeSalaryRecordService.AddFoodQat(foodQat);
            if ((bool)!obj.isError)
            {
                return Ok(obj.data);
            }
            return BadRequest(obj.data);
        }

        [HttpPost("veteran")]
        public async Task<IActionResult> AddVeteranQat([FromQuery] int veteranQat)
        {
            ErrorHandelerDto obj = await _employeeSalaryRecordService.AddVeteranQat(veteranQat);
            if ((bool)!obj.isError)
            {
                return Ok(obj.data);
            }
            return BadRequest(obj.data);
        }

        [HttpPost("bpm")]
        public async Task<IActionResult> AddBPMQat([FromQuery] int bpmQat)
        {
            ErrorHandelerDto obj = await _employeeSalaryRecordService.AddBPMQat(bpmQat);
            if ((bool)!obj.isError)
            {
                return Ok(obj.data);
            }
            return BadRequest(obj.data);
        }
        [HttpGet("aid")]
        public async Task<IActionResult> GetAidStatus([FromQuery] int recordId)
        {
            ErrorHandelerDto obj = await _employeeSalaryRecordService.GetAidStatus(recordId);
            if ((bool)!obj.isError)
            {
                return Ok(obj.data);
            }
            return BadRequest(obj.data);
        }

        [HttpGet("statistics")]
        public async Task<IActionResult> GetUniqueEmployeesStatistics([FromQuery] int year)
        {
            ErrorHandelerDto obj = await _employeeSalaryRecordService.GetUniqueEmployeesStatistics(year);
            if ((bool)!obj.isError)
            {
                return Ok(obj.data);
            }
            return BadRequest(obj.data);
        }
    }
}
