using System.Threading.Tasks;
using WebApplication1.Dtos;
using WebApplication1.Models;

namespace WebApplication1.Services
{
    public interface IFexriAdService
    {
        Task<ErrorHandelerDto> GetFexriAd();
        Task<ErrorHandelerDto> Update(HonorTitle honorTitle);
        Task<ErrorHandelerDto> Delete(int id);
    }
}