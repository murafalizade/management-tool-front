using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Dtos;
using WebApplication1.Models;

namespace WebApplication1.Repositories
{
    public class AdminstrationRepository : IAdminstrationRepository
    {
        private readonly ApplicationDbContext _context;
        public AdminstrationRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<List<Adminstration>> GetAdminstrations()
        {
            return await _context.Adminstrations.ToListAsync();
        }
        public async Task<Adminstration> GetAdminstration(int id)
        {
            return await _context.Adminstrations.Include(x => x.Departments).FirstOrDefaultAsync(x => x.Id == id);
        }
        public async Task<Adminstration> AddAdminstration(Adminstration adminstration)
        {
            _context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT dbo.Adminstrations ON");
            _context.Adminstrations.Add(adminstration);
            await _context.SaveChangesAsync();
            _context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT Adminstrations OFF");

            return adminstration;
        }
        public List<OrganizationDto> GetAllAdminstrationWithRelations()
        {
            return _context.Adminstrations
       .SelectMany(o => o.Departments.SelectMany(d => d.Positions.Select(p => new OrganizationDto
       {
           OrganizationName = o.Name,
           DepartmentName = d.Name,
           PositionName = p.Name,
           Salary = p.Salary,
           PositionId = p.Id
       })))
       .ToList();
        }

        public async Task DeleteAdminstration(int id)
        {
            _context.Adminstrations.Remove(
                _context.Adminstrations.Find(id));
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAdminstration(Adminstration adminstration)
        {
            _context.Adminstrations.Update(adminstration);
            await _context.SaveChangesAsync();
        }
    }
}