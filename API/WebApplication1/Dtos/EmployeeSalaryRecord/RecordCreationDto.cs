using System;
using WebApplication1.Models;

namespace WebApplication1.Dtos
{
    public class RecordCreationDto
    {
        public int XIPercent { get; set; } = 0;
        public double RankSalary { get; set; } = 0;
        public double PositionSalary { get; set; } = 0;
        public DateTime RecordDate { get; set; } = DateTime.Now;
        public double ExtraMoney { get; set; } = 0;
        public double ExtraMoney2 { get; set; } = 0;
        public double Representing { get; set; } = 0;
        public double AbilityPrice { get; set; } = 0;
        public double Confidentiality { get; set; } = 0;
        public double Harmfulness { get; set; } = 0;
        public double ForeignLanguagePrice { get; set; } = 0;
        public double ScientificDegreePrice { get; set; } = 0;
        public double HonorTitlePrice { get; set; } = 0;
        public double PTMoney { get; set; } = 0;
        public double XIMoney { get; set; } = 0;
        public double Tax { get; set; } = 0;
        public double DSMF { get; set; } = 0;
        public double HealthInsurance { get; set; } = 0;
        public double Food { get; set; } = 0;
        public double Muavin { get; set; } = 0;
        public double DesertPrice { get; set; } = 0;
        public double VacationDSMF { get; set; } = 0;
        public double Vacation { get; set; } = 0;
        public double FinancialAid { get; set; } = 0;
        public double FinancialAidDSMF { get; set; } = 0;
        public double ExitAid { get; set; } = 0;
        public double ExitAidDSMF { get; set; } = 0;


        public int EmployeeId { get; set; }
        public int? ForeignLanguageId { get; set; }
        public int? HonorTitleId { get; set; }
        public int? AbilityId { get; set; }
        public int? PositionId { get; set; }
        public int? ScientificDegreeId { get; set; }
        public int? RentId { get; set; }
        public Discount Discount { get; set; }
    }
}