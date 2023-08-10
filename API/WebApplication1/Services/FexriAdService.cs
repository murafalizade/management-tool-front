using System.Collections.Generic;
using System.Threading.Tasks;
using WebApplication1.Dtos;
using WebApplication1.Repositories;

namespace WebApplication1.Services
{
    public class FexriAdService : IFexriAdService
    {
        private readonly IFexriAdRepository _FexriAIFexriAdRepository;
        public FexriAdService(IFexriAdRepository FexriAIFexriAdRepository)
        {
            _FexriAIFexriAdRepository = FexriAIFexriAdRepository;
        }
        public async Task<ErrorHandelerDto> GetFexriAd()
        {
            try
            {
                var kirayes = await _FexriAIFexriAdRepository.GetFexriAds();
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