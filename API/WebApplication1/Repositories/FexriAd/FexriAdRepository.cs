using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Models;

namespace WebApplication1.Repositories{
    class FexriAdRepository : IFexriAdRepository
    {
        private readonly ApplicationDbContext _dbContext;
        public FexriAdRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<FexriAd>> GetFexriAds()
        {
            return await _dbContext.FexriAds.ToListAsync();
        }
    }
}