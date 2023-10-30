using Microsoft.EntityFrameworkCore;
using WebApplication1.Models;

namespace WebApplication1.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        public DbSet<User> AdminUsers { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<Adminstration> Adminstrations { get; set; }
        public DbSet<Position> Positions { get; set; }
        public DbSet<Rank> Ranks { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Discount> Discounts { get; set; }
        public DbSet<EmployeeSalaryRecord> EmployeeSalaryRecords { get; set; }
        public DbSet<Rent> Rents { get; set; }
        public DbSet<ForeignLanguage> ForeignLanguages { get; set; }
        public DbSet<HonorTitle> HonorTitles { get; set; }
        public DbSet<Ability> Abilities { get; set; }
        public DbSet<ScientificDegree> ScientificDegrees { get; set; }
    }
}
