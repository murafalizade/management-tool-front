using System.Collections.Generic;
using System.Threading.Tasks;
using WebApplication1.Dtos;
using WebApplication1.Models;

namespace WebApplication1.Repositories
{
    public interface IAdminstrationRepository
    {
        Task<List<Adminstration>> GetAdminstrations();
        Task<Adminstration> GetAdminstration(int id);
        Task<Adminstration> AddAdminstration(Adminstration adminstration);
        List<OrganizationDto> GetAllAdminstrationWithRelations();
        Task DeleteAdminstration(int id);
        Task UpdateAdminstration(Adminstration adminstration);
    }
}