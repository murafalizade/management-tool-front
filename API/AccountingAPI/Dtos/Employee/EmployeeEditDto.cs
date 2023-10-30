using System;

namespace WebApplication1.Dtos
{
    public class EmployeeEditDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string FatherName { get; set; }
        public string LastName { get; set; }
        public string Fin { get; set; }
        public string InjuranceNo { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime BirthDate { get; set; }
        public string CommandNo { get; set; }
        public DateTime EnteranceDate { get; set; }
        public string EnteranceCommand { get; set; }
        public string Phone { get; set; }
    }
}