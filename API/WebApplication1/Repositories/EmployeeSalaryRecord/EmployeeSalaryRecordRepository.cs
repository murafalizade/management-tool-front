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

        public async Task AddKirayeQat(int kirayeQat)
        {
            // update kiraye qat for this month
            var recordsToUpdate = await _context.EmployeeSalaryRecords
            .Where(x => x.RecordDate.Month == DateTime.Now.Month && x.RecordDate.Year == DateTime.Now.Year)
            .ToListAsync();

            recordsToUpdate.ForEach(record => { record.KirayeQat = kirayeQat; record.KirayePrice = kirayeQat * record.KirayePrice; record.KirayeId = 1; });
            await _context.SaveChangesAsync();
        }

        public Task<List<EmployeeSalaryRecord>> GetEmployeeById(int employeeId, int year)
        {
            return _context.EmployeeSalaryRecords.
            Include(x => x.Employee).
            Include(x => x.Employee.Rank).
            Include(x => x.Discount).
            Include(x => x.Employee.Position).
            Include(x => x.Employee.Position.Department).
            Include(x => x.Employee.Position.Department.Adminstration).
            Where(x => x.EmployeeId == employeeId && x.RecordDate.Year == year).ToListAsync();
        }

        public async Task<EmployeeSalaryRecord> GetEmployeeById(int id)
        {
            return await _context.EmployeeSalaryRecords.Include(x => x.Employee).
            Include(x => x.Employee.Rank).
            Include(x => x.Employee.Position).
            Include(x => x.Kiraye).
            Include(x => x.Discount).
            Include(x => x.Employee.Position.Department).
            Include(x => x.Employee.Position.Department.Adminstration).
            FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<EmployeeSalaryRecord>> GetEmployees(string search, int month, int year)
        {
            var query = _context.EmployeeSalaryRecords
                .Include(x => x.Employee)
                    .ThenInclude(x => x.Rank)
                .Include(x => x.Discount)
                .Include(x => x.Kiraye)
                .Include(x => x.Employee.Position)
                    .ThenInclude(x => x.Department)
                        .ThenInclude(x => x.Adminstration)
                .Where(x => x.RecordDate.Year == year && x.RecordDate.Month == month);

            var searchOptions = new Dictionary<string, Expression<Func<EmployeeSalaryRecord, bool>>>
                {
                    { "aliment", x => x.Aliment > 0 },
                    { "extra211100", x => x.Extra211100 > 0 },
                    { "fexri", x => x.FexriAd > 0 },
                    { "kesfiyyat", x => x.Kesfiyyat > 0 },
                    { "kesfMezun", x => x.KesfMezun > 0 },
                    { "kesfXeste", x => x.KesfXeste > 0 },
                    { "food", x => x.Food > 0 },
                    { "yukPulu", x => x.YukPulu > 0 },
                    { "cixisMuv", x => x.CixisMuv > 0 },
                    { "bpm", x => x.BPM > 0 },
                    {"erzaq", x=> x.FoodGiven==true},
                    {"texris", x=> x.CixisMuv >0},
                    { "mezuniyyet", x => x.Mezuniyyet > 0 },
                    {"ezamiyyet", x=>x.Ezamiyyet > 0},
                    { "kesir", x => x.Kesirler > 0 },
                    { "zererli", x => x.Zererlilik > 0 },
                    { "meharetlilik", x => x.Meharetlilik > 0 },
                    { "temsilcilik", x => x.Temsilcilik > 0 },
                    { "yol", x => x.YolXerci > 0 },
                    {  "yuk", x=> x.YukPulu >0},
                    { "kiraye", x => x.KirayePrice > 0 },
                    { "maddi", x => x.MaddiYardim > 0 },
                    { "sahra", x => x.Sehra > 0 },
                    { "elmi", x => x.ElmiDerece > 0 },
                    { "cixis", x => x.XariciDil > 0 },
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

        public async Task<EmployeeSalaryRecord> UpdateEmployee(EmployeeSalaryRecord employee)
        {
            var existingEmployee = await _context.EmployeeSalaryRecords.
            Include(x => x.Discount).
            Include(x => x.Kiraye).
            FirstOrDefaultAsync(x => x.Id == employee.Id);
            if (existingEmployee == null)
            {
                System.Console.WriteLine("Employee not found.");
            }

            // Update the properties of the existingEmployee object with the values from the employee parameter.
            existingEmployee.XariciDil = employee.XariciDil;
            existingEmployee.ElmiDerece = employee.ElmiDerece;
            existingEmployee.AlimentPercentage = employee.AlimentPercentage;
            existingEmployee.Aliment = employee.Aliment;
            existingEmployee.KirayeId = employee.KirayeId;


            existingEmployee.FamilyCount = employee.FamilyCount;
            existingEmployee.KirayeQat = employee.KirayeQat;
            existingEmployee.KirayePrice = employee.KirayePrice;
            existingEmployee.BPM = employee.BPM;
            existingEmployee.DSMF = employee.DSMF;
            existingEmployee.Comment = employee.Comment;
            existingEmployee.RankSalary = employee.RankSalary;
            existingEmployee.PositionSalary = employee.PositionSalary;
            existingEmployee.Kibertehlukesizlik = employee.Kibertehlukesizlik;
            existingEmployee.FexriAd = employee.FexriAd;
            existingEmployee.Ezamiyyet = employee.Ezamiyyet;
            existingEmployee.YolXerci = employee.YolXerci;
            existingEmployee.KesfXeste = employee.KesfXeste;
            existingEmployee.MaddiYardim = employee.MaddiYardim;
            existingEmployee.Sehra = employee.Sehra;
            existingEmployee.Kiraye = employee.Kiraye;
            existingEmployee.ExtraGivenMoney = employee.ExtraGivenMoney;
            existingEmployee.ExtraMoney = employee.ExtraMoney;
            existingEmployee.ExtraMoney2 = employee.ExtraMoney2;
            existingEmployee.Meharetlilik = employee.Meharetlilik;
            existingEmployee.YukPulu = employee.YukPulu;
            existingEmployee.Kesfiyyat = employee.Kesfiyyat;
            existingEmployee.Temsilcilik = employee.Temsilcilik;
            existingEmployee.Zererlilik = employee.Zererlilik;
            existingEmployee.Mexfilik = employee.Mexfilik;

            existingEmployee.Tax = employee.Tax;
            existingEmployee.Kesirler = employee.Kesirler;
            existingEmployee.Extra211100 = employee.Extra211100;
            existingEmployee.HealthInsurance = employee.HealthInsurance;
            existingEmployee.AccountNumber = employee.AccountNumber;

            existingEmployee.isChernobil = employee.isChernobil;
            existingEmployee.isDisabled = employee.isDisabled;
            existingEmployee.isOwner = employee.isOwner;
            existingEmployee.isVeteran = employee.isVeteran;
            existingEmployee.isMatry = employee.isMatry;
            existingEmployee.Muavin = employee.Muavin;
            existingEmployee.isNotGiven = employee.isNotGiven;
            existingEmployee.Mezuniyyet = employee.Mezuniyyet;
            existingEmployee.FoodGiven = employee.FoodGiven;
            existingEmployee.KesfMezun = employee.KesfMezun;
            existingEmployee.CixisMuv = employee.CixisMuv;

            await _context.SaveChangesAsync();
            return existingEmployee;
        }
    }
}