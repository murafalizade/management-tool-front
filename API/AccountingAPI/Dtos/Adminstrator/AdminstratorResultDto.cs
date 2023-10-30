using System.Collections.Generic;

namespace WebApplication1.Dtos
{
    public class AdminstratorResultDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ShortName { get; set; }
        public List<DepartmentBasicDto> Departments { get; set; }
    }
}