using System.Collections.Generic;
using System.Threading.Tasks;
using WebApplication1.Models;

namespace WebApplication1.Repositories
{
    public interface IFexriAdRepository
    {
       Task<List<HonorTitle>> GetFexriAds();
        Task Delete(int id);
        Task<HonorTitle> Update(HonorTitle honorTitle);
    }
}