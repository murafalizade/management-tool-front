using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Models;
using WebApplication1.Repositories;

namespace WebApplication1.Repositories
{
    class EmployeeSalaryRecordRepository : IEmployeeSalaryRecordRepository
    {
        private readonly ApplicationDbContext _context;
        public EmployeeSalaryRecordRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task AddBPMQat(int bpmQat)
        {
            var recordsToUpdate = await _context.EmployeeSalaryRecords
           .Where(x => x.RecordDate.Month == DateTime.Now.Month && x.RecordDate.Year == DateTime.Now.Year && x.IsBPMGiven == true)
           .ToListAsync();

            if (bpmQat == 0)
            {
                recordsToUpdate.ForEach(record => { record.IsBPMGiven = false; });
                await _context.SaveChangesAsync();
                return;
            }

            recordsToUpdate.ForEach(record => { record.BPMQat = bpmQat; record.BPM = bpmQat * (record.PositionSalary + record.RankSalary); });
            await _context.SaveChangesAsync();
        }
        public async Task AddEmployee(EmployeeSalaryRecord employee)
        {
            await _context.EmployeeSalaryRecords.AddAsync(employee);
            await _context.SaveChangesAsync();
        }

        public async Task AddFoodQat(int foodQat)
        {
            // update Food qat for this month
            var recordsToUpdate = await _context.EmployeeSalaryRecords
            .Where(x => x.RecordDate.Month == DateTime.Now.Month && x.RecordDate.Year == DateTime.Now.Year && x.FoodGiven == true)
            .Include(x => x.Discount)
            .ToListAsync();

            if (foodQat == 0)
            {
                recordsToUpdate.ForEach(record => { record.FoodGiven = false; record.Food = 0; });
                await _context.SaveChangesAsync();
                return;
            }

            recordsToUpdate.ForEach(record => { record.Food = foodQat * record.Discount.Food; });
            await _context.SaveChangesAsync();
        }

        public async Task AddKirayeQat(int kirayeQat)
        {
            // update kiraye qat for this month
            var recordsToUpdate = await _context.EmployeeSalaryRecords
            .Where(x => x.RecordDate.Month == DateTime.Now.Month && x.RecordDate.Year == DateTime.Now.Year && x.RentId != 1)
            .ToListAsync();

            if (kirayeQat == 0)
            {
                recordsToUpdate.ForEach(record => { record.RentQat = 0; record.RentPrice = 0; record.RentId = 1; });
                await _context.SaveChangesAsync();
                return;
            }

            recordsToUpdate.ForEach(record => { record.RentPrice = kirayeQat * record.RentQat / record.RentPrice; record.RentQat = kirayeQat; });
            await _context.SaveChangesAsync();
        }

        public Task<List<EmployeeSalaryRecord>> GetEmployeeById(int employeeId, int year)
        {
            return _context.EmployeeSalaryRecords
           .Include(x => x.Employee)
                .Include(x => x.Ability)
                .Include(x => x.ScientificDegree)
                .Include(x => x.HonorTitle)
                .Include(x => x.Discount)
                .Include(x => x.Rent)
                .Include(x => x.Position)
                    .ThenInclude(x => x.Department)
                        .ThenInclude(x => x.Adminstration).
            Where(x => x.EmployeeId == employeeId && x.RecordDate.Year == year).ToListAsync();
        }

