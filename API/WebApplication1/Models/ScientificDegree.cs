using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace WebApplication1.Models
{
    public class ScientificDegree:BaseEntity
    {
        public string Name { get; set; }
        public int For5to10Salary { get; set; }
        public int For10to15Salary { get; set; }
        public int For15to20Salary { get; set; }
        public int For20Salary { get; set; }
        public ICollection<EmployeeSalaryRecord> EmployeeSalaryRecords { get; set; }
    }
}