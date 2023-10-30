using System.Collections.Generic;
using WebApplication1.Models;
using System.Threading.Tasks;

namespace WebApplication1.Repositories
{
    interface IUserRepository
    {
        Task<User> GetUserById(int id);
        Task<User> GetUserByEmail(string Email);
        Task AddUser(User user);
        Task UpdateUser(User user);
        Task DeleteUser(User user);
    }
}