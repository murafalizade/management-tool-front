using System;

namespace WebApplication1.Models
{
    public class Employee
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string FatherName{ get; set; }
        public string LastName { get; set; }
        public string FİN { get; set; }
        public string InjuranceNo { get; set; }
        public DateTime BirthDate { get; set; }
        public DateTime StartDate { get; set; }
        public string CommandNo { get; set; }
        public int RankId { get; set; }
        public Rank Rank { get; set; }
        public int PositionId { get; set; }
        public Position Position { get; set; }
    }
}