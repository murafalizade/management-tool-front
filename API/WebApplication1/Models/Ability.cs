using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models
{
    public class Ability:BaseEntity
    {
        public string Name { get; set; }
        public int ForZabitPercentage { get; set; }
        public int ForGizirPercentage { get; set; }
        public int ForMuddetliPercentage { get; set; }

        public ICollection<EmployeeSalaryRecord> EmployeeSalaryRecords { get; set; }
    }
}