        public async Task<EmployeeSalaryRecord> GetEmployeeById(int id)
        {
            return await _context.EmployeeSalaryRecords
                .Include(x => x.Employee)
                .Include(x => x.Ability)
                .Include(x => x.ScientificDegree)
                .Include(x => x.HonorTitle)
                .Include(x => x.ForeignLanguage)
                .Include(x => x.Rank)
                .Include(x => x.Discount)
                .Include(x => x.Rent)
                .Include(x => x.Position)
                    .ThenInclude(x => x.Department)
                        .ThenInclude(x => x.Adminstration).
            FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<EmployeeSalaryRecord>> GetEmployees(string search, int month, int year)
        {
            var query = _context.EmployeeSalaryRecords
                .Include(x => x.Employee)
                .Include(x => x.Ability)
                .Include(x => x.ScientificDegree)
                .Include(x => x.HonorTitle)
                .Include(x => x.Discount)
                .Include(x => x.Rent)
                .Include(x => x.Rank)
                .Include(x => x.Position)
                    .ThenInclude(x => x.Department)
                        .ThenInclude(x => x.Adminstration)
                .Where(x => x.RecordDate.Year == year && x.RecordDate.Month == month);

            var searchOptions = new Dictionary<string, Expression<Func<EmployeeSalaryRecord, bool>>>
                {
                    { "aliment", x => x.Alimony > 0 },
                    { "extra211100", x => x.Extra211100 > 0 },
                    { "fexri", x => x.HonorTitlePrice > 0 },
                    { "kesfiyyat", x => x.ExploretionPrice > 0 },
                    { "kesfMezun", x => x.KesfMezun > 0 },
                    { "kesfXeste", x => x.KesfXeste > 0 },
                    { "food", x => x.Food > 0 },
                    { "yukPulu", x => x.YukPulu > 0 },
                    { "cixisMuv", x => x.ExitAid > 0 },
                    { "bpm", x => x.BPM > 0 },
                    {"erzaq", x=> x.FoodGiven==true},
                    {"texris", x=> x.ExitAid >0},
                    { "mezuniyyet", x => x.Vacation > 0 },
                    {"ezamiyyet", x=>x.BusinessTrip > 0},
                    { "kesir", x => x.Fails > 0 },
                    { "zererli", x => x.Harmfulness > 0 },
                    { "meharetlilik", x => x.AbilityPrice > 0 },
                    { "temsilcilik", x => x.Representing > 0 },
                    { "yol", x => x.TripExpense > 0 },
                    {  "yuk", x=> x.YukPulu >0},
                    { "kiraye", x => x.RentPrice > 0 },
                    { "maddi", x => x.FinancialAid > 0 },
                    {"daimi", x => x.IsEternalQat == true},
                    {"2qat", x=> x.PTQat != 0},
                    {"maddiyardimalmayanlar", x=> x.FinancialAid == 0},
                    {"mezuniyyetalmayanlar", x => x.Vacation == 0},
                    {"muharibe", x=> x.IsVeteran==true},
                    {"elil",x=>x.IsDisabled == true},
                    {"qachqin",x=>x.IsRefugee == true},
                    {"sehid",x=>x.IsMatry == true},
                    {"himayeder",x=> x.IsOwner == true},
                    {"cernobil",x=>x.IsChernobyl == true},
                    { "sahra", x => x.DesertPrice > 0 },
                    { "elmi", x => x.ScientificDegreePrice > 0 },
                    { "cixis", x => x.ForeignLanguagePrice > 0 },
                    { "elave", x => x.ExtraGivenMoney > 0 },
                    { "elaveGvti", x => x.ExtraMoney2 > 0 }
                };

            if (!string.IsNullOrEmpty(search) && searchOptions.ContainsKey(search))
            {
                query = query.Where(searchOptions[search]);
            }

            return await query.ToListAsync();
        }

        public async Task<EmployeeSalaryRecord> GetLastEmployeeRecord()
        {
            return await _context.EmployeeSalaryRecords.OrderByDescending(e => e.Id).FirstAsync();
        }

        private async Task ChangeRelations(int employeeId, int? positionId, int? abilityId, int? scientificDegreeId, int? honorTitleId, int? rentId, int? rankId, int? foreginLanguageId)
        {
            // conditions

            var employee = await _context.EmployeeSalaryRecords.FirstOrDefaultAsync(x => x.Id == employeeId);
            var position = await _context.Positions.FirstOrDefaultAsync(x => x.Id == positionId);
            var rank = await _context.Ranks.FirstOrDefaultAsync(x => x.Id == rankId);
            var ability = await _context.Abilities.FirstOrDefaultAsync(x => x.Id == abilityId);
            var scientificDegree = await _context.ScientificDegrees.FirstOrDefaultAsync(x => x.Id == scientificDegreeId);
            var honorTitle = await _context.HonorTitles.FirstOrDefaultAsync(x => x.Id == honorTitleId);
            var rent = await _context.Rents.FirstOrDefaultAsync(x => x.Id == rentId);
            var foreginLanguage = await _context.ForeignLanguages.FirstOrDefaultAsync(x => x.Id == foreginLanguageId);

            employee.Position = position;
            employee.Ability = ability;
            employee.ScientificDegree = scientificDegree;
            employee.HonorTitle = honorTitle;
            employee.Rent = rent;
            employee.Rank = rank;
            employee.ForeignLanguage = foreginLanguage;

            await _context.SaveChangesAsync();
        }

        public async Task<EmployeeSalaryRecord> UpdateEmployee(EmployeeSalaryRecord employee)
        {
            await ChangeRelations(employee.Id, employee.PositionId, employee.AbilityId, employee.ScientificDegreeId, employee.HonorTitleId, employee.RentId, employee.RankId, employee.ForeignLanguageId);

            var existingEmployee = await _context.EmployeeSalaryRecords
          .Include(x => x.Employee)
                .Include(x => x.Ability)
                .Include(x => x.ScientificDegree)
                .Include(x => x.HonorTitle)
                .Include(x => x.ForeignLanguage)
                .Include(x => x.Discount)
                .Include(x => x.Rent)
                .Include(x => x.Position)
                    .ThenInclude(x => x.Department)
                        .ThenInclude(x => x.Adminstration).
            FirstOrDefaultAsync(x => x.Id == employee.Id);

            Console.WriteLine(employee.Food);

            // Update the properties of the existingEmployee object with the values from the employee parameter.
            // existingEmployee.EmployeeId = employee.EmployeeId;
            // existingEmployee.PositionId = employee.PositionId;
            // existingEmployee.AbilityId = employee.AbilityId;
            // existingEmployee.ForeignLanguageId = employee.ForeignLanguageId;
            // existingEmployee.ScientificDegreeId = employee.ScientificDegreeId;
            // existingEmployee.HonorTitleId = employee.HonorTitleId;
            // existingEmployee.RentId = employee.RentId;
            existingEmployee.IsBPMGiven = employee.IsBPMGiven;
            existingEmployee.IsVacationGiven = employee.IsVacationGiven;
            existingEmployee.IsExitAidGiven = employee.IsExitAidGiven;
            existingEmployee.IsFinancialAidGiven = employee.IsFinancialAidGiven;

            existingEmployee.VacationDSMF = employee.VacationDSMF;
            existingEmployee.ExitAidDSMF = employee.ExitAidDSMF;
            existingEmployee.BPMDSMF = employee.BPMDSMF;

            existingEmployee.ForeignLanguagePrice = employee.ForeignLanguagePrice;
            existingEmployee.ScientificDegreePrice = employee.ScientificDegreePrice;
            existingEmployee.AlimonyPercentage = employee.AlimonyPercentage;
            existingEmployee.Alimony = employee.Alimony;
            existingEmployee.FamilyCount = employee.FamilyCount;
            existingEmployee.RentQat = employee.RentQat;
            existingEmployee.RentPrice = employee.RentPrice;
            existingEmployee.BPM = employee.BPM;
            existingEmployee.DSMF = employee.DSMF;
            existingEmployee.Comment = employee.Comment;
            existingEmployee.RankSalary = employee.RankSalary;
            existingEmployee.PositionSalary = employee.PositionSalary;
            existingEmployee.CyberSecurityPrice = employee.CyberSecurityPrice;
            existingEmployee.HonorTitlePrice = employee.HonorTitlePrice;
            existingEmployee.BusinessTrip = employee.BusinessTrip;
            existingEmployee.TripExpense = employee.TripExpense;
            existingEmployee.KesfXeste = employee.KesfXeste;
            existingEmployee.FinancialAid = employee.FinancialAid;
            existingEmployee.DesertPrice = employee.DesertPrice;
            existingEmployee.RentPrice = employee.RentPrice;
            existingEmployee.ExtraGivenMoney = employee.ExtraGivenMoney;
            existingEmployee.ExtraMoney = employee.ExtraMoney;
            existingEmployee.ExtraMoney2 = employee.ExtraMoney2;
            existingEmployee.AbilityPrice = employee.AbilityPrice;
            existingEmployee.YukPulu = employee.YukPulu;
            existingEmployee.ExploretionPrice = employee.ExploretionPrice;
            existingEmployee.RepresentingPercentage = employee.RepresentingPercentage;
            existingEmployee.HarmfulnessPercentage = employee.HarmfulnessPercentage;
            existingEmployee.ConfidentialityPercentage = employee.ConfidentialityPercentage;

            existingEmployee.PTQat = employee.PTQat;
            existingEmployee.PTMoney = employee.PTMoney;
            existingEmployee.IsEternalQat = employee.IsEternalQat;


            existingEmployee.Tax = employee.Tax;
            existingEmployee.Fails = employee.Fails;
            existingEmployee.Extra211100 = employee.Extra211100;
            existingEmployee.HealthInsurance = employee.HealthInsurance;
            existingEmployee.AccountNumber = employee.AccountNumber;

            existingEmployee.IsChernobyl = employee.IsChernobyl;
            existingEmployee.IsDisabled = employee.IsDisabled;
            existingEmployee.IsOwner = employee.IsOwner;
            existingEmployee.IsVeteran = employee.IsVeteran;
            existingEmployee.IsMatry = employee.IsMatry;
            existingEmployee.Muavin = employee.Muavin;
            existingEmployee.IsGiven = employee.IsGiven;
            existingEmployee.Vacation = employee.Vacation;
            existingEmployee.FoodGiven = employee.FoodGiven;
            existingEmployee.Food = employee.Food;
            existingEmployee.KesfMezun = employee.KesfMezun;
            existingEmployee.ExitAid = employee.ExitAid;

            await _context.SaveChangesAsync();
            return existingEmployee;
        }

        public async Task AddVeteranQat(int veteranQat)
        {
            // update kiraye qat for this month
            var recordsToUpdate = await _context.EmployeeSalaryRecords
            .Where(x => x.RecordDate.Month == DateTime.Now.Month && x.RecordDate.Year == DateTime.Now.Year && x.IsVeteran == true)
            .ToListAsync();

            if (veteranQat == 0)
            {
                recordsToUpdate.ForEach(record => { record.IsVeteran = false; });
                await _context.SaveChangesAsync();
                return;
            }

            recordsToUpdate.ForEach(record => { record.VeteranQat = veteranQat; });
            await _context.SaveChangesAsync();
        }
    }
}