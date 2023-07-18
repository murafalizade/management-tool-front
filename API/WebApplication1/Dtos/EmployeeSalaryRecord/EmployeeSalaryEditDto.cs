using System;

namespace WebApplication1.Dtos{
    public class  EmployeeSalaryEditDto
    {
        public int Id { get; set; }
        public double PTMoney { get; set; }
        public string AccountNumber { get; set; }
        
        public double Kibertehlukesizlik { get; set; }
        public double RankSalary { get; set; }
        public double PositionSalary { get; set; }
        public double Meharetlilik { get; set; }
        public double Temsilcilik { get; set; }
        public double Mexfilik { get; set; }
        public double Zererlilik { get; set; }
        public double XariciDil  { get; set; }
        public double Kesfiyyat { get; set; }
        public double ElmiDerece { get; set; }
        public double FexriAd { get; set; }
        public double ExtraMoney { get; set; }
        public double ExtraMoney2 { get; set; } 
        public string Comment { get; set; }
        public double TotalIncome { get; set; }
        public double Tax { get; set; }
        public double DSMF { get; set; }
        public double Kesirler { get; set; }
        public double Aliment { get; set; }
        public double HealthInsurance { get; set; }
        public double Extra211100 {get;set;}
    }
}