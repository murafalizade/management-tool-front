using System;
using WebApplication1.Models;

namespace WebApplication1.Dtos
{
    public class EmployeeSalaryEditDto
    {
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        public int? ForeignLanguageId { get; set; }
        public int? HonorTitleId { get; set; }
        public int? AbilityId { get; set; }
        public int? PositionId { get; set; }
        public int? RankId { get; set; }
        public int? ScientificDegreeId { get; set; }
        public int? RentId { get; set; }
        public int DiscountId { get; set; }
        public decimal PTMoney { get; set; }
        public decimal XIMoney { get; set; } = 0;
        public int PTQat { get; set; } = 0;
        public bool IsEternalQat { get; set; } = false;
        public string AccountNumber { get; set; }
        public decimal AbilityPrice { get; set; } = 0;
        public decimal ForeignLanguagePrice { get; set; } = 0;
        public decimal ScientificDegreePrice { get; set; } = 0;
        public decimal HonorTitlePrice { get; set; } = 0;
        public decimal RankSalary { get; set; }
        public int FamilyCount { get; set; } = 0;
        public int RentQat { get; set; } = 0;
        public decimal RentPrice { get; set; }
        public decimal PositionSalary { get; set; }
        public decimal RepresentingPercentage { get; set; }
        public decimal ConfidentialityPercentage { get; set; }
        public decimal HarmfulnessPercentage { get; set; }
        public decimal ExploretionPrice { get; set; }
        public decimal ExtraMoney { get; set; }
        public decimal ExtraMoney2 { get; set; }
        public string Comment { get; set; }
        public decimal Tax { get; set; }
        public decimal DSMF { get; set; }
        public decimal Desert { get; set; }
        public decimal Fails { get; set; }
        public decimal AlimonyPercentage { get; set; }
        public decimal Alimony { get; set; }
        public decimal HealthInsurance { get; set; }
        public decimal Extra211100 { get; set; }
        public bool IsMatry { get; set; }
        public bool IsNotGiven { get; set; }
        public bool IsChernobil { get; set; }
        public bool IsVeteran { get; set; }
        public bool IsDisabled { get; set; }
        public bool IsOwner { get; set; }
        public bool IsQachqin { get; set; }
        public decimal FinancialAid { get; set; }
        public decimal Vacation { get; set; }
        public decimal KesfMezun { get; set; }
        public decimal KesfXeste { get; set; }
        public decimal TripExpense { get; set; }
        public decimal YukPulu { get; set; }
        public decimal ExitAid { get; set; }
        public decimal BusinessTrip { get; set; }
        public bool FoodGiven { get; set; }
        public decimal Food { get; set; }
        public bool IsFinancialAidGiven { get; set; }
        public bool IsVacationGiven { get; set; }
        public decimal VacationDSMF { get; set; }
        public bool IsExitAidGiven { get; set; }
        public decimal CyberSecurity { get; set; }
        public int CyberSecurityPercentage { get; set; } = 0;

        public decimal BPM { get; set; }
        public decimal BPMDSMF { get; set; }
        public int BPMQat { get; set; }
        public bool IsBPMGiven { get; set; }

        public bool IsRankSalaryHand { get; set; }
        public bool IsPositionSalaryHand { get; set; }
        public bool IsLanguagePriceHand { get; set; }
        public bool IsPayerHand { get; set; }
        public bool IsQatHand { get; set; }
        public bool IsRentHand { get; set; } 

    }
}