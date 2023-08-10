using System;

namespace WebApplication1.Models
{
    public class EmployeeSalaryRecord
    {
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        public Employee Employee { get; set; }

        public string FullName
        {
            get
            {
                if(Employee != null)
                {
                    return Employee.LastName + " " + Employee.FirstName + " " + Employee.FatherName;
                }
                else
                {
                    return "Naməlum işçi";
                }
            }
            set
            {

            }
        }
        private double rankSalary = 0;
        public double RankSalary
        {
            get { return rankSalary; }

            set
            {
                if (Employee != null && Employee.Rank != null && value == 0)
                {
                    rankSalary = Employee.Rank.Salary;
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
                if (Employee != null && Employee.Position != null && value == 0)
                {
                    positionSalary = Employee.Position.Salary;
                }
                else
                {
                    positionSalary = value;
                }
            }
            get { return positionSalary; }
        }
        private int _xIPercent = 0;
        public int XIPercent
        {
            get
            {
                return _xIPercent;
            }
            set
            {
                if (Employee != null)
                {
                    int xIYears = DateTime.Now.Year - Employee.StartDate.Year;
                    Console.WriteLine("XI years: " + xIYears);
                    if (xIYears <= 2 && xIYears >= 1)
                    {
                        _xIPercent = 5;
                    }
                    else if (xIYears <= 5 && xIYears >= 3)
                    {
                        _xIPercent = 10;
                    }
                    else if (xIYears <= 10 && xIYears >= 6)
                    {
                        _xIPercent = 15;
                    }
                    else if (xIYears <= 15 && xIYears >= 11)
                    {
                        _xIPercent = 20;
                    }
                    else if (xIYears <= 20 && xIYears >= 16)
                    {
                        _xIPercent = 25;
                    }
                    else if (xIYears <= 25 && xIYears >= 21)
                    {
                        _xIPercent = 30;
                    }
                    else if (xIYears <= 30 && xIYears >= 26)
                    {
                        _xIPercent = 40;
                    }
                    else if (xIYears > 30)
                    {
                        _xIPercent = 50;
                    }
                }
                else
                {
                    _xIPercent = 0;
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
                if (Employee != null)
                {
                    xIMoney = positionSalary * XIPercent / 100;
                }
                else
                {
                    xIMoney = value;
                }
            }
        }
        private double pTMoney = 0;
        public int PTQat { get; set; } = 0;
        public bool IsEternalQat { get; set; } = false;
        public double PTMoney
        {
            get
            {
                return pTMoney;
            }
            set
            {
                if (value == 0)
                {
                    pTMoney = (XIMoney + RankSalary + PositionSalary) * PTQat;
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

                if (Employee != null && Employee.Meharet != null && value == 0)
                {
                    if (Employee.Position.Name == "zabit")
                    {
                        meharetlilik = positionSalary * Employee.Meharet.ForZabitPercentage / 100;
                    }
                    else if (Employee.Position.Name != "esger")
                    {
                        meharetlilik = positionSalary * Employee.Meharet.ForGizirPercentage / 100;
                    }
                    else
                    {
                        meharetlilik = positionSalary * Employee.Meharet.ForMuddetliPercentage / 100;
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
                if (Employee != null && Employee.XariciDil != null && value == 0)
                {
                    xariciDil = positionSalary * Employee.XariciDil.Percentage / 100;
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
                if (Employee != null && Employee.ElmiDerece != null && value == 0)
                {
                    int workExperience = DateTime.Now.Year - Employee.StartDate.Year;

                    if (workExperience >= 5 && workExperience <= 10)
                    {
                        elmiDerece = Employee.ElmiDerece.For5to10Salary;
                    }
                    else if (workExperience > 10 && workExperience <= 15)
                    {
                        elmiDerece = Employee.ElmiDerece.For10to15Salary;
                    }
                    else if (workExperience > 15 && workExperience <= 20)
                    {
                        elmiDerece = Employee.ElmiDerece.For15to20Salary;
                    }
                    else if (workExperience > 20)
                    {
                        elmiDerece = Employee.ElmiDerece.For20Salary;
                    }
                    else
                    {
                        elmiDerece = 0;
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
                if (Employee != null && Employee.FexriAd != null && value == 0)
                {
                    fexriAd = Employee.FexriAd.Salary;
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
        public double TotalIncome
        {
            get
            {
                return XIMoney + pTMoney + rankSalary + positionSalary + meharetlilik + Temsilcilik + Mexfilik + Zererlilik + XariciDil + Kibertehlukesizlik + Kesfiyyat + ElmiDerece + FexriAd + ExtraMoney + ExtraMoney2;
            }
        }
        public int DiscountId { get; set; }
        public Discount Discount { get; set; }

        public bool isMatry { get; set; }
        public bool isChernobil { get; set; }
        public bool isVeteran { get; set; }
        public bool isDisabled { get; set; }
        public bool isOwner { get; set; }
        public bool isQachqin { get; set; }

        private double tax = 0;
        public int VeteranQat { get; set; } = 1;
        public double Tax
        {
            get
            {
                return tax;
            }
            set
            {
                if (Discount != null && value == 0)
                {
                    tax = TotalIncome * Discount.TaxPercentage / 100;
                }
                else
                {
                    tax = value;
                }
            }
        }

        public double TotalDiscount
        {
            get
            {
                double totalDiscount = 0;

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
                    totalDiscount += Discount.Veteran * VeteranQat;
                    tax = tax - Discount.VeteranTaxDiscount > 0 ? tax - Discount.VeteranTaxDiscount : 0;
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
                return totalDiscount;
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
                if (Discount != null && value == 0)
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
        public double AlimentPercentage { get; set; }
        private double aliment = 0;
        public double Aliment
        {
            get
            {
                return aliment;
            }
            set
            {
                if (value == 0)
                {
                    aliment = (TotalIncome - Tax) * AlimentPercentage / 100;
                }
                else
                {
                    aliment = value;
                }
            }
        }
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
                if (Discount != null && value == 0 && FoodGiven == true)
                {
                    food = Discount.Food;
                }
                else if (FoodGiven == false)
                {
                    food = 0;
                }
                else
                {
                    food = value;
                }
            }
        }
        public bool FoodGiven { get; set; } = false;
        private double muavin = 0;
        public double Muavin
        {
            set
            {
                if (Discount != null)
                {
                    muavin = Discount.Veteran;
                    tax = tax - Discount.VeteranTaxDiscount > 0 ? tax - Discount.VeteranTaxDiscount : 0;
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
        public Kiraye Kiraye { get; set; }
        public int KirayeId { get; set; }
        public int FamilyCount { get; set; } = 0;
        public int KirayeQat { get; set; } = 0;
        private double kirayePrice = 0;
        public double KirayePrice
        {
            get
            {
                return kirayePrice;
            }
            set
            {
                if (Kiraye != null && value == 0)
                {
                    kirayePrice = (KirayeQat + 1) * (Kiraye.Price + FamilyCount * 0.5 * Kiraye.Price);
                }
                else
                {
                    kirayePrice = value;
                }
            }
        }
        public double MaddiYardim { get; set; }
        public double Ezamiyyet { get; set; }
        private double sehra = 0;
        public double Sehra
        {
            set
            {
                if (Discount != null && value == 0)
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
        public double TotalTaken
        {
            get
            {
                return Tax + DSMF + HealthInsurance + Kesirler + Aliment + Extra211100 + ExtraGivenMoney;
            }
        }
        public double TotalGiven
        {
            get
            {
                return TotalIncome + TotalDiscount - TotalTaken;
            }
        }
        public double TotalSalary
        {
            get
            {
                return TotalGiven - TotalDSMF + KirayePrice + Food;
            }
        }

        public string Comment { get; set; }
        public string AccountNumber { get; set; }
        public bool isNotGiven { get; set; } = true;
    }
}