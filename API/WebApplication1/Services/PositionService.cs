using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using WebApplication1.Dtos;
using WebApplication1.Models;
using WebApplication1.Repositories;

namespace WebApplication1.Services{
    class PositionService : IPositionService
    {
        private readonly IPositionRepository _positionRepository;
        private readonly IMapper _mapper;
        public PositionService(IPositionRepository positionRepository, IMapper mapper)
        {
            _mapper = mapper;
            _positionRepository = positionRepository;
        }
        public async Task<ErrorHandelerDto> AddPosition(PositionInputcDto position)
        {
            if (position == null)
            {
                return new ErrorHandelerDto
                {
                    StatusCode = 400,
                    data = "Position is null"
                };
            }
            await _positionRepository.AddPosition(_mapper.Map<Position>(position));
            return new ErrorHandelerDto
            {
                StatusCode = 200,
                data = "Position added successfully"
            };

        }

        public async Task<ErrorHandelerDto> DeletePosition(int positionId)
        {
            if(positionId <= 0)
            {
                return new ErrorHandelerDto
                {
                    StatusCode = 400,
                    data = "Position Id is not valid"
                };
            }
            await _positionRepository.DeletePosition(positionId);
            return new ErrorHandelerDto
            {
                StatusCode = 200,
                data = "Position deleted successfully"
            };
        }

        public async Task<ErrorHandelerDto> GetPositionById(int positionId)
        {
            if (positionId <= 0)
            {
                return new ErrorHandelerDto
                {
                    StatusCode = 400,
                    data = "Position Id is not valid"
                };
            }
            var position = await _positionRepository.GetPositionById(positionId);
            if (position == null)
            {
                return new ErrorHandelerDto
                {
                    StatusCode = 404,
                    data = "Position not found"
                };
            }
            return new ErrorHandelerDto
            {
                StatusCode = 200,
                data = _mapper.Map<PositionResultDto>(position)
            };
        }

        public async Task<ErrorHandelerDto> GetPositions()
        {
            return new ErrorHandelerDto
            {
                StatusCode = 200,
                data = _mapper.Map<List<PositionBasicDto>>(await _positionRepository.GetPositions())
            };
        }

        public async Task<ErrorHandelerDto> UpdatePosition(Position position)
        {
            if(position == null)
            {
                return new ErrorHandelerDto
                {
                    StatusCode = 400,
                    data = "Position is null"
                };
            }
            await _positionRepository.UpdatePosition(position);
            return new ErrorHandelerDto
            {
                StatusCode = 200,
                data = "Position updated successfully"
            };
        }

        public async Task<ErrorHandelerDto> SavePosition(List<PositionBasicDto> position)
        {
            if(position == null)
            {
                return new ErrorHandelerDto { StatusCode = 400, data = "Error",isError=true };
            }
            foreach(PositionBasicDto positionBasicDto in position)
            {
                Position position1 = _mapper.Map<Position>(positionBasicDto);
                if (position1.Id < 0)
                {
                    position1.Id = 0;
                    await _positionRepository.AddPosition(position1);
                }
                else
                {
                    await _positionRepository.UpdatePosition(position1);
                }

            }
            return new ErrorHandelerDto { StatusCode =200, data="Sucess" };
        }
    }
}