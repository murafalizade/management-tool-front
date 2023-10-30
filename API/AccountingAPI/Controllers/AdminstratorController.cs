using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Dtos;
using WebApplication1.Models;
using WebApplication1.Services;

namespace WebApplication1.Controllers
{
    [Route("api/adminstration")]
    [ApiController]
    [Authorize]

    public class AdminstratorController : ControllerBase
    {
        private readonly IAdminstrationService _adminstrationService;
        public AdminstratorController(IAdminstrationService adminstrationService)
        {
            _adminstrationService = adminstrationService;
        }
        [HttpGet]
        public async Task<IActionResult> GetAdminstrations()
        {
            return Ok(await _adminstrationService.GetAdminstrations());
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetAdminstration(int id)
        {
            ErrorHandelerDto obj = await _adminstrationService.GetAdminstration(id);
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
        [HttpPost]
        public async Task<IActionResult> AddAdminstration([FromBody] AdminstratorInputDto adminstration)
        {
            ErrorHandelerDto obj = await _adminstrationService.AddAdminstration(adminstration);
            if (obj.isError == true)
            {
                return BadRequest(obj.data);
            }
            return Ok(obj);
        }
        [HttpDelete("id")]
        public async Task<IActionResult> DeleteAdminstration(int id)
        {
            ErrorHandelerDto obj = await _adminstrationService.DeleteAdminstration(id);
            if(obj.isError == true)
            {
                return BadRequest(obj.data);
            }
            return Ok();
        }
        [HttpPost("save-all")]
        public async Task<IActionResult> SaveAdminstration([FromBody] List<AdminstratorBasicDto> obj)
        {
            
            ErrorHandelerDto objs = await _adminstrationService.SaveAdminstration(obj);
            return Ok(objs);
        }
        [HttpGet("all")]
        public IActionResult GetAllAdminstration()
        {
            ErrorHandelerDto obj = _adminstrationService.GetAllAdminstration();
            return Ok(obj.data);
        }
        [HttpGet("export-excel")]
        public IActionResult ExportExcel()
        {
          return File(_adminstrationService.ExportToExcel(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "idareler.xlsx");
        }
    }
}