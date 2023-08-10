using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Models;

namespace WebApplication1.Repositories
{
    class ElmiDereceRepository : IElmiDereceRepository
    {
        private readonly ApplicationDbContext _dbContext;
        public ElmiDereceRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<ElmiDerece>> GetElmiDereces()
        {
            return await _dbContext.ElmiDereces.ToListAsync();
        }
    }
}