using System;
using WebApplication1.Models;

namespace WebApplication1.Dtos
{
  public class EmployeeSalaryResultDto
  {
    public int Id { get; set; }
    public string RecordDateMonth { get; set; }
    public int EmployeeId { get; set; }
    public int? ForeignLanguageId { get; set; }
    public int? HonorTitleId { get; set; }
    public int? AbilityId { get; set; }
    public int? PositionId { get; set; }
    public int? ScientificDegreeId { get; set; }
    public int? RentId { get; set; }
    public int XIYears { get; set; }
    public int XIPercent { get; set; }
    public double XIMoney { get; set; }
    public string RecordDateYear { get; set; }
    public double PTMoney { get; set; }
    public int PTQat { get; set; }
    public bool IsEternalQat { get; set; }
    public DateTime EmployeeStartDate { get; set; }
    public string AccountNumber { get; set; }
    public string PositionName { get; set; }
    public int RankId { get; set; }
    public string RankName { get; set; }
    public double PositionSalary { get; set; }
    public string EmployeePositionDepartmentName { get; set; }
    public DateTime EmployeePositionStartDate { get; set; }
    public string EmployeePositionDepartmentAdminstrationName { get; set; }
    public string FullName { get; set; }
    public DateTime RecordDate { get; set; }
    public double RankSalary { get; set; }
    public double AbilityPrice { get; set; }
    public double Representing { get; set; }
    public int RepresentingPercentage { get; set; }
    public double Confidentiality { get; set; }
    public int ConfidentialityPercentage { get; set; }
    public double CyberSecurity { get; set; }
    public double Harmfulness { get; set; }
    public int HarmfulnessPercentage { get; set; }
    public double ForeignLanguagePrice { get; set; }
    public double ExploretionPrice { get; set; }
    public double ScientificDegreePrice { get; set; }
    public double HonorTitlePrice { get; set; }
    public double ExtraMoney { get; set; }
    public double ExtraMoney2 { get; set; }
    public string Comment { get; set; }
    public double TotalIncome { get; set; }
    public double Tax { get; set; }
    public double DSMF { get; set; }
    public double Fails { get; set; }
    public double AlimonyPercentage { get; set; }
    public double Alimony { get; set; }
    public double RentPrice { get; set; }
    public int FamilyCount { get; set; }
    public int RentQat { get; set; }
    public string KirayeName { get; set; }
    public double HealthInsurance { get; set; }
    public double Extra211100 { get; set; }
    public double Food { get; set; }
    public double TotalDiscount { get; set; }
    public double DiscountFood { get; set; }
    public double VacationDSMF { get; set; }
    public double ExitAidDSMF { get; set; }
    public int DiscountChernobil { get; set; }
    public int DiscountDsmf { get; set; }
    public int DiscountMartyr { get; set; }
    public int DiscountVeteran { get; set; }
    public int DiscountDisability { get; set; }
    public int DiscountOwner { get; set; }
    public int DiscountTaxPercentage { get; set; }
    public int DiscountHealthInjurance { get; set; }
    public int DiscountQachqin { get; set; }
    public double Muavin { get; set; }
    public double DesertPrice { get; set; }
    public double YukPulu { get; set; }
    public double KesfXeste { get; set; }
    public double TripExpense { get; set; }
    public bool IsMatry { get; set; }
    public bool IsChernobyl { get; set; }
    public bool IsVeteran { get; set; }
    public bool IsDisabled { get; set; }
    public bool IsOwner { get; set; }
    public bool IsRefugee { get; set; }
    public double FinancialAid { get; set; }
    public double BusinessTrip { get; set; }
    public double KesfMezun { get; set; }
    public double ExitAid { get; set; }
    public double Vacation { get; set; }
    public double TotalGiven { get; set; }
    public double TotalTaken { get; set; }
    public double TotalDSMF { get; set; }
    public double TotalSalary { get; set; }
    public bool IsNotGiven { get; set; }
    public bool FoodGiven { get; set; }

    public bool IsFinancialAidGiven { get; set; }
    public double FinancialAidDSMF { get; set; }
    public bool IsExitAidGiven { get; set; }
    public double BPM { get; set; }
    public double BPMDSMF { get; set; }
    public int BPMQat { get; set; }
    public bool IsVacationGiven { get; set; }
    public bool IsBPMGiven { get; set; }
        public int CyberSecurityPercentage { get; set; } = 0;

    public bool IsRankSalaryHand { get; set; } = true;
    public bool IsPositionSalaryHand { get; set; } = true;
    public bool IsLanguagePriceHand { get; set; } = true;
    public bool IsPayerHand { get; set; } = true;
    public bool IsQatHand { get; set; } = true;
    public bool IsRentHand { get; set; } = true;
  
  }
}