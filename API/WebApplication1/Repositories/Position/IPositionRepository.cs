using System.Collections.Generic;
using System.Threading.Tasks;
using WebApplication1.Models;

namespace WebApplication1.Repositories
{
    public interface IPositionRepository
    {
        Task AddPosition(Position position);
        Task DeletePosition(int positionId);
        Task<Position> GetPositionById(int positionId);
        Task<List<Position>> GetPositions();
        Task<Position> UpdatePosition(Position position);
    }
}