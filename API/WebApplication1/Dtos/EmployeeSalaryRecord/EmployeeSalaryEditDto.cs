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
        public double PTMoney { get; set; }
        public int PTQat { get; set; } = 0;
        public bool IsEternalQat { get; set; } = false;
        public string AccountNumber { get; set; }
        public double AbilityPrice { get; set; } = 0;
        public double CyberSecurityPrice { get; set; }
        public double ForeignLanguagePrice { get; set; } = 0;
        public double ScientificDegreePrice { get; set; } = 0;
        public double HonorTitlePrice { get; set; } = 0;
        public double RankSalary { get; set; }
        public int FamilyCount { get; set; } = 0;
        public int RentQat { get; set; } = 0;
        public double RentPrice { get; set; }
        public double PositionSalary { get; set; }
        public double RepresentingPercentage { get; set; }
        public double ConfidentialityPercentage { get; set; }
        public double HarmfulnessPercentage { get; set; }
        public double ExploretionPrice { get; set; }
        public double ExtraMoney { get; set; }
        public double ExtraMoney2 { get; set; }
        public string Comment { get; set; }
        public double Tax { get; set; }
        public double DSMF { get; set; }
        public double Desert { get; set; }
        public double Fails { get; set; }
        public double AlimonyPercentage { get; set; }
        public double Alimony { get; set; }
        public double HealthInsurance { get; set; }
        public double Extra211100 { get; set; }
        public bool IsMatry { get; set; }
        public bool IsNotGiven { get; set; }
        public bool IsChernobil { get; set; }
        public bool IsVeteran { get; set; }
        public bool IsDisabled { get; set; }
        public bool IsOwner { get; set; }
        public bool IsQachqin { get; set; }
        public double FinancialAid { get; set; }
        public double Vacation { get; set; }
        public double KesfMezun { get; set; }
        public double KesfXeste { get; set; }
        public double TripExpense { get; set; }
        public double YukPulu { get; set; }
        public double ExitAid { get; set; }
        public double BusinessTrip { get; set; }
        public bool FoodGiven { get; set; }
        public double Food { get; set; }
        public bool IsFinancialAidGiven { get; set; }
        public bool IsVacationGiven { get; set; }
        public double VacationDSMF { get; set; }
        public bool IsExitAidGiven { get; set; }
        public double BPM { get; set; }
        public double BPMDSMF { get; set; }
        public int BPMQat { get; set; }

        public bool IsRankSalaryHand { get; set; }
        public bool IsPositionSalaryHand { get; set; }
        public bool IsLanguagePriceHand { get; set; }
        public bool IsPayerHand { get; set; }
        public bool IsQatHand { get; set; }
    }
}