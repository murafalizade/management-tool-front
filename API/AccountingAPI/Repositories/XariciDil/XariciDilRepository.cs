using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Models;

namespace WebApplication1.Repositories{
    class XariciDilRepository:IXariciDilRepository
    {
        private readonly ApplicationDbContext _dbContext;
        public XariciDilRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<ForeignLanguage> Add(ForeignLanguage foreignLanguage)
        {
           await _dbContext.ForeignLanguages.AddAsync(foreignLanguage);
           await _dbContext.SaveChangesAsync();

           return foreignLanguage;
        }

        public async Task Delete(int id)
        {
            ForeignLanguage foreignLanguage = await _dbContext.ForeignLanguages.FindAsync(id);
            _dbContext.ForeignLanguages.Remove(foreignLanguage);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<List<ForeignLanguage>> GetXariciDils()
        {
            return await _dbContext.ForeignLanguages.ToListAsync();
        }

        public async Task Update(ForeignLanguage foreignLanguage)
        {
            _dbContext.ForeignLanguages.Update(foreignLanguage);
            await _dbContext.SaveChangesAsync();
        }
    }
}