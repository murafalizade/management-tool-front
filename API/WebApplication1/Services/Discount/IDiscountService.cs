using System;
using System.Threading.Tasks;
using WebApplication1.Controllers;
using WebApplication1.Dtos;
using WebApplication1.Models;
using WebApplication1.Repositories;

namespace WebApplication1.Services
{
    public interface IDiscountService
    {
        Task<ErrorHandelerDto> AddDiscount(Discount discount);
        Task<ErrorHandelerDto> GetDiscounts(int year = 0, int month = 0);
        Task<ErrorHandelerDto> UpdateDiscount(Discount discount);
    }
}