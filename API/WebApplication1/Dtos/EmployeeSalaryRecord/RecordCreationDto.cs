using WebApplication1.Models;

namespace WebApplication1.Dtos
{
    public class RecordCreationDto
    {
        public Employee Employee { get; set; }
        public Discount Discount { get; set; }
        public int XIYears { get; set; } = 0;
        public int XIMonths { get; set; } = 0;
        public int XIDays { get; set; } = 0;
        public int XIPercentage { get; set; } = 0;
        public string FullName { get; set; } = "";
        public double RankSalary { get; set; } = 0;
        public double PositionSalary { get; set; } = 0;
        public double ExtraMoney { get; set; } = 0;
        public double ExtraMoney2 { get; set; } = 0;
        public double Temsilcilik { get; set; } = 0;
        public double Meharetlilik { get; set; } = 0;
        public double Mexfilik { get; set; } = 0;
        public double Zererlilik { get; set; } = 0;
        public double XariciDil { get; set; } = 0;
        public double Kesfiyyat { get; set; } = 0;
        public double ElmiDerece { get; set; } = 0;
        public double FexriAd { get; set; } = 0;
        public double PTMoney { get; set; } = 0;
        public double XIMoney { get; set; } = 0;
        public double TotalIncome { get; set; } = 0;
        public double Tax { get; set; } = 0;
        public double DSMF { get; set; } = 0;
        public double HealthInsurance { get; set; } = 0;
        public double TotalDiscount { get; set; } = 0;
        public double Food { get; set; } = 0;
        public double Muavin { get; set; } = 0;
        public double Sehra { get; set; } = 0;
    }
}