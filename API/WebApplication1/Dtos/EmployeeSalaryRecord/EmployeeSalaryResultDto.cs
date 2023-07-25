using System;
using WebApplication1.Models;

namespace WebApplication1.Dtos
{
    public class EmployeeSalaryResultDto
    {
        public int Id { get; set; }
        public string recordDateMonth { get; set; }
        public int XIYears { get; set; }
        public int XIMonths { get; set; }
        public int XIDays { get; set; }
        public int XIPercentage { get; set; }
        public double XIMoney { get; set; }
        public string recordDateYear { get; set; }
        public double PTMoney { get; set; }
        public DateTime EmployeeStartDate { get; set; }
        public string AccountNumber { get; set; }
        public double Kibertehlukesizlik { get; set; }
        public string EmployeePositionName { get; set; }
        public string EmployeeRankName { get; set; }
        public double EmployeePositionSalary { get; set; }
        public double EmployeeRankSalary { get; set; }
        public string EmployeePositionDepartmentName { get; set; }
        public string EmployeePositionDepartmentAdminstrationName { get; set; }
        public string FullName { get; set; }
        public DateTime RecordDate { get; set; }
        public double RankSalary { get; set; }
        public double PositionSalary { get; set; }
        public double Meharetlilik { get; set; }
        public double Temsilcilik { get; set; }
        public double Mexfilik { get; set; }
        public double Zererlilik { get; set; }
        public double XariciDil { get; set; }
        public double Kesfiyyat { get; set; }
        public double ElmiDerece { get; set; }
        public double FexriAd { get; set; }
        public double ExtraMoney { get; set; }
        public double ExtraMoney2 { get; set; }
        public string Comment { get; set; }
        public int EmployeeId { get; set; }
        public double TotalIncome { get; set; }
        public double Tax { get; set; }
        public double DSMF { get; set; }
        public double Kesirler { get; set; }
        public double Aliment { get; set; }
        public double HealthInsurance { get; set; }
        public double Extra211100 { get; set; }
        public double Food { get; set; }
        public double TotalDiscount { get; set; }
        public int DiscountChernobil { get; set; }
        public int DiscountDsmf { get; set; }
        public int DiscountMartyr { get; set; }
        public int DiscountVeteran { get; set; }
        public int DiscountDisability { get; set; }
        public int DiscountOwner { get; set; }
        public int DiscountQachqin { get; set; }
        public double Muavin { get; set; }
        public double Sehra { get; set; }
        public bool isMatry { get; set; }
        public bool isChernobil { get; set; }
        public bool isVeteran { get; set; }
        public bool isDisabled { get; set; }
        public bool isOwner { get; set; }
        public bool isQachqin { get; set; }
        public double MaddiYardim {get;set;}
        public double Ezamiyyet { get; set; }
        public double KesfMezun { get; set; }
        public double CixisMuv { get; set; }
        public double Mezuniyyet {get;set;}
        public double TotalGiven {get;set;}
        public double TotalTaken {get;set;}
        public double TotalDSMF {get;set;}
        public double TotalSalary { get; set; }
        public bool IsNotGiven {get;set;}
    }
}