using System.Collections.Generic;
using System.Threading.Tasks;
using WebApplication1.Models;

namespace WebApplication1.Repositories
{
    public interface IMeharetRepistory
    {
       Task<List<Ability>> GetMeharets();
        Task Delete(int id);
        Task Update(Ability ability);
    }
}