using System.Collections.Generic;
using System.Threading.Tasks;
using WebApplication1.Models;

namespace WebApplication1.Repositories
{
    public interface IDiscountRepository
    {
        Task AddDiscount(Discount discount);
        Task<Discount> GetDiscounts(int year, int month);
        Task<Discount> UpdateDiscount(Discount discount);
        Task<Discount> GetDiscounts(int id);
    }
}