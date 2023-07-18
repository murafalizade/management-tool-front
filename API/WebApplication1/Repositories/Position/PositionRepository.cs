using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Models;

namespace WebApplication1.Repositories
{
    class PositionRepository : IPositionRepository
    {
        private readonly ApplicationDbContext _dbContext;
        public PositionRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task AddPosition(Position position)
        {
           await _dbContext.Positions.AddAsync(position);
           await _dbContext.SaveChangesAsync();
        }

        public async Task DeletePosition(int positionId)
        {
           _dbContext.Positions.Remove(_dbContext.Positions.Find(positionId));
            await _dbContext.SaveChangesAsync();
        }

        public async Task<Position> GetPositionById(int positionId)
        {
            return await _dbContext.Positions.Include(p => p.Department).FirstOrDefaultAsync(p => p.Id == positionId);
        }

        public async Task<List<Position>> GetPositions()
        {
            return await _dbContext.Positions.ToListAsync();
        }

        public async Task<Position> UpdatePosition(Position position)
        {
            _dbContext.Positions.Update(position);
            await _dbContext.SaveChangesAsync();
            return position;
        }
    }
}