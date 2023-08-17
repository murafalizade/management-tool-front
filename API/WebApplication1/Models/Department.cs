using System.Collections.Generic;

namespace WebApplication1.Models
{
    public class Department:BaseEntity
    {
        public string Name { get; set; }
        public int AdminstrationId { get; set; }
        public ICollection<Position> Positions { get; set; }
        public Adminstration Adminstration { get; set; }
    }
}
