using System.Collections.Generic;
using System.Threading.Tasks;
using WebApplication1.Models;

namespace WebApplication1.Repositories
{
    public interface IRankRepository
    {
        Task AddRank(Rank rank);
        Task DeleteRank(int rankId);
        //Task<Rank> GetRankById(int rankId);
        Task<List<Rank>> GetRanksWithRecord();
        Task<List<Rank>> GetRanks();
        Task<Rank> UpdateRank(Rank rank);
    }
}