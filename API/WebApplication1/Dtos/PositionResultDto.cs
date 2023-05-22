namespace WebApplication1.Dtos
{
    public class PositionResultDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Salary { get; set; }
        public DepartmentBasicDto Department { get; set; }
    }
}