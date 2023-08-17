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
        public double Food { get; set; }
        public double Veteran { get; set; }
        public double Disability { get; set; }
        public double Refugee { get; set; }
        public double Chernobyl { get; set; }
        public double Martyr { get; set; }
        public double Owner { get; set; }
        public double Desert { get; set; }
        public double VeteranTaxDiscount { get; set; }
        public double MinWage { get; set; }

        public ICollection<EmployeeSalaryRecord> EmployeeSalaryRecords { get; set; }
    }
}