using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Models;
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

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteKiraye(int id)
        {
            var result = await _kirayeService.DeleteKiraye(id);
            return StatusCode(result.StatusCode, result.data);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateKiraye([FromBody] Rent kiraye)
        {
            var result = await _kirayeService.UpdateKiraye(kiraye);
            return StatusCode(result.StatusCode, result.data);
        }

        [HttpPost]
        public async Task<IActionResult> AddKiraye([FromBody] Rent kiraye)
        {
            var result = await _kirayeService.AddKiraye(kiraye);
            return StatusCode(result.StatusCode, result.data);
        }
    }
}