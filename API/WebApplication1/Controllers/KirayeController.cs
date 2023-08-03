using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Services;

namespace WebApplication1.Controllers{
     [ApiController]
    [Route("api/[controller]")]
    public class KirayeController : ControllerBase
    {

        private readonly IKirayeService _kirayeService;
        public KirayeController(IKirayeService kirayeService)
        {
            _kirayeService = kirayeService;
        }
        [HttpGet]
        public async Task<IActionResult> GetKirayes()
        {
            var result  = await _kirayeService.GetKirayes();
            return StatusCode(result.StatusCode, result.data);
        }
    }
}