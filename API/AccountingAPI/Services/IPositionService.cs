using System.Collections.Generic;
using System.Threading.Tasks;
using WebApplication1.Dtos;
using WebApplication1.Models;

namespace WebApplication1.Services
{
    public interface IPositionService
    {
        Task<ErrorHandelerDto> GetPositions();
        Task<ErrorHandelerDto> GetPositionById(int positionId);
        Task<ErrorHandelerDto> AddPosition(PositionInputcDto position);
        Task<ErrorHandelerDto> UpdatePosition(Position position);
        Task<ErrorHandelerDto> DeletePosition(int positionId);
        Task<ErrorHandelerDto> SavePosition(List<PositionBasicDto> position);
    }
}