using System.Collections.Generic;

namespace WebApplication1.Models
{
    public class Kiraye
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public ICollection<EmployeeSalaryRecord> EmployeeSalaryRecord { get; set; }
    }
}