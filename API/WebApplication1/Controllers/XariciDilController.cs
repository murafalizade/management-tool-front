using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Services;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class XariciDilController : ControllerBase
    {

        private readonly IXariciDilService _xariciDilService;
        public XariciDilController(IXariciDilService FexrIFexriAdService)
        {
            _xariciDilService = FexrIFexriAdService;
        }
        [HttpGet]
        public async Task<IActionResult> GetFexriAd()
        {
            var result = await _xariciDilService.GetXariciDil();
            return StatusCode(result.StatusCode, result.data);
        }
    }
}