using System;
using System.Threading.Tasks;
using WebApplication1.Controllers;
using WebApplication1.Dtos;
using WebApplication1.Models;
using WebApplication1.Repositories;

namespace WebApplication1.Services
{
    public class DiscountService : IDiscountService
    {
        private readonly IDiscountRepository _discountRepository;
        public DiscountService(IDiscountRepository discountRepository)
        {
            _discountRepository = discountRepository;
        }
        public async Task<ErrorHandelerDto> AddDiscount(Discount discount)
        {
            try
            {
                await _discountRepository.AddDiscount(discount);
                return new ErrorHandelerDto { StatusCode = 200, data = "Discount Added Successfully" };
            }
            catch (Exception ex)
            {
                return new ErrorHandelerDto { StatusCode = 500, data = ex.Message };
            }
        }

        public async Task<ErrorHandelerDto> GetAllDiscounts()
        {
            return new ErrorHandelerDto { data = await _discountRepository.GetAllDiscounts(), StatusCode = 200 };
        }

        public async Task<ErrorHandelerDto> GetDiscounts(int year = 0, int month = 0)
        {
            year = year == 0 ? DateTime.Now.Year : year;
            month = month == 0 ? DateTime.Now.Month : month;
            try
            {
                var discounts = await _discountRepository.GetDiscountByDate(year, month);
                return new ErrorHandelerDto { StatusCode = 200, data = discounts };
            }
            catch (Exception ex)
            {
                return new ErrorHandelerDto { StatusCode = 500, data = ex.Message };
            }
        }
        public async Task<ErrorHandelerDto> UpdateDiscount(Discount discount)
        {
            try
            {
                var updatedDiscount = await _discountRepository.UpdateDiscount(discount);
                return new ErrorHandelerDto { StatusCode = 200, data = updatedDiscount };
            }
            catch (Exception ex)
            {
                return new ErrorHandelerDto { StatusCode = 500, data = ex.Message };
            }
        }
    }
}