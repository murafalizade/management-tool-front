using System.Collections.Generic;

namespace WebApplication1.Dtos
{
    public class DepartmantResultDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public AdminstratorBasicDto Adminstration { get; set; }
        public ICollection<PositionBasicDto> Positions { get; set; }
    }
}