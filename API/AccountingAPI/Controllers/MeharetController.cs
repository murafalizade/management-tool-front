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

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMeharet(int id)
        {
            var result = await _meharetService.DeleteMeharet(id);
            return StatusCode(result.StatusCode, result.data);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateMeharet([FromBody] Ability meharet)
        {
            var result = await _meharetService.UpdateMeharet(meharet);
            return StatusCode(result.StatusCode, result.data);
        }

        [HttpPost]
        public async Task<IActionResult>  AddMeharet([FromBody] Ability meharet)
        {
            var result = await _meharetService.AddMeharet(meharet);
            return StatusCode(result.StatusCode, result.data);
        }
        
    }
}