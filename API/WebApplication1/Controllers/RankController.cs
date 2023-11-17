using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Dtos;
using WebApplication1.Models;
using WebApplication1.Services;

namespace WebApplication1.Controllers
{
    [Route("api/rank")]
    [ApiController]
    [Authorize]
    public class RankController : ControllerBase
    {
        private readonly IRankService _RankService;
        public RankController(IRankService RankService)
        {
            _RankService = RankService;
        }

        [HttpGet]
        public async Task<ActionResult> GetRanks()
        {
            ErrorHandelerDto obj = await _RankService.GetRanks();
            if (obj.StatusCode == 200)
            {
                return Ok(obj.data);
            }
            return BadRequest(obj.data);
        }

        [HttpGet("statistics/{year}")]
        public async Task<ActionResult> GetRankById(int year)
        {
            ErrorHandelerDto obj = await _RankService.GetRankStatistics(year);
            if (obj.isError == true)
            {               
                return BadRequest(obj.data);
            }
            return Ok(obj.data);
        }

        [HttpPost]
        public async Task<ActionResult> AddRank([FromBody] Rank Rank)
        {
            ErrorHandelerDto obj = await _RankService.AddRank(Rank);
            if (obj.StatusCode == 200)
            {
                return Ok(obj.data);
            }
            return BadRequest(obj.data);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateRank(int id, [FromBody] Rank Rank)
        {
            if(id != Rank.Id)
            {
                return BadRequest("Id is not valid");
            }
            ErrorHandelerDto obj = await _RankService.UpdateRank(Rank);
            if (obj.StatusCode == 200)
            {
                return Ok(obj.data);
            }
            return BadRequest(obj.data);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteRank(int id)
        {
            ErrorHandelerDto obj = await _RankService.DeleteRank(id);
            if (obj.StatusCode == 200)
            {
                return Ok(obj.data);
            }
            return BadRequest(obj.data);
        }
    }
}