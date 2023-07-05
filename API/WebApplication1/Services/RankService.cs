using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using WebApplication1.Dtos;
using WebApplication1.Models;
using WebApplication1.Repositories;

namespace WebApplication1.Services
{
    class RankService : IRankService
    {
        private readonly IRankRepository _rankRepository;
        private readonly IMapper _mapper;
        public RankService(IRankRepository rankRepository, IMapper mapper)
        {
            _mapper = mapper;
            _rankRepository = rankRepository;
        }
        public async Task<ErrorHandelerDto> AddRank(Rank rank)
        {
            if (rank == null)
            {
                return new ErrorHandelerDto
                {
                    StatusCode = 400,
                    data = "Rank is null"
                };
            }
            await _rankRepository.AddRank(rank);
            return new ErrorHandelerDto
            {
                StatusCode = 200,
                data = "Rank added successfully"
            };

        }

        public async Task<ErrorHandelerDto> DeleteRank(int rankId)
        {
            if (rankId <= 0)
            {
                return new ErrorHandelerDto
                {
                    StatusCode = 400,
                    data = "Rank Id is not valid"
                };
            }
            await _rankRepository.DeleteRank(rankId);
            return new ErrorHandelerDto
            {
                StatusCode = 200,
                data = "Rank deleted successfully"
            };
        }

        // public async Task<ErrorHandelerDto> GetRankById(int rankId)
        // {
        //     if (rankId <= 0)
        //     {
        //         return new ErrorHandelerDto
        //         {
        //             StatusCode = 400,
        //             data = "Rank Id is not valid"
        //         };
        //     }
        //     var Rank = await _rankRepository.GetRankById(rankId);
        //     if (Rank == null)
        //     {
        //         return new ErrorHandelerDto
        //         {
        //             StatusCode = 404,
        //             data = "Rank not found"
        //         };
        //     }
        //     return new ErrorHandelerDto
        //     {
        //         StatusCode = 200,
        //         data = Rank
        //     };
        // }

        public async Task<ErrorHandelerDto> GetRanks()
        {
            return new ErrorHandelerDto
            {
                StatusCode = 200,
                data = await _rankRepository.GetRanks()
            };
        }

        public async Task<ErrorHandelerDto> UpdateRank(Rank Rank)
        {
            if (Rank == null)
            {
                return new ErrorHandelerDto
                {
                    StatusCode = 400,
                    data = "Rank is null"
                };
            }
            await _rankRepository.UpdateRank(Rank);
            return new ErrorHandelerDto
            {
                StatusCode = 200,
                data = "Rank updated successfully"
            };
        }
    }
}