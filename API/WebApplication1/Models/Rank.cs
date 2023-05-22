using System.Collections.Generic;

namespace WebApplication1.Models
{
    public class Rank
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ShortName {get; set;}
        public int Salary { get; set; }

        public ICollection<Employee> Employees { get; set; }
    }
}