using System;

namespace WebApplication1.Dtos{
    public class  EmployeeEditDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string FatherName{ get; set; }
        public string LastName { get; set; }
        public string Fin { get; set; }
        public string InjuranceNo { get; set; }
        public DateTime BirthDate { get; set; }
        public string CommandNo { get; set; }
        public string Meharetlilik { get; set; }
        public string Temsilcilik { get; set; }
        public string Mexfilik { get; set; }
        public string Zererlilik { get; set; }
        public string XariciDil  { get; set; }
        public string Kesfiyyat { get; set; }
        public string ElmiDerece { get; set; }
        public string FexriAd { get; set; }
        public string ExtraMoney { get; set; }
        public string ExtraMoney2 { get; set; } 
    }
}