using System;
using WebApplication1.Models;

namespace WebApplication1.Dtos
{
    public class EmployeeGetDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string FatherName { get; set; }
        public string LastName { get; set; }
        public string Fin { get; set; }
        public string FexriAdName { get; set; }
        public string InjuranceNo { get; set; }
        public DateTime BirthDate { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EnteranceDate { get; set; }
        public string EnteranceCommand { get; set; }
        public DateTime MeharetDate { get; set; }
        public string CommandNo { get; set; }
        public string MeharetName { get; set; }
        public string Temsilcilik { get; set; }
        public string Mexfilik { get; set; }
        public string Zererlilik { get; set; }
        public string Kesfiyyat { get; set; }
        public string ElmiDerece { get; set; }
        public  Rank Rank { get; set; }
        public  XariciDil XariciDil { get; set; }
        public  FexriAd FexriAd { get; set; }
        public  Position Position { get; set; }
    }
}
