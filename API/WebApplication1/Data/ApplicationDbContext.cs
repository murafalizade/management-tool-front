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
        public DbSet<Discount> Discounts { get; set; }
        public DbSet<EmployeeSalaryRecord> EmployeeSalaryRecords { get; set; }
        public DbSet<Kiraye> Kirayes { get; set; }
        public DbSet<XariciDil> XariciDils { get; set; }
        public DbSet<FexriAd> FexriAds { get; set; }
        public DbSet<Meharet> Meharets { get; set; }
        public DbSet<ElmiDerece> ElmiDereces { get; set; }
     }
}
