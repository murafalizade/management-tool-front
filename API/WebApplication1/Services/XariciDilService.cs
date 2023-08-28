using System.Collections.Generic;
using System.Threading.Tasks;
using WebApplication1.Dtos;
using WebApplication1.Models;
using WebApplication1.Repositories;

namespace WebApplication1.Services
{
    public class XariciDilService : IXariciDilService
    {
        private readonly IXariciDilRepository _XariciDilRepository;
        public XariciDilService(IXariciDilRepository IXariciDilRepository)
        {
            _XariciDilRepository = IXariciDilRepository;
        }

        public async Task<ForeignLanguage> AddXariciDil(ForeignLanguage xariciDil)
        {
            await _XariciDilRepository.Add(xariciDil);
            return xariciDil;
        }

        public async Task<ErrorHandelerDto> DeleteXariciDil(int id)
        {
            await _XariciDilRepository.Delete(id);
            return new ErrorHandelerDto
            {
                StatusCode = 200,
                data = null
            };
        }

        public async Task<ErrorHandelerDto> GetXariciDil()
        {
            try
            {
                var kirayes = await _XariciDilRepository.GetXariciDils();
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

        public async Task<ErrorHandelerDto> UpdateXariciDil(ForeignLanguage xariciDil)
        {
            await _XariciDilRepository.Update(xariciDil);
            return new ErrorHandelerDto
            {
                StatusCode = 200,
                data = null
            };
        }
    }
}