using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Dtos;
using WebApplication1.Models;
using WebApplication1.Services;

namespace WebApplication1.Controllers
{
    [Route("api/department")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private readonly IDepartmentService _departmentService;
        public DepartmentController(IDepartmentService departmentService)
        {
            _departmentService = departmentService;
        }
        // GET: api/Department
        [HttpGet]
        public async Task<ActionResult<ErrorHandelerDto>> GetDepartments()
        {
            return await _departmentService.GetDepartments();
        }
        // GET: api/Department/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ErrorHandelerDto>> GetDepartment(int id)
        {
            return await _departmentService.GetDepartment(id);
        }
        // PUT: api/Department/5
        [HttpPut("{id}")]
        public async Task<ActionResult<ErrorHandelerDto>> PutDepartment(int id, Department department)
        {
            if (id != department.Id)
            {
                return BadRequest();
            }
            return await _departmentService.UpdateDepartment(department);
        }
        // POST: api/Department
        [HttpPost]
        public async Task<ActionResult<ErrorHandelerDto>> PostDepartment(DepartmentInputDto department)
        {
            return await _departmentService.AddDepartment(department);
        }
        // DELETE: api/Department/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ErrorHandelerDto>> DeleteDepartment(int id)
        {
            return await _departmentService.DeleteDepartment(id);
        }

        [HttpPost("save-all")]
        public async Task<IActionResult> SaveAllDepartments([FromBody] List<DepartmentBasicDto> obj)
        {
            ErrorHandelerDto obj1 =  await _departmentService.SaveDepartment(obj);
            return Ok(obj1);
        }

    }
}