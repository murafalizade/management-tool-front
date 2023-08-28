using System.Collections.Generic;
using System.Threading.Tasks;
using WebApplication1.Dtos;
using WebApplication1.Models;
using WebApplication1.Repositories;

namespace WebApplication1.Services
{
    public class ElmiDereceService : IElmiDereceService
    {
        private readonly IElmiDereceRepository _elmiDereceRepository;
        public ElmiDereceService(IElmiDereceRepository elmiDereceRepository)
        {
            _elmiDereceRepository = elmiDereceRepository;
        }

        public async Task<ErrorHandelerDto> AddScientificDegree(ScientificDegree scientificDegree)
        {
            await _elmiDereceRepository.Add(scientificDegree);
            return new ErrorHandelerDto{
                StatusCode = 200,
                data = null
              };
        }

        public async Task<ErrorHandelerDto> DeleteScientificDegree(int id)
        {
           await _elmiDereceRepository.Delete(id);
           return new ErrorHandelerDto{
                StatusCode = 200,
                data = null
              };
        }

        public async Task<ErrorHandelerDto> GetElmiDereces()
        {
            try
            {
                var kirayes = await _elmiDereceRepository.GetElmiDereces();
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

        public async Task<ErrorHandelerDto> UpdateScientificDegree(ScientificDegree scientificDegree)
        {
            await _elmiDereceRepository.Update(scientificDegree);
            return new ErrorHandelerDto
            {
                StatusCode = 200,
                data = null
            };
            
        }
    }
}