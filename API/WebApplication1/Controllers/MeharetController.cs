using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Services;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class MeharetController : ControllerBase
    {

        private readonly IMeharetService _meharetService;
        public MeharetController(IMeharetService FexrIMeharetService)
        {
            _meharetService = FexrIMeharetService;
        }
        [HttpGet]
        public async Task<IActionResult> GetMeharet()
        {
            var result = await _meharetService.GetMeharets();
            return StatusCode(result.StatusCode, result.data);
        }
    }
}