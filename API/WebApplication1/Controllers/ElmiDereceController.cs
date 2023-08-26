using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Models;
using WebApplication1.Services;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ElmiDereceController : ControllerBase
    {

        private readonly IElmiDereceService _elmiDereceService;
        public ElmiDereceController(IElmiDereceService FexrIElmiDereceService)
        {
            _elmiDereceService = FexrIElmiDereceService;
        }
        [HttpGet]
        public async Task<IActionResult> GetElmiDerece()
        {
            var result = await _elmiDereceService.GetElmiDereces();
            return StatusCode(result.StatusCode, result.data);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteElmiDerece(int id)
        {
            var result = await _elmiDereceService.DeleteScientificDegree(id);
            return StatusCode(result.StatusCode, result.data);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateElmiDerece([FromBody] ScientificDegree elmiDerece)
        {
            var result = await _elmiDereceService.UpdateScientificDegree(elmiDerece);
            return StatusCode(result.StatusCode, result.data);
        }
    }
}