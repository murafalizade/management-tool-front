using System.Collections.Generic;
using System.Threading.Tasks;
using WebApplication1.Dtos;
using WebApplication1.Models;
using WebApplication1.Repositories;

namespace WebApplication1.Services
{
    public class KirayeService : IKirayeService
    {
        private readonly IKirayeRepository _kirayeRepository;
        public KirayeService(IKirayeRepository kirayeRepository)
        {
            _kirayeRepository = kirayeRepository;
        }

        public async Task<ErrorHandelerDto> DeleteKiraye(int id)
        {
            await _kirayeRepository.Delete(id);
            return new ErrorHandelerDto
            {
                StatusCode = 200,
                data = null
            };
        }

        public async Task<ErrorHandelerDto> GetKirayes()
        {
            try
            {
                var kirayes = await _kirayeRepository.GetKirayes();
                return new ErrorHandelerDto
                {
                    StatusCode = 200,
                    data = kirayes
                };
            }
            catch (System.Exception)
            {
                return new ErrorHandelerDto
                {
                    StatusCode = 500,
                    data = null
                };
            }
        }

        public async Task<ErrorHandelerDto> UpdateKiraye(Rent kiraye)
        {
            await _kirayeRepository.Update(kiraye);
            return new ErrorHandelerDto
            {
                StatusCode = 200,
                data = null
            };
        }
    }
}