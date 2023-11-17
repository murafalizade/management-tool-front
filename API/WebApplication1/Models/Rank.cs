using System.Collections.Generic;

namespace WebApplication1.Models
{
    public class Rank:BaseEntity
    {
        public string Name { get; set; }
        public string ShortName {get; set;}
        public decimal Salary { get; set; }
        public ICollection<EmployeeSalaryRecord> EmployeeSalaryRecords { get; set; }

    }
}