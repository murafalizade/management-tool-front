namespace WebApplication1.Dtos
{
    public class PositionBasicDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Salary { get; set; }
        public int DepartmentId { get; set; }
        public int RankId { get; set; }
    }
}