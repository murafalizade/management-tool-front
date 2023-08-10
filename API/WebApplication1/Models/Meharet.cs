using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models
{
    public class Meharet
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int ForZabitPercentage { get; set; }
        public int ForGizirPercentage { get; set; }
        public int ForMuddetliPercentage { get; set; }

        public ICollection<Employee> Employees { get; set; }
    }
}