using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Models;

namespace WebApplication1.Repositories
{
    class KirayeRepository : IKirayeRepository
    {
        private readonly ApplicationDbContext _dbContext;
        public KirayeRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task Delete(int id)
        {
            _dbContext.Rents.Remove(await _dbContext.Rents.FindAsync(id));
            await _dbContext.SaveChangesAsync();
        }

        public async Task<List<Rent>> GetKirayes()
        {
            return await _dbContext.Rents.ToListAsync();
        }

        public async Task Update(Rent kiraye)
        {
            _dbContext.Rents.Update(kiraye);
            await _dbContext.SaveChangesAsync();
        }
    }
}