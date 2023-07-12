using WebApplication1.Models;

namespace WebApplication1.Dtos
{
    public class RecordCreationDto
    {
        public Employee Employee { get; set; }
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
        public double totalIncome { get; set; } = 0;

    }
}