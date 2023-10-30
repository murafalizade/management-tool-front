using System.Threading.Tasks;
using WebApplication1.Dtos;
using WebApplication1.Models;

namespace WebApplication1.Services
{
    public interface IKirayeService
    {
        Task<ErrorHandelerDto> GetKirayes();
        Task<ErrorHandelerDto> AddKiraye(Rent kiraye);
        Task<ErrorHandelerDto> DeleteKiraye(int id);
        Task<ErrorHandelerDto> UpdateKiraye(Rent kiraye);
    }
}