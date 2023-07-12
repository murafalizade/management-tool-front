using System;

namespace WebApplication1.Models
{
    public class EmployeeSalaryRecord
    {
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        public Employee Employee { get; set; }
        private string fullName = "";
        public string FullName
        {
            set
            {
                if (Employee != null)
                {
                    fullName = Employee.FirstName + " " + Employee.LastName + " " + Employee.FatherName;
                }
            }
            get
            {
                return fullName;
            }
        }
        private int xIDays = 0;
        public int XIDays
        {
            get
            {
                return xIDays;
            }
            set
            {
                // calculate remaining days from RecordDate only return remains days not year or monts
                xIDays = (int)(DateTime.Now - Employee.StartDate).TotalDays % 365 % 30;
            }
        }

        private int xIMonths = 0;
        public int XIMonths
        {
            get
            {
                return xIMonths;
            }
            set
            {
                // calculate remaining months from RecordDate only return remains months not year or days
                xIMonths = (int)(DateTime.Now - Employee.StartDate).TotalDays % 365 / 30;
            }
        }

        private int xIYears = 0;
        public int XIYears
        {
            get
            {
                return xIYears;
            }
            set
            {
                // calculate remaining years from RecordDate only return remains years not months or days
                xIYears = (int)(DateTime.Now - Employee.StartDate).TotalDays / 365;
            }
        }

        private double rankSalary = 0;
        public double RankSalary
        {
            get { return rankSalary; }

            set
            {
                if (Employee != null)
                {
                    Console.WriteLine("Employee is not null");
                    // Set default value based on Employee's rank
                    rankSalary = (double)Employee.Rank.Salary;
                }
                else
                {
                    Console.WriteLine("Employee is null");
                    rankSalary = value;
                }
            }
        }
        private double positionSalary = 0;
        public double PositionSalary
        {
            set
            {
                if (Employee != null)
                {
                    positionSalary = (double)Employee.Position.Salary;
                }
            }
            get { return positionSalary; }
        }
        private double xIMoney = 0;
        public double XIMoney
        {
            get
            {
                return xIMoney;
            }
            set
            {
                if (Employee != null && value == 0)
                {
                    if (xIYears <= 2 && xIYears >= 1)
                    {
                        xIMoney = positionSalary * 5 / 100;
                    }
                    else if (xIYears <= 5 && xIYears >= 3)
                    {
                        xIMoney = positionSalary * 10 / 100;
                    }
                    else if (xIYears <= 10 && xIYears >= 6)
                    {
                        xIMoney = positionSalary * 15 / 100;
                    }
                    else if (xIYears <= 15 && xIYears >= 11)
                    {
                        xIMoney = positionSalary * 20 / 100;
                    }
                    else if (xIYears <= 20 && xIYears >= 16)
                    {
                        xIMoney = positionSalary * 25 / 100;
                    }
                    else if (xIYears <= 25 && xIYears >= 21)
                    {
                        xIMoney = positionSalary * 30 / 100;
                    }
                    else if (xIYears <= 30 && xIYears >= 26)
                    {
                        xIMoney = positionSalary * 40 / 100;
                    }
                    else if (xIYears > 30)
                    {
                        xIMoney = positionSalary * 0.5;
                    }
                }
                else
                {
                    xIMoney = value;
                }
            }
        }
        private double pTMoney = 0;
        public double PTMoney
        {
            get
            {
                return pTMoney;
            }
            set
            {
                if (Employee != null && value == 0)
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
            }
        }
        public DateTime RecordDate { get; set; } = DateTime.Now;
        private double meharetlilik = 0;
        public double Meharetlilik
        {
            set
            {
                if (Employee != null && value == 0)
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
            }
            get
            {
                return meharetlilik;
            }
        }
        public double Temsilcilik { get; set; } = 0;
        private double mexfilik = 0;
        public double Mexfilik
        {
            set
            {
                if (Employee != null && value == 0)
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
                else
                {
                    mexfilik = value;
                }
            }
            get
            {
                return mexfilik;
            }
        }
        public double Zererlilik { get; set; } = 0;
        private double xariciDil = 0;
        public double XariciDil
        {
            set
            {
                if (Employee != null && value == 0)
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
                else
                {
                    xariciDil = value;
                }
            }
            get
            {
                return xariciDil;
            }
        }
        public double Kibertehlukesizlik { get; set; } = 0;
        public double Kesfiyyat { get; set; } = 0;
        private double elmiDerece { get; set; } = 0;
        public double ElmiDerece
        {
            set
            {
                if (Employee != null && value == 0)
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
                else
                {
                    elmiDerece = value;
                }
            }
            get
            {
                return elmiDerece;
            }
        }
        private double fexriAd = 0;
        public double FexriAd
        {
            set
            {
                if (Employee != null && value == 0)
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
                else
                {
                    fexriAd = value;
                }
            }
            get
            {
                return fexriAd;
            }
        }
        public double ExtraMoney { get; set; } = 0;
        public double ExtraMoney2 { get; set; } = 0;
        private double totalIncome { get; set; }
        public double TotalIncome
        {
            get
            {
                return totalIncome;
            }
            set
            {
                totalIncome = XIMoney + pTMoney + rankSalary + positionSalary + meharetlilik + Temsilcilik + Mexfilik + Zererlilik + XariciDil + Kibertehlukesizlik + Kesfiyyat + ElmiDerece + FexriAd + ExtraMoney + ExtraMoney2;
            }
        }
        public double Tax { get; set; } = 0;
        public double DSMF { get; set; }
        public double HealthInsurance { get; set; }
        public double Kesirler { get; set; }
        public double Aliment { get; set; }
        public double Extra211100 { get; set; } = 0;
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
    }
}