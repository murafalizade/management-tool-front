using System.Collections.Generic;

namespace WebApplication1.Dtos
{
    public class RankDto
    {
        public string Name { get; set; }
        public List<EmployeeSalaryResultDto> EmployeeSalaryRecords { get; set; }
    }
}