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

        public async Task<List<ForeignLanguage>> GetXariciDils()
        {
            return await _dbContext.ForeignLanguages.ToListAsync();
        }
    }
}