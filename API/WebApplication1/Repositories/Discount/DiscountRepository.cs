using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Models;

namespace WebApplication1.Repositories
{
    public class DiscountRepository : IDiscountRepository
    {
        private readonly ApplicationDbContext _context;

        public DiscountRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task AddDiscount(Discount discount)
        {
            await _context.Discounts.AddAsync(discount);
            await _context.SaveChangesAsync();
        }


        public async Task<Discount> GetDiscountByDate(int? year=0, int? month=0)
        {

            // Check if year and month exist get last discount
            if (year == 0 || month == 0)
            {
                return await _context.Discounts.OrderByDescending(d => d.Date).FirstOrDefaultAsync();
            }
            return await _context.Discounts.FirstOrDefaultAsync(d => d.Date.Year == year && d.Date.Month == month);
        }

        public async Task<Discount> GetDiscounts(int id)
        {
            return await _context.Discounts.FirstOrDefaultAsync(d => d.Id == id);
        }

        public async Task<Discount> UpdateDiscount(Discount discount)
        {
            _context.Discounts.Update(discount);
            await _context.SaveChangesAsync();
            return discount;
        }
    }
}