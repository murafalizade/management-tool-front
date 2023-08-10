using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Services;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FexriAdController : ControllerBase
    {

        private readonly IFexriAdService _FexrIFexriAdService;
        public FexriAdController(IFexriAdService FexrIFexriAdService)
        {
            _FexrIFexriAdService = FexrIFexriAdService;
        }
        [HttpGet]
        public async Task<IActionResult> GetFexriAd()
        {
            var result = await _FexrIFexriAdService.GetFexriAd();
            return StatusCode(result.StatusCode, result.data);
        }
    }
}