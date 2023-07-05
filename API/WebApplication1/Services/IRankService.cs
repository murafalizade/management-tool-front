using System.Collections.Generic;
using System.Threading.Tasks;
using WebApplication1.Dtos;
using WebApplication1.Models;

namespace WebApplication1.Services
{
    public interface IRankService
    {
        Task<ErrorHandelerDto> GetRanks();
        // Task<ErrorHandelerDto> GetRankById(int RankId);
        Task<ErrorHandelerDto> AddRank(Rank rank);
        Task<ErrorHandelerDto> UpdateRank(Rank rank);
        Task<ErrorHandelerDto> DeleteRank(int rankId);
        // Task<ErrorHandelerDto> SaveRank(List<RankBasicDto> Rank);
    }
}