using System;

namespace WebApplication1.Dtos{
    public class  EmployeeSalaryResultDto
    {
        public int Id { get; set; }
        public string EmployeeFirstName { get; set; }
        public string EmployeeLastName { get; set; }
        public string EmployeeFatherName{ get; set; }
        public DateTime RecordDate { get; set; }
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
    }
}