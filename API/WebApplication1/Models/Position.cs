using System.Collections.Generic;

namespace WebApplication1.Models
{
    public class Position : BaseEntity
    {
        public string Name { get; set; }
        public decimal Salary { get; set; }
        public int DepartmentId { get; set; }
        public string RankName { get; set; }
        public Department Department { get; set; }

        public ICollection<EmployeeSalaryRecord> EmployeeSalaryRecords { get; set; }

    }
}