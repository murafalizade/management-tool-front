using System;

namespace WebApplication1.Models
{
    public class EmployeeSalaryRecord : BaseEntity
    {
        // Relations
        public Rent Rent { get; set; }
        public int EmployeeId { get; set; }
        public int? ForeignLanguageId { get; set; }
        public int? HonorTitleId { get; set; }
        public int? AbilityId { get; set; }
        public int? PositionId { get; set; }
        public int? ScientificDegreeId { get; set; }
        public int? RentId { get; set; }
        public int DiscountId { get; set; }
        public Employee Employee { get; set; }
        public Position Position { get; set; }
        public Discount Discount { get; set; }
        public int? RankId { get; set; }
        public Rank Rank { get; set; }
        public ForeignLanguage ForeignLanguage { get; set; }
        public HonorTitle HonorTitle { get; set; }
        public Ability Ability { get; set; }
        public ScientificDegree ScientificDegree { get; set; }

        public string FullName
        {
            get
            {
                if (Employee != null)
                {
                    return Employee.LastName + " " + Employee.FirstName + " " + Employee.FatherName;
                }
                else
                {
                    return "Adsız hərbi qulluqçu";
                }
            }
        }
        private decimal _rankSalary = 0;
        public decimal RankSalary
        {
            get => _rankSalary;

            set
            {
                if (value == 0 && Rank != null)
                {
                    _rankSalary = 100;
                }
                else
                {
                    _rankSalary = value;
                }
            }
        }
        private decimal _positionSalary = 0;
        public decimal PositionSalary
        {
            set
            {
                if (value == 0 && Position != null)
                {
                    _positionSalary = Position.Salary;
                }
                else
                {
                    _positionSalary = value;
                }
            }
            get => _positionSalary;
        }
        private int _workExperience = 0;
        public int WorkExperience
        {
            get => _workExperience;
            set
            {
                if (Employee != null)
                {
                    _workExperience = DateTime.Now.Year - Employee.StartDate.Year;
                }
                else
                {
                    _workExperience = value;
                }
            }
        }
        private int _xIPercent = 0;
        public int XIPercent
        {
            get => _xIPercent;
            set
            {
                int xIYears = _workExperience;
                if (xIYears is <= 2 and >= 1)
                {
                    _xIPercent = 5;
                }
                else if (xIYears is <= 5 and >= 3)
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
        }
        private decimal _xIMoney = 0;
        public decimal XIMoney
        {
            get => _xIMoney;
            
            set
            {
                if (Position != null)
                {
                    _xIMoney = _positionSalary * XIPercent / 100;
                }
                else
                {
                    _xIMoney = value;
                }
            }
        }
        private decimal pTMoney = 0;
        public int PTQat { get; set; } = 0;
        public bool IsEternalQat { get; set; } = false;
        public decimal PTMoney
        {
            get => pTMoney;
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

        private decimal _abilityPrice = 0;
        public decimal AbilityPrice
        {
            set
            {

                if (Ability != null && Position != null)
                {
                    if (Rank.Name == "zabit")
                    {
                        _abilityPrice = _positionSalary * Ability.ForZabitPercentage / 100;
                    }
                    else if (Position.Name == "gizir")
                    {
                        _abilityPrice = _positionSalary * Ability.ForGizirPercentage / 100;
                    }
                    else
                    {
                        _abilityPrice = _positionSalary * Ability.ForMuddetliPercentage / 100;
                    }
                }
                else if (Ability != null && Position == null)
                {
                    _abilityPrice = _positionSalary * Ability.ForMuddetliPercentage / 100;
                }
                else
                {
                    _abilityPrice = value;
                }
            }
            get
            {
                return _abilityPrice;
            }
        }
        public int RepresentingPercentage { get; set; } = 0;
        public decimal Representing
        {
            get
            {
                return _positionSalary * RepresentingPercentage / 100; ;
            }
        }
        public int ConfidentialityPercentage { get; set; } = 0;
        public decimal Confidentiality
        {
            get
            {
                return _positionSalary * ConfidentialityPercentage / 100;
            }
        }
        public int HarmfulnessPercentage { get; set; } = 0;
        public decimal Harmfulness
        {
            get
            {
                return _positionSalary * HarmfulnessPercentage / 100;
            }
        }
        private decimal _foreignLanguagePrice = 0;
        public decimal ForeignLanguagePrice
        {
            set
            {
                if (value == 0 & ForeignLanguage != null)
                {
                    _foreignLanguagePrice = _positionSalary * ForeignLanguage.Percentage / 100;
                }
                else
                {
                    _foreignLanguagePrice = value;
                }
            }
            get
            {
                return _foreignLanguagePrice;
            }
        }
        public int CyberSecurityPercentage { get; set; } = 0;
        public decimal CyberSecurity
        {
            get
            {
                return _positionSalary * CyberSecurityPercentage / 100;
            }
        }
        public decimal ExploretionPrice { get; set; } = 0;
        private decimal _scientificDegreePrice = 0;
        public decimal ScientificDegreePrice
        {
            set
            {
                if (ScientificDegree != null)
                {
                    int workExperience = DateTime.Now.Year - Employee.StartDate.Year;

                    if (workExperience >= 5 && workExperience <= 10)
                    {
                        _scientificDegreePrice = ScientificDegree.For5to10Salary;
                    }
                    else if (workExperience > 10 && workExperience <= 15)
                    {
                        _scientificDegreePrice = ScientificDegree.For10to15Salary;
                    }
                    else if (workExperience > 15 && workExperience <= 20)
                    {
                        _scientificDegreePrice = ScientificDegree.For15to20Salary;
                    }
                    else if (workExperience > 20)
                    {
                        _scientificDegreePrice = ScientificDegree.For20Salary;
                    }
                    else
                    {
                        _scientificDegreePrice = ScientificDegree.ForEveryoneSalary;
                    }
                }
                else
                {
                    _scientificDegreePrice = value;
                }
            }
            get
            {
                return _scientificDegreePrice;
            }
        }
        private decimal _honorTitlePrice = 0;
        public decimal HonorTitlePrice
        {
            set
            {
                if (HonorTitle != null)
                {
                    _honorTitlePrice = HonorTitle.Salary;
                }
                else
                {
                    _honorTitlePrice = value;
                }
            }
            get
            {
                return _honorTitlePrice;
            }
        }
        public decimal ExtraMoney { get; set; } = 0;
        public decimal ExtraMoney2 { get; set; } = 0;
        public bool IsMatry { get; set; } = false;
        public bool IsChernobyl { get; set; } = false;
        public bool IsVeteran { get; set; } = false;
        public bool IsDisabled { get; set; } = false;
        public bool IsOwner { get; set; } = false;
        public bool IsRefugee { get; set; } = false;

        private decimal _tax = 0;
        public int VeteranQat { get; set; } = 1;
        public decimal TotalIncome =>
            XIMoney + pTMoney + _rankSalary + _positionSalary + _abilityPrice + Representing + Confidentiality + Harmfulness +
            _foreignLanguagePrice + CyberSecurity + ExploretionPrice + _scientificDegreePrice + _honorTitlePrice + ExtraMoney +
            ExtraMoney2;

        public decimal Tax
        {
            get => _tax;
            set
            {
                if (value == 0 && Discount != null)
                {
                    decimal amount = _rankSalary + _positionSalary - Discount.MinWage > 0 ? _rankSalary + _positionSalary - Discount.MinWage : 0;
                    _tax = amount * Discount.TaxPercentage / 100;
                    if (IsVeteran)
                    {
                        _tax = _tax - Discount.VeteranTaxDiscount > 0 ? _tax - Discount.VeteranTaxDiscount : 0;
                    }
                }
                else
                {
                    _tax = value;
                }
            }
        }
        private decimal _dSMF = 0;
        public decimal DSMF
        {
            get
            {
                return _dSMF;
            }
            set
            {
                if (value == 0 && Discount != null)
                {
                    _dSMF = (_rankSalary + _positionSalary) * Discount.Dsmf / 100;
                }
                else
                {
                    _dSMF = value;
                }
            }
        }

        private decimal _healthInsurance = 0;
        public decimal HealthInsurance
        {
            get
            {
                return _healthInsurance;
            }
            set
            {
                if (Discount != null && value == 0)
                {
                    _healthInsurance = (_rankSalary + _positionSalary) * Discount.HealthInjurance / 100;
                }
                else
                {
                    _healthInsurance = value;
                }
            }
        }
        public decimal Fails { get; set; }
        public decimal AlimonyPercentage { get; set; }
        private decimal _alimony = 0;
        public decimal Alimony
        {
            get
            {
                return _alimony;
            }
            set
            {
                if (value == 0)
                {
                    _alimony = (_rankSalary + _positionSalary - _tax) * AlimonyPercentage / 100;
                }
                else
                {
                    _alimony = value;
                }
            }
        }
        public decimal Extra211100 { get; set; } = 0;
        public decimal ExtraGivenMoney { get; set; }
        public bool FoodGiven { get; set; } = false;
        private decimal food = 0;
        public decimal Food
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
        private decimal muavin = 0;
        public decimal Muavin
        {
            set
            {
                // if (Discount != null && IsVeteran)
                // {
                //     // muavin = Discount.Veteran;
                //      _tax = _tax - Discount.VeteranTaxDiscount > 0 ? _tax - Discount.VeteranTaxDiscount : 0;
                // }
                // else
                // /{
                muavin = value;
                // }/
            }
            get
            {
                return muavin;
            }
        }
        public bool IsVacationGiven { get; set; } = false;
        decimal _vacation = 0;
        public decimal Vacation
        {
            get
            {
                return _vacation;
            }
            set
            {
                if (value == 0 && IsVacationGiven == true)
                {
                    _vacation = 2 * _positionSalary;
                }
                else if (IsVacationGiven == false)
                {
                    _vacation = 0;
                }
                else
                {
                    _vacation = value;
                }
            }
        }
        decimal _vacationDSMF = 0;
        public decimal VacationDSMF
        {
            get
            {
                return _vacationDSMF;
            }
            set
            {
                if (value == 0 && Discount != null)
                {
                    _vacationDSMF = _vacation * Discount.Dsmf / 100;
                }
                else
                {
                    _vacationDSMF = value;
                }
            }
        }
        public decimal KesfMezun { get; set; }
        public decimal KesfXeste { get; set; }
        public decimal FamilyCount { get; set; } = 0;
        public decimal RentQat { get; set; } = 1;
        private decimal _rentPrice = 0;
        public decimal RentPrice
        {
            get
            {
                return _rentPrice;
            }
            set
            {
                if (value == 0 && Rent != null)
                {
                    _rentPrice = Rent.Price * RentQat * (1 + (FamilyCount * 0.5m));
                }
                else
                {
                    _rentPrice = value;
                }
            }
        }
        public bool IsFinancialAidGiven { get; set; } = false;
        decimal _financialAid = 0;
        public decimal FinancialAid
        {
            get
            {
                return _financialAid;
            }
            set
            {
                if (IsFinancialAidGiven == false)
                {
                    _financialAid = 0;
                }
                else if (value == 0 && IsFinancialAidGiven == true)
                {
                    _financialAid = _rankSalary + _positionSalary;
                }
                else
                {
                    _financialAid = value;
                }
            }
        }
        decimal _financialAidDSMF = 0;
        public decimal FinancialAidDSMF
        {
            get
            {
                return _financialAidDSMF;
            }
            set
            {
                if (value == 0 && Discount != null && IsFinancialAidGiven)
                {
                    _financialAidDSMF = _financialAid * Discount.Dsmf / 100;
                }
                else if (IsFinancialAidGiven == false)
                {
                    _financialAidDSMF = 0;
                }
                else
                {
                    _financialAidDSMF = value;
                }
            }
        }

        public decimal BusinessTrip { get; set; }
        private decimal _desertPrice = 0;
        public decimal DesertPrice
        {
            set
            {
                if (value == 0 && Discount != null)
                {
                    _desertPrice = Discount.Desert;
                }
                else
                {
                    _desertPrice = value;
                }
            }
            get
            {
                return _desertPrice;
            }
        }
        public decimal TripExpense { get; set; }
        public decimal YukPulu { get; set; }
        public bool IsExitAidGiven { get; set; } = false;
        decimal _exitAid = 0;
        public decimal ExitAid
        {
            get
            {
                return _exitAid;
            }
            set
            {
                if (IsExitAidGiven == false)
                {
                    _exitAid = 0;
                }
                else if (value == 0 && IsExitAidGiven == true)
                {
                    _exitAid = _rankSalary + _positionSalary;
                }
                else
                {
                    _exitAid = value;
                }
            }
        }
        decimal _exitAidDSMF = 0;
        public decimal ExitAidDSMF
        {
            get
            {
                return _exitAidDSMF;
            }
            set
            {
                if (value == 0 && Discount != null)
                {
                    _exitAidDSMF = _exitAid * Discount.Dsmf / 100;
                }

                else if (IsExitAidGiven == false)
                {
                    _exitAidDSMF = 0;
                }

                else
                {
                    _exitAidDSMF = value;
                }
            }
        }
        public int BPMQat { get; set; } = 1;
        decimal _bPM = 0;
        public bool IsBPMGiven { get; set; } = false;
        public decimal BPM
        {
            get
            {
                return _bPM;
            }
            set
            {
                if (IsBPMGiven == true)
                {
                    _bPM = BPMQat * (_rankSalary + _positionSalary);
                }
                else
                {
                    _bPM = 0;
                }
            }
        }
        decimal _bPMDSMF = 0;
        public decimal BPMDSMF
        {
            get
            {
                return _bPMDSMF;
            }
            set
            {
                if (Discount != null)
                {
                    _bPMDSMF = _bPM * Discount.Dsmf / 100;
                }
                else
                {
                    _bPMDSMF = value;
                }
            }
        }
        // Totals
        public decimal TotalDiscount
        {
            get
            {
                decimal totalDiscount = 0;

                if (IsMatry)
                {
                    totalDiscount += Discount.Martyr;
                }
                if (IsChernobyl)
                {
                    totalDiscount += Discount.Chernobyl;
                }
                if (IsVeteran)
                {
                    totalDiscount += Discount.Veteran * VeteranQat;
                    _tax = _tax - Discount.VeteranTaxDiscount > 0 ? _tax - Discount.VeteranTaxDiscount : 0;
                }
                if (IsDisabled)
                {
                    totalDiscount += Discount.Disability;
                }
                if (IsOwner)
                {
                    totalDiscount += Discount.Owner;
                }
                if (IsRefugee)
                {
                    totalDiscount += Discount.Refugee;
                }
                return totalDiscount;
            }
        }
        public decimal TotalDSMF
        {
            get
            {
                return VacationDSMF + FinancialAidDSMF + BPMDSMF + ExitAidDSMF;
            }
        }
        public decimal TotalTaken
        {
            get
            {
                return _tax + DSMF + HealthInsurance + Fails + Alimony + Extra211100 + ExtraGivenMoney;
            }
        }
        public decimal TotalGiven
        {
            get
            {
                return TotalIncome + TotalDiscount - TotalTaken;
            }
        }
        public decimal TotalSalary
        {
            get
            {
                return TotalGiven - TotalDSMF + RentPrice + Food + BPM + Vacation + DesertPrice +
                 TripExpense + YukPulu + ExitAid;
            }
        }
        public string Comment { get; set; }
        public string AccountNumber { get; set; }
        public bool IsGiven { get; set; } = true;

    }
}