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

        public async Task<ScientificDegree> Add(ScientificDegree degree)
        {

                await _dbContext.ScientificDegrees.AddAsync(degree);
           await _dbContext.SaveChangesAsync();

                return degree;
        }

        public async Task Delete(int id)
        {
            _dbContext.ScientificDegrees.Remove(await _dbContext.ScientificDegrees.FindAsync(id));
            await _dbContext.SaveChangesAsync();

        }

        public async Task<List<ScientificDegree>> GetElmiDereces()
        {
            return await _dbContext.ScientificDegrees.ToListAsync();
        }

        public async Task Update(ScientificDegree degree)
        {
            _dbContext.ScientificDegrees.Update(degree);
            await _dbContext.SaveChangesAsync();
        }
    }
}