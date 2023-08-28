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

        public async Task<Ability> Add(Ability ability)
        {
            await _dbContext.Abilities.AddAsync(ability);
           await _dbContext.SaveChangesAsync();

            return ability;
        }

        public async Task Delete(int id)
        {
            _dbContext.Abilities.Remove(await _dbContext.Abilities.FindAsync(id));
            await _dbContext.SaveChangesAsync();
        }

        public async Task<List<Ability>> GetMeharets()
        {
            return await _dbContext.Abilities.ToListAsync();
        }

        public async Task Update(Ability ability)
        {
            _dbContext.Abilities.Update(ability);
            await _dbContext.SaveChangesAsync();

        }
    }
}