using System;

namespace WebApplication1.Models
{
    public class EmployeeSalaryRecord
    {
        public int Id { get; set; }
        private double rankSalary = 0;
        public double RankSalary
        {
            get
            {
                if (Employee != null && rankSalary == 0)
                {
                    // Set default value based on Employee's rank
                    rankSalary = Employee.Rank.Salary;
                }
                return rankSalary;
            }
            set { rankSalary = value; }
        }
        private double positionSalary = 0;
        public double PositionSalary
        {
            get
            {
                if (Employee != null && positionSalary == 0)
                {
                    positionSalary = Employee.Position.Salary;
                }
                return positionSalary;
            }
            set { positionSalary = value; }
        }
    //    public double positionSalary { get; set; } = 0;
        public double XIMoney { get; set; } = 0;
        private double pTMoney = 0;
        public double PTMoney
        {
            set
            {
                pTMoney = value;
            }
            get
            {
                if (Employee != null && pTMoney == 0)
                {
                    if (Employee.PTMoney == "5")
                    {
                        pTMoney = positionSalary * 5 / 100;
                    }
                    else if (Employee.PTMoney == "8")
                    {
                        pTMoney = positionSalary * 8 / 100;
                    }
                    else if (Employee.PTMoney == "11")
                    {
                        pTMoney = positionSalary * 11 / 100;
                    }
                    else if (Employee.PTMoney == "extra10")
                    {
                        pTMoney *= 0.1;
                    }
                }
                return pTMoney;
            }
        }
        public DateTime RecordDate { get; set; } = DateTime.Now;
        private double meharetlilik = 0;
        public double Meharetlilik
        {
            get
            {
                if (Employee != null && meharetlilik == 0)
                {
                    if (Employee.Position.Name == "zabit")
                    {
                        if (Employee.Meharetlilik == "2")
                        {
                            meharetlilik = positionSalary * 15 / 100;
                        }
                        else if (Employee.Meharetlilik == "1")
                        {
                            meharetlilik = positionSalary * 25 / 100;
                        }
                        else if (Employee.Meharetlilik == "usta")
                        {
                            meharetlilik = positionSalary * 35 / 100;
                        }
                    }
                    else if (Employee.Position.Name == "gizir")
                    {
                        if (Employee.Meharetlilik == "2")
                        {
                            meharetlilik = positionSalary * 10 / 100;
                        }
                        else if (Employee.Meharetlilik == "1")
                        {
                            meharetlilik = positionSalary * 15 / 100;
                        }
                        else if (Employee.Meharetlilik == "usta")
                        {
                            meharetlilik = positionSalary * 25 / 100;
                        }
                    }
                    else
                    {
                        if (Employee.Meharetlilik == "2")
                        {
                            meharetlilik = positionSalary * 5 / 100;
                        }
                        else if (Employee.Meharetlilik == "1")
                        {
                            meharetlilik = positionSalary * 10 / 100;
                        }
                        else if (Employee.Meharetlilik == "usta")
                        {
                            meharetlilik = positionSalary * 15 / 100;
                        }
                    }
                }
                return meharetlilik;
            }
            set
            {
                meharetlilik = value;
            }
        }
        public double Temsilcilik { get; set; } = 0;
        private double mexfilik = 0;
        public double Mexfilik
        {
            get
            {
                if (Employee != null && mexfilik == 0)
                {
                    if (Employee.Mexfilik == "10")
                    {
                        mexfilik = positionSalary * 10 / 100;
                    }
                    else if (Employee.Mexfilik == "15")
                    {
                        mexfilik = positionSalary * 15 / 100;
                    }
                    else if (Employee.Mexfilik == "20")
                    {
                        mexfilik = positionSalary * 20 / 100;
                    }
                }
                return mexfilik;
            }
            set
            {
                mexfilik = value;
            }
        }
        public double Zererlilik { get; set; } = 0;
        private double xariciDil = 0;
        public double XariciDil
        {
            get
            {
                if (Employee != null && xariciDil == 0)
                {
                    if (Employee.XariciDil == "15")
                    {
                        xariciDil = positionSalary * 15 / 100;
                    }
                    if (Employee.XariciDil == "10")
                    {
                        xariciDil = positionSalary * 10 / 100;
                    }
                }
                return xariciDil;
            }
            set
            {
                xariciDil = value;
            }
        }
        public double Kibertehlukesizlik { get; set; } = 0;
        public double Kesfiyyat { get; set; } = 0;
        private double elmiDerece { get; set; } = 0;
        public double ElmiDerece
        {
            get
            {
                if (Employee != null && elmiDerece == 0)
                {
                    int workExperience = DateTime.Now.Year - Employee.StartDate.Year;
                    switch (Employee.ElmiDerece)
                    {
                        case "dosent":
                            // if work experience is more than 5 years
                            if (workExperience >= 5 && workExperience <= 10)
                            {
                                elmiDerece = 25;
                            }
                            else if (workExperience > 10 && workExperience <= 15)
                            {
                                elmiDerece = 50;
                            }
                            else if (workExperience > 15 && workExperience <= 20)
                            {
                                elmiDerece = 75;
                            }
                            else if (workExperience > 20)
                            {
                                elmiDerece = 100;
                            }
                            else
                            {
                                elmiDerece = 0;
                            }
                            break;
                        case "professor":
                            if (workExperience >= 5 && workExperience <= 10)
                            {
                                elmiDerece = 30;
                            }
                            else if (workExperience > 10 && workExperience <= 15)
                            {
                                elmiDerece = 60;
                            }
                            else if (workExperience > 15 && workExperience <= 20)
                            {
                                elmiDerece = 90;
                            }
                            else if (workExperience > 20)
                            {
                                elmiDerece = 120;
                            }
                            else
                            {
                                elmiDerece = 0;
                            }
                            break;
                        case "elmlər doktoru":
                            elmiDerece = 100;
                            break;
                        case "fəlsəfə doktoru":
                            elmiDerece = 60;
                            break;
                        default:
                            elmiDerece = 0;
                            break;
                    }
                }
                return elmiDerece;
            }
            set
            {
                elmiDerece = value;
            }
        }
        private double fexriAd = 0;
        public double FexriAd
        {
            get
            {
                if (Employee != null && fexriAd == 0)
                {
                    if (Employee.XariciDil == "1")
                    {
                        fexriAd = 100;
                    }
                    if (Employee.XariciDil == "2")
                    {
                        fexriAd = 60;
                    }
                }
                return fexriAd;
            }
            set
            {
                fexriAd = value;
            }
        }
        public double ExtraMoney { get; set; } = 0;
        public double ExtraMoney2 { get; set; } = 0;
        public double Tax { get; set; } = 0;
        public double DSMF { get; set; }
        public double HealthInsurance { get; set; }
        public double Kesirler { get; set; }
        public double Aliment { get; set; }
        public double Extra211100 { get; set; }
        public double Discount { get; set; }
        public double ExtraGivenMoney { get; set; }
        public double Food { get; set; }
        public double Muavin { get; set; }
        public double Mezuniyyet { get; set; }
        public double KesfMezun { get; set; }
        public double KesfXeste { get; set; }
        public double Kiraye { get; set; }
        public double MaddiYardim { get; set; }
        public double Ezamiyyet { get; set; }
        public double Sehra { get; set; }
        public double YolXerci { get; set; }
        public double YukPulu { get; set; }
        public double CixisMuv { get; set; }
        public double BPM { get; set; }
        public double BPMPercentage { get; set; }
        public double TotalDSMF { get; set; }
        public string Comment { get; set; }
        public string AccountNumber { get; set; }
        public int? EmployeeId { get; set; }
        public virtual Employee Employee { get; set; }
    }
}