using System;
using WebApplication1.Models;

namespace WebApplication1.Dtos
{
    public class EmployeeSalaryEditDto
    {
        public int Id { get; set; }
        public double PTMoney { get; set; }
         public int PTQat { get; set; } = 0;
        public bool IsEternalQat { get; set; } = false;
        public string AccountNumber { get; set; }
        public double Kibertehlukesizlik { get; set; }
        public double RankSalary { get; set; }
        public int KirayeId { get; set; } = 1;
        public int FamilyCount { get; set; } = 0;
        public int KirayeQat { get; set; } = 0;
        public double KirayePrice { get; set; }
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
        public double Tax { get; set; }
        public double DSMF { get; set; }
        public double Sehra { get; set; }
        public double Kesirler { get; set; }
        public double AlimentPercentage { get; set; }
        public double Aliment { get; set; }
        public double HealthInsurance { get; set; }
        public double Extra211100 { get; set; }
        public bool isMatry { get; set; }
        public bool isNotGiven { get; set; }
        public bool isChernobil { get; set; }
        public bool isVeteran { get; set; }
        public bool isDisabled { get; set; }
        public bool isOwner { get; set; }
        public bool isQachqin { get; set; }
        public double MaddiYardim { get; set; }
        public double Ezamiyyet { get; set; }
        public double KesfMezun { get; set; }
        public double KesfXeste { get; set; }
        public double YolXerci { get; set; }
        public double YukPulu { get; set; }
        public double CixisMuv { get; set; }
        public double Mezuniyyet { get; set; }
        public bool FoodGiven { get; set; }
        public double Food { get; set; }
    }
}