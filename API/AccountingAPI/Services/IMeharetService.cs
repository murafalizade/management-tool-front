using System.Threading.Tasks;
using WebApplication1.Dtos;
using WebApplication1.Models;

namespace WebApplication1.Services
{
    public interface IMeharetService
    {
        Task<ErrorHandelerDto> GetMeharets();
        Task<ErrorHandelerDto> AddMeharet(Ability meharet);
        Task<ErrorHandelerDto> DeleteMeharet(int id);
        Task<ErrorHandelerDto> UpdateMeharet(Ability meharet);
    }
}