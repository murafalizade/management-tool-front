using System.Threading.Tasks;
using WebApplication1.Dtos;

namespace WebApplication1.Services
{
    public interface IXariciDilService
    {
        Task<ErrorHandelerDto> GetXariciDil();
    }
}