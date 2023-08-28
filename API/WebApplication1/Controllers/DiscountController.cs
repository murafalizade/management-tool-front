using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Models;
using WebApplication1.Services;

namespace WebApplication1.Controllers
{
    [Route("api/discount")]
    [ApiController]
    [Authorize]

    public class DiscountController : ControllerBase
    {
        private readonly IDiscountService _discountService;
        public DiscountController(IDiscountService discountService)
        {
            _discountService = discountService;
        }

        // GET: api/Discount
        [HttpGet]
        public async Task<ActionResult> GetDiscounts(int year, int month)
        {
            return Ok(await _discountService.GetDiscounts(year, month));
        }

        // Get api/discounts
        [HttpGet("all")]
        public async Task<ActionResult> GetAllDiscounts()
        {
            return Ok(await _discountService.GetAllDiscounts());
        }

        // POST: api/Discount
        [HttpPost]
        public async Task<ActionResult> PostDiscount(Discount discount)
        {
            return Ok(await _discountService.AddDiscount(discount));
        }


        // PUT: api/Discount/5
        [HttpPut("{id}")]
        public async Task<ActionResult> PutDiscount(int id, Discount discount)
        {
            if (id != discount.Id)
            {
                return BadRequest();
            }
            return Ok(await _discountService.UpdateDiscount(discount));

        }
    }
}