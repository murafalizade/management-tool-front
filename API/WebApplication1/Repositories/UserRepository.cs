using System.Threading.Tasks;
using WebApplication1.Models;
using WebApplication1.Data;
using Microsoft.EntityFrameworkCore;

namespace WebApplication1.Repositories
{
    class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _dbContext;
        public UserRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task AddUser(User user)
        {
            await _dbContext.AdminUsers.AddAsync(user);
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteUser(User user)
        {
            _dbContext.AdminUsers.Remove(user);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<User> GetUserByEmail(string Email)
        {
            return await _dbContext.AdminUsers.FirstOrDefaultAsync(u => u.Email == Email);
        }

        public async Task<User> GetUserById(int id)
        {
            return await _dbContext.AdminUsers.FindAsync(id);
        }

        public async Task UpdateUser(User user)
        {
            _dbContext.AdminUsers.Update(user);
            await _dbContext.SaveChangesAsync();
        }
    }
}