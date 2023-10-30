using System.Collections.Generic;
using System.Threading.Tasks;
using WebApplication1.Models;

namespace WebApplication1.Repositories
{
    public interface IKirayeRepository
    {
       Task<List<Rent>> GetKirayes();
       Task<Rent> Add(Rent kiraye);
       Task Delete(int id);
       Task  Update(Rent kiraye);
    }
}