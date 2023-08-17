using System.Collections.Generic;

namespace WebApplication1.Models
{
    public class Position : BaseEntity
    {
        public string Name { get; set; }
        public double Salary { get; set; }
        public int? RankId { get; set; }
        public int DepartmentId { get; set; }
        public Rank Rank { get; set; }
        public Department Department { get; set; }

        public ICollection<EmployeeSalaryRecord> EmployeeSalaryRecords { get; set; }

    }
}