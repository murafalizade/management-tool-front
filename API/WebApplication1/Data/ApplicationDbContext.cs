using Microsoft.EntityFrameworkCore;
using WebApplication1.Models;

namespace WebApplication1.Data
{
    public class ApplicationDbContext:DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options):base(options)
        {

        }

        public DbSet<User> AdminUsers { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<Adminstration> Adminstrations { get; set; }
        public DbSet<Position> Positions { get; set; }
        public DbSet<Rank> Ranks { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<EmployeeSalaryRecord> EmployeeSalaryRecords { get; set; }
     }
}
