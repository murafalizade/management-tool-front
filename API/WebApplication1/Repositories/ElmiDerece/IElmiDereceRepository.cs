using System.Collections.Generic;
using System.Threading.Tasks;
using WebApplication1.Models;

namespace WebApplication1.Repositories
{
    public interface IElmiDereceRepository
    {
       Task<List<ScientificDegree>> GetElmiDereces();
        Task Update(ScientificDegree degree);
        Task Delete(int id);
    }
}