namespace WebApplication1.Models
{
    public class Position
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Salary { get; set; }
        public int DepartmentId { get; set; }
        public Department Department { get; set; }
    }
}