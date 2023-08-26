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

        public async Task Delete(int id)
        {
            HonorTitle honorTitle = await _dbContext.HonorTitles.FindAsync(id);
            _dbContext.HonorTitles.Remove(honorTitle);
            await _dbContext.SaveChangesAsync();

        }

        public async Task<List<HonorTitle>> GetFexriAds()
        {
            return await _dbContext.HonorTitles.ToListAsync();
        }

        public async Task<HonorTitle> Update(HonorTitle honorTitle)
        {
            _dbContext.HonorTitles.Update(honorTitle);
            await _dbContext.SaveChangesAsync();
            return honorTitle;
        }
    }
}