using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models
{
    public class FexriAd
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Salary { get; set; }

        //public ICollection<Employee> Employees { get; set; }
    }
}