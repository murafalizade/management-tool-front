using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Models;

namespace WebApplication1.Repositories
{
    class RankRepository : IRankRepository
    {
        private readonly ApplicationDbContext _dbContext;
        public RankRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task AddRank(Rank rank)
        {
           await _dbContext.Ranks.AddAsync(rank);
           await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteRank(int rankId)
        {
           _dbContext.Ranks.Remove(_dbContext.Ranks.Find(rankId));
            await _dbContext.SaveChangesAsync();
        }

        // public async Task<Rank> GetRankById(int RankId)
        // {
        //     return await {};
        // }

        public async Task<List<Rank>> GetRanks()
        {
            return await _dbContext.Ranks.ToListAsync();
        }

        public async Task<Rank> UpdateRank(Rank rank)
        {
            _dbContext.Ranks.Update(rank);
            await _dbContext.SaveChangesAsync();
            return rank;
        }
    }
}