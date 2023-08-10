using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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
    }
}