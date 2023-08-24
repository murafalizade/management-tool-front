using System;
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


        public async Task<Discount> GetDiscountByDate(int? year, int? month)
        {
            if (year == null || month == null || year == 0 || month == 0)
            {
                return await _context.Discounts.FirstOrDefaultAsync();
            }
            int yearInt = (int)year;
            int monthInt = (int)month;
            var targetDate = new DateTime(yearInt, monthInt, 1);

            var exactDiscount = await _context.Discounts
                .FirstOrDefaultAsync(d => d.CreatedAt.Date <= targetDate.Date);

            return exactDiscount;
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