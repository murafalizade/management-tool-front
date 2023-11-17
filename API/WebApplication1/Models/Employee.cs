using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;

namespace WebApplication1.Models
{
    public class Employee:BaseEntity
    {
        public string FirstName { get; set; }
        public string FatherName{ get; set; }
        public string LastName { get; set; }
        public string Fin { get; set; }
        public string Phone {get; set;}
        public string InjuranceNo { get; set; }
        public DateTime BirthDate { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EnteranceDate { get; set; }
        public DateTime MeharetDate { get; set; }
        public string EnteranceCommand { get; set; }
        public string CommandNo { get; set; }
        
        public ICollection<EmployeeSalaryRecord> EmployeeSalaryRecords { get; set; }
    }
}