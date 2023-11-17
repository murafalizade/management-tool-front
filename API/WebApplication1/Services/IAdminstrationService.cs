using System.Collections.Generic;
using System.Threading.Tasks;
using WebApplication1.Dtos;
using WebApplication1.Models;

namespace WebApplication1.Services{
    public interface IAdminstrationService
    {
        Task<ErrorHandelerDto> GetAdminstrations();
        Task<ErrorHandelerDto> GetAdminstration(int id);
        Task<ErrorHandelerDto> AddAdminstration(AdminstratorInputDto adminstration);
        ErrorHandelerDto GetAllAdminstration();
        Task<ErrorHandelerDto> SaveAdminstration(List<AdminstratorBasicDto> adminstrators);
        Task<ErrorHandelerDto> DeleteAdminstration(int id);
        byte[] ExportToExcel();
    }
}