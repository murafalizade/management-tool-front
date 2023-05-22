using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Dtos;
using WebApplication1.Models;
using WebApplication1.Services;

namespace WebApplication1.Controllers
{
    [Route("api/position")]
    [ApiController]
    public class PositionController : ControllerBase
    {
        private readonly IPositionService _positionService;
        public PositionController(IPositionService positionService)
        {
            _positionService = positionService;
        }

        [HttpGet]
        public async Task<ActionResult> GetPositions()
        {
            ErrorHandelerDto obj = await _positionService.GetPositions();
            if (obj.StatusCode == 200)
            {
                return Ok(obj.data);
            }
            return BadRequest(obj.data);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetPositionById(int id)
        {
            ErrorHandelerDto obj = await _positionService.GetPositionById(id);
            if (obj.isError == true)
            {
                switch (obj.StatusCode)
                {
                    case 400:
                        return BadRequest(obj.data);
                    case 404:
                        return NotFound(obj.data);
                    default:
                        return BadRequest(obj.data);
                }
            }
            return Ok(obj.data);
        }

        [HttpPost]
        public async Task<ActionResult> AddPosition([FromBody] PositionInputcDto position)
        {
            ErrorHandelerDto obj = await _positionService.AddPosition(position);
            if (obj.StatusCode == 200)
            {
                return Ok(obj.data);
            }
            return BadRequest(obj.data);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdatePosition(int id, [FromBody] Position position)
        {
            if(id != position.Id)
            {
                return BadRequest("Id is not valid");
            }
            ErrorHandelerDto obj = await _positionService.UpdatePosition(position);
            if (obj.StatusCode == 200)
            {
                return Ok(obj.data);
            }
            return BadRequest(obj.data);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeletePosition(int id)
        {
            ErrorHandelerDto obj = await _positionService.DeletePosition(id);
            if (obj.StatusCode == 200)
            {
                return Ok(obj.data);
            }
            return BadRequest(obj.data);
        }

        [HttpPost("save-all")]
        public async Task<IActionResult> SavePositions([FromBody] List<PositionBasicDto> obj)
        {
            ErrorHandelerDto obj1 = await _positionService.SavePosition(obj);
            if(obj1.isError == true)
            {
                switch (obj1.StatusCode)
                {
                    case 400:
                        return BadRequest(obj1.data);
                    case 404:
                        return NotFound(obj1.data);
                    default:
                        return BadRequest(obj1.data);
                }
            }
            return Ok(obj1.data);
        }

    }
}