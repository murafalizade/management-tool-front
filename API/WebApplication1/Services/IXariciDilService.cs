using System.Threading.Tasks;
using WebApplication1.Dtos;
using WebApplication1.Models;

namespace WebApplication1.Services
{
    public interface IXariciDilService
    {
        Task<ErrorHandelerDto> GetXariciDil();
        Task<ErrorHandelerDto> UpdateXariciDil(ForeignLanguage xariciDil);
        Task<ErrorHandelerDto> DeleteXariciDil(int id);
    }
}