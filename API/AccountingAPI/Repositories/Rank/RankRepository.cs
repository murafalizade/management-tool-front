using System.Collections.Generic;
using System.Linq;
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

        public async Task<List<Rank>> GetRanksWithRecord()
        {
            List<Rank> ranks =  await _dbContext.Ranks.Include(x=> x.EmployeeSalaryRecords).ToListAsync();
             ranks.ForEach(rank =>
            {
                rank.EmployeeSalaryRecords = rank.EmployeeSalaryRecords
                    .GroupBy(esr => esr.EmployeeId)
                    .Select(group => group.First())
                    .ToList();

            });
            return ranks;
        }
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