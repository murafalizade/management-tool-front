using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models
{
    public class Adminstration :BaseEntity
    {
        public string Name { get; set; }
        public string ShortName {get; set;}
        public ICollection<Department> Departments { get; set; }
    }
}