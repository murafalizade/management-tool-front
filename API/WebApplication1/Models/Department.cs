using System.Collections.Generic;

namespace WebApplication1.Models
{
    public class Department
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<Position> Positions { get; set; }
        public int AdminstrationId { get; set; }
        public Adminstration Adminstration { get; set; }
    }
}
