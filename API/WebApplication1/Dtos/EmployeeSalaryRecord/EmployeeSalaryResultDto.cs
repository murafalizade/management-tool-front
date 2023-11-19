using System;
using WebApplication1.Models;

namespace WebApplication1.Dtos
{
  public class EmployeeSalaryResultDto
  {
    public int Id { get; set; }
    public string RecordDateMonth { get; set; }
    public string EmployeeFin { get; set; }
    public int EmployeeId { get; set; }
    public int? ForeignLanguageId { get; set; }
    public int? HonorTitleId { get; set; }
    public int? AbilityId { get; set; }
    public int? PositionId { get; set; }
    public int? ScientificDegreeId { get; set; }
    public int? RentId { get; set; }
    public int XIYears { get; set; }
    public int XIPercent { get; set; }
    public decimal XIMoney { get; set; }
    public string RecordDateYear { get; set; }
    public decimal PTMoney { get; set; }
    public int PTQat { get; set; }
    public bool IsEternalQat { get; set; }
    public DateTime EmployeeStartDate { get; set; }
    public string AccountNumber { get; set; }
    public string PositionName { get; set; }
    public int RankId { get; set; }
    public string RankName { get; set; }
    public decimal PositionSalary { get; set; }
    public int PositionDepartmentId { get; set; }
    public string PositionDepartmentName { get; set; }
    public DateTime EmployeePositionStartDate { get; set; }
    public string PositionDepartmentAdminstrationName { get; set; }
    public int PositionDepartmentAdminstrationId { get; set; }
    public string FullName { get; set; }
    public DateTime RecordDate { get; set; }
    public decimal RankSalary { get; set; }
    public decimal AbilityPrice { get; set; }
    public decimal Representing { get; set; }
    public int RepresentingPercentage { get; set; }
    public decimal Confidentiality { get; set; }
    public int ConfidentialityPercentage { get; set; }
    public decimal CyberSecurity { get; set; }
    public decimal Harmfulness { get; set; }
    public int HarmfulnessPercentage { get; set; }
    public decimal ForeignLanguagePrice { get; set; }
    public decimal ExploretionPrice { get; set; }
    public decimal ScientificDegreePrice { get; set; }
    public decimal HonorTitlePrice { get; set; }
    public decimal ExtraMoney { get; set; }
    public decimal ExtraMoney2 { get; set; }
    public string Comment { get; set; }
    public decimal TotalIncome { get; set; }
    public decimal Tax { get; set; }
    public decimal DSMF { get; set; }
    public decimal Fails { get; set; }
    public decimal AlimonyPercentage { get; set; }
    public decimal Alimony { get; set; }
    public decimal RentPrice { get; set; }
    public int FamilyCount { get; set; }
    public int RentQat { get; set; }
    public string RentName { get; set; }
    public decimal HealthInsurance { get; set; }
    public decimal Extra211100 { get; set; }
    public decimal Food { get; set; }
    public decimal TotalDiscount { get; set; }
    public decimal DiscountFood { get; set; }
    public decimal VacationDSMF { get; set; }
    public decimal ExitAidDSMF { get; set; }
    public int DiscountChernobil { get; set; }
    public int DiscountDsmf { get; set; }
    public int DiscountVeteranTaxDiscount { get; set; }
    public int DiscountMinWage { get; set; }
    public int DiscountMartyr { get; set; }
    public int DiscountVeteran { get; set; }
    public int DiscountDisability { get; set; }
    public int DiscountOwner { get; set; }
    public int DiscountTaxPercentage { get; set; }
    public int DiscountHealthInjurance { get; set; }
    public int DiscountQachqin { get; set; }
    public decimal Muavin { get; set; }
    public decimal DesertPrice { get; set; }
    public decimal YukPulu { get; set; }
    public decimal KesfXeste { get; set; }
    public decimal TripExpense { get; set; }
    public bool IsMatry { get; set; }
    public bool IsChernobyl { get; set; }
    public bool IsVeteran { get; set; }
    public bool IsDisabled { get; set; }
    public bool IsOwner { get; set; }
    public bool IsRefugee { get; set; }
    public decimal FinancialAid { get; set; }
    public decimal BusinessTrip { get; set; }
    public decimal KesfMezun { get; set; }
    public decimal ExitAid { get; set; }
    public decimal Vacation { get; set; }
    public decimal TotalGiven { get; set; }
    public decimal TotalTaken { get; set; }
    public decimal TotalDSMF { get; set; }
    public decimal TotalSalary { get; set; }
    public bool IsNotGiven { get; set; }
    public bool FoodGiven { get; set; }

    public bool IsFinancialAidGiven { get; set; }
    public decimal FinancialAidDSMF { get; set; }
    public bool IsExitAidGiven { get; set; }
    public decimal BPM { get; set; }
    public decimal BPMDSMF { get; set; }
    public int BPMQat { get; set; }
    public bool IsVacationGiven { get; set; }
    public bool IsBPMGiven { get; set; }
    public int CyberSecurityPercentage { get; set; } = 0;
    public bool IsRankSalaryHand { get; set; } = false;
    public bool IsPositionSalaryHand { get; set; } = false;
    public bool IsLanguagePriceHand { get; set; } = false;
    public bool IsPayerHand { get; set; } = false;
    public bool IsQatHand { get; set; } = false;
    public bool IsRentHand { get; set; } = false;
  
  }
}