using System.Collections.Generic;
using System.Threading.Tasks;
using WebApplication1.Dtos;
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
    }
}