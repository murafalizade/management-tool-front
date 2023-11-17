using System.Threading.Tasks;
using WebApplication1.Dtos;
using WebApplication1.Models;

namespace WebApplication1.Services
{
    public interface IElmiDereceService
    {
        Task<ErrorHandelerDto> AddScientificDegree(ScientificDegree scientificDegree);
        Task<ErrorHandelerDto> GetElmiDereces();
        Task<ErrorHandelerDto> DeleteScientificDegree(int id);
        Task<ErrorHandelerDto> UpdateScientificDegree(ScientificDegree scientificDegree);
    }
}