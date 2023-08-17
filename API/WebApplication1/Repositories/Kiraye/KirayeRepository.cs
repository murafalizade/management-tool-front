using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Models;

namespace WebApplication1.Repositories{
    class KirayeRepository : IKirayeRepository
    {
        private readonly ApplicationDbContext _dbContext;
        public KirayeRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<List<Rent>> GetKirayes()
        {
            return await _dbContext.Rents.ToListAsync();
        }
    }
}