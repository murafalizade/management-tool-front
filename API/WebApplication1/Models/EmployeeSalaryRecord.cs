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
                if (Employee != null && value == 0)
                {
                    rankSalary = (double)Employee.Rank.Salary;
                }
                else
                {
                    rankSalary = value;
                }
            }
        }
        private double positionSalary = 0;
        public double PositionSalary
        {
            set
            {
                if (Employee != null && value == 0)
                {
                    positionSalary = (double)Employee.Position.Salary;
                }
                else
                {
                    positionSalary = value;
                }
            }
            get { return positionSalary; }
        }

        private int XIPercentage = 0;

        public int XIPercent
        {
            get
            {
                return XIPercentage;
            }
            set
            {
                if (Employee != null && value == 0)
                {
                    if (xIYears <= 2 && xIYears >= 1)
                    {
                        XIPercentage = 5;
                    }
                    else if (xIYears <= 5 && xIYears >= 3)
                    {
                        XIPercentage = 10;
                    }
                    else if (xIYears <= 10 && xIYears >= 6)
                    {
                        XIPercentage = 15;
                    }
                    else if (xIYears <= 15 && xIYears >= 11)
                    {
                        XIPercentage = 20;
                    }
                    else if (xIYears <= 20 && xIYears >= 16)
                    {
                        XIPercentage = 25;
                    }
                    else if (xIYears <= 25 && xIYears >= 21)
                    {
                        XIPercentage = 30;
                    }
                    else if (xIYears <= 30 && xIYears >= 26)
                    {
                        XIPercentage = 40;
                    }
                    else if (xIYears > 30)
                    {
                        XIPercentage = 50;
                    }
                }
                else
                {
                    XIPercentage = value;
                }
            }
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
                    xIMoney = positionSalary * XIPercentage / 100;
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
                else
                {
                    pTMoney = value;
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
                else
                {
                    meharetlilik = value;
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
        private double totalIncome { get; set; } = 0;
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

        // DISCOUNT

        public int DiscountId { get; set; }
        public Discount Discount { get; set; }

        public bool isMatry { get; set; } = true;
        public bool isChernobil { get; set; } = false;
        public bool isVeteran { get; set; } = true;
        public bool isDisabled { get; set; } = false;
        public bool isOwner { get; set; } = true;
        public bool isQachqin { get; set; } = false;

        private double tax = 0;
        public double Tax
        {
            get
            {
                return tax;
            }
            set
            {
                if (Discount != null)
                {
                    tax = TotalIncome * Discount.TaxPercentage / 100;
                }
                else
                {
                    tax = value;
                }
            }
        }


        private double totalDiscount { get; set; } = 0;

        public double TotalDiscount
        {
            get
            {
                return totalDiscount;
            }
            set
            {
                if (Discount != null)
                {
                    if (isMatry)
                    {
                        totalDiscount += Discount.Martyr;
                    }
                    if (isChernobil)
                    {
                        totalDiscount += Discount.Chernobil;
                    }
                    if (isVeteran)
                    {
                        totalDiscount += Discount.Veteran;
                        // tax = tax - Discount.VeteranTaxDiscount > 0 ? tax - Discount.VeteranTaxDiscount : 0;
                    }
                    if (isDisabled)
                    {
                        totalDiscount += Discount.Disability;
                    }
                    if (isOwner)
                    {
                        totalDiscount += Discount.Owner;
                    }
                    if (isQachqin)
                    {
                        totalDiscount += Discount.Qachqin;
                    }
                }
            }
        }

        private double dSMF = 0;
        public double DSMF
        {
            get
            {
                return dSMF;
            }
            set
            {
                if (Discount != null)
                {
                    dSMF = TotalIncome * Discount.Dsmf / 100;
                }
                else
                {
                    dSMF = value;
                }
            }
        }

        private double healthInsurance = 0;
        public double HealthInsurance
        {
            get
            {
                return healthInsurance;
            }
            set
            {
                if (Discount != null)
                {
                    healthInsurance = TotalIncome * Discount.HealthInjurance / 100;
                }
                else
                {
                    healthInsurance = value;
                }
            }
        }
        public double Kesirler { get; set; }
        public double Aliment { get; set; }
        public double Extra211100 { get; set; } = 0;
        public double ExtraGivenMoney { get; set; }

        private double food = 0;
        public double Food
        {
            get
            {
                return food;
            }
            set
            {
                if (Discount != null)
                {
                    food = Discount.Food;
                }
                else
                {
                    food = value;
                }
            }
        }
        private double muavin = 0;
        public double Muavin
        {
            set
            {
                if (Discount != null)
                {
                    muavin = Discount.Veteran;
                    // tax -= Discount.VeteranTaxDiscount;
                }
                else
                {
                    muavin = value;
                }
            }
            get
            {
                return muavin;
            }
        }
        public double Mezuniyyet { get; set; }
        public double KesfMezun { get; set; }
        public double KesfXeste { get; set; }
        public double Kiraye { get; set; }
        public double MaddiYardim { get; set; }
        public double Ezamiyyet { get; set; }
        private double sehra = 0;
        public double Sehra
        {
            set
            {
                if (Discount != null)
                {
                    sehra = Discount.Desert;
                }
                else
                {
                    sehra = value;
                }
            }
            get
            {
                return sehra;
            }
        }
        public double YolXerci { get; set; }
        public double YukPulu { get; set; }
        public double CixisMuv { get; set; }
        public double BPM { get; set; }
        public double BPMPercentage { get; set; }
        public double TotalDSMF { get; set; }
        public string Comment { get; set; }
        public string AccountNumber { get; set; }
        public bool isNotGiven { get; set; } = true;
    }
}