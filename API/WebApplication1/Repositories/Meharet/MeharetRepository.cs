using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Models;

namespace WebApplication1.Repositories
{
    class MeharetRepository : IMeharetRepistory
    {
        private readonly ApplicationDbContext _dbContext;
        public MeharetRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<Meharet>> GetMeharets()
        {
            return await _dbContext.Meharets.ToListAsync();
        }
    }
}