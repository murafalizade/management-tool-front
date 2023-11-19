using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models
{
    public class Discount :BaseEntity
    {
        public int TaxPercentage { get; set; }
        public int Dsmf { get; set; }
        public int HealthInjurance { get; set; }
        public decimal Food { get; set; }
        public decimal Veteran { get; set; }
        public decimal Disability { get; set; }
        public decimal Refugee { get; set; }
        public decimal Chernobyl { get; set; }
        public decimal Martyr { get; set; }
        public decimal Owner { get; set; }
        public decimal Desert { get; set; }
        public decimal VeteranTaxDiscount { get; set; }
        public decimal MinWage { get; set; } = 0;

        public ICollection<EmployeeSalaryRecord> EmployeeSalaryRecords { get; set; }
    }
}