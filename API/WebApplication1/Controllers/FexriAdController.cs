using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Models;
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

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFexriAd(int id)
        {
            var result = await _FexrIFexriAdService.Delete(id);
            return StatusCode(result.StatusCode, result.data);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateFexriAd([FromBody] HonorTitle fexriAd)
        {
            var result = await _FexrIFexriAdService.Update(fexriAd);
            return StatusCode(result.StatusCode, result.data);
        }

    }
}