using System.Collections.Generic;
using System.Threading.Tasks;
using WebApplication1.Dtos;
using WebApplication1.Repositories;

namespace WebApplication1.Services
{
    public class MeharetService : IMeharetService
    {
        private readonly IMeharetRepistory _meharetRepistory;
        public MeharetService(IMeharetRepistory MehIMeharetRepistory)
        {
            _meharetRepistory = MehIMeharetRepistory;
        }
        public async Task<ErrorHandelerDto> GetMeharets()
        {
            try
            {
                var kirayes = await _meharetRepistory.GetMeharets();
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