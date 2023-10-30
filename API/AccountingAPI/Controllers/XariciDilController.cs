using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Models;
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

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFexriAd(int id)
        {
            var result = await _xariciDilService.DeleteXariciDil(id);
            return StatusCode(result.StatusCode, result.data);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateFexriAd([FromBody] ForeignLanguage fexriAd)
        {
            var result = await _xariciDilService.UpdateXariciDil(fexriAd);
            return StatusCode(result.StatusCode, result.data);
        }

        [HttpPost]
        public async Task<IActionResult> AddXariciDil([FromBody] ForeignLanguage meharet)
        {
            var result = await _xariciDilService.AddXariciDil(meharet);
            return Ok(result);
        }


    }
}