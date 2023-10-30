using System.Threading.Tasks;
using WebApplication1.Dtos;
using WebApplication1.Models;

namespace WebApplication1.Services
{
    public interface IAuthService
    {
        Task<ErrorHandelerDto> Register(string email, string password, string firstName, string lastName,string role);
        Task<ErrorHandelerDto> Login(string email, string password);
        Task<ErrorHandelerDto> GetUser(int id);
        Task<bool> UserExists(string email);
        Task<ErrorHandelerDto> UpdateUser(UserUpdateDto user);
    }
}