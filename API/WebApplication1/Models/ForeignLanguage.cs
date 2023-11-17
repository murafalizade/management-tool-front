using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models
{
    public class ForeignLanguage:BaseEntity
    {
        public string Name { get; set; }
        public int Percentage { get; set; }
        public ICollection<EmployeeSalaryRecord> EmployeeSalaryRecords { get; set; }
    }
}