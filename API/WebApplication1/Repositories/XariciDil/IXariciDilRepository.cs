using System.Collections.Generic;
using System.Threading.Tasks;
using WebApplication1.Models;

namespace WebApplication1.Repositories
{
    public interface IXariciDilRepository
    {
       Task<List<ForeignLanguage>> GetXariciDils();
       Task<ForeignLanguage> Add(ForeignLanguage foreignLanguage);
        Task Delete(int id);
        Task Update(ForeignLanguage foreignLanguage);
    }
}