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
        public DateTime MeharetDate { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime BirthDate { get; set; }
        public string CommandNo { get; set; }
        public DateTime EnteranceDate { get; set; }
        public string EnteranceCommand { get; set; }
        public string FexriAdName { get; set; }

        // public string Temsilcilik { get; set; }
        // public string Mexfilik { get; set; }
        // public string Zererlilik { get; set; }
        // public string Kesfiyyat { get; set; }


        public string ElmiDerece { get; set; }
        public int? MeharetId { get; set; }
        public int? FexriAdId { get; set; }
        public int? PositionId { get; set; }
        public int? RankId { get; set; }
        public int? XariciDilId { get; set; }
    }
}