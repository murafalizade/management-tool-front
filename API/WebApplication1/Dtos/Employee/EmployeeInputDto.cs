using System;

namespace WebApplication1.Dtos{
    public class  EmployeeInputDto
    {
        public string FirstName { get; set; }
        public string FatherName{ get; set; }
        public string LastName { get; set; }
        public string Fin { get; set; }
        public string InjuranceNo { get; set; }
        public DateTime BirthDate { get; set; }
        public DateTime StartDate { get; set; } = DateTime.Now;
        public DateTime EnteranceDate { get; set; } = DateTime.Now;
        public string Phone { get; set; }
        public int WorkExperience {get;set;}
    }
}