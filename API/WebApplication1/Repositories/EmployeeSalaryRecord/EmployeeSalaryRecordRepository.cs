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

        private async Task ChangeKiraye(int kirayeId, int employeeId)
        {
            //var kiraye = await _context.Kirayes.FirstOrDefaultAsync(x => x.Id == kirayeId);
            var employee = await _context.EmployeeSalaryRecords.FirstOrDefaultAsync(x => x.Id == employeeId);
            // if(kiraye == null || employee == null)
            // {
            //     return;
            // }
            employee.RentId = kirayeId;
            await _context.SaveChangesAsync();
        }

        public async Task<EmployeeSalaryRecord> UpdateEmployee(EmployeeSalaryRecord employee)
        {
            // await ChangeKiraye(employee.RentId, employee.Id);

            var existingEmployee = await _context.EmployeeSalaryRecords
          .Include(x => x.Employee)
                .Include(x => x.Ability)
                .Include(x => x.ScientificDegree)
                .Include(x => x.HonorTitle)
                .Include(x => x.Discount)
                .Include(x => x.Rent)
                .Include(x => x.Position)
                    .ThenInclude(x => x.Department)
                        .ThenInclude(x => x.Adminstration).
            FirstOrDefaultAsync(x => x.Id == employee.Id);

            // Update the properties of the existingEmployee object with the values from the employee parameter.
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
            existingEmployee.HonorTitle = employee.HonorTitle;
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
            existingEmployee.Representing = employee.Representing;
            existingEmployee.Harmfulness = employee.Harmfulness;
            existingEmployee.Confidentiality = employee.Confidentiality;

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

            recordsToUpdate.ForEach(record => { record.IsVeteran = true; record.VeteranQat = veteranQat; });
            await _context.SaveChangesAsync();
        }
    }
}