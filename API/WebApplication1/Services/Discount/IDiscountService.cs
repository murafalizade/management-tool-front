using System.Collections.Generic;
using System.Threading.Tasks;
using WebApplication1.Dtos;
using WebApplication1.Models;

namespace WebApplication1.Services{
    public interface IDiscountService
    {
        Task<ErrorHandelerDto> GetDiscounts(int year, int month);
        Task<ErrorHandelerDto> AddDiscount(Discount discount);
        Task<ErrorHandelerDto> updateDiscount(Discount discount);
    }
}