using System.Collections.Generic;

namespace WebApplication1.Models
{
    public class Rent:BaseEntity
    {
        public string Name { get; set; }
        public decimal Price { get; set; }
        public ICollection<EmployeeSalaryRecord> EmployeeSalaryRecord { get; set; }
    }
}