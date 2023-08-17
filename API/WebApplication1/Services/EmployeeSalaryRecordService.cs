using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using OfficeOpenXml;
using WebApplication1.Dtos;
using WebApplication1.Models;
using WebApplication1.Repositories;

namespace WebApplication1.Services
{
    class EmployeeSalaryRecordService : IEmployeeSalaryRecordService
    {
        private readonly IEmployeeSalaryRecordRepository _employeeSalaryRecordRepository;
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IDiscountRepository _discountRepository;
        private readonly IMapper _mapper;
        public EmployeeSalaryRecordService(IEmployeeSalaryRecordRepository employeeSalaryRecordRepository, IEmployeeRepository employeeRepository, IDiscountRepository discountRepository, IMapper mapper)
        {
            _employeeSalaryRecordRepository = employeeSalaryRecordRepository;
            _employeeRepository = employeeRepository;
            _discountRepository = discountRepository;
            _mapper = mapper;
        }

        public async Task<ErrorHandelerDto> GetAllEmployee(string search, int month = 0, int year = 0)
        {
            // try
            // {
            month = month == 0 ? DateTime.Now.Month : month;
            year = year == 0 ? DateTime.Now.Year : year;

            List<EmployeeSalaryRecord> obj = await _employeeSalaryRecordRepository.GetEmployees(search, month, year);
            return new ErrorHandelerDto
            {
                data = _mapper.Map<List<EmployeeSalaryResultDto>>(obj),
                StatusCode = 200
            };
            // }
            // catch (System.Exception)
            // {
            //     Console.WriteLine(System.Exception);
            //     return new ErrorHandelerDto
            //     {
            //         data = "Employee Get Failed",
            //         StatusCode = 400,
            //         isError = true

            //     };
            // }
        }

        public async Task<ErrorHandelerDto> GetEmployee(int id, int year = 0)
        {
            try
            {
                year = year == 0 ? DateTime.Now.Year : year;
                List<EmployeeSalaryRecord> obj = await _employeeSalaryRecordRepository.GetEmployeeById(id, year);
                if (obj == null)
                {
                    return new ErrorHandelerDto
                    {
                        data = "Employee Not Found",
                        StatusCode = 404,
                        isError = true
                    };
                }
                return new ErrorHandelerDto
                {
                    data = _mapper.Map<List<EmployeeSalaryResultDto>>(obj),
                    StatusCode = 200
                };
            }
            catch (System.Exception)
            {
                return new ErrorHandelerDto
                {
                    data = "Employee Get Failed",
                    StatusCode = 400,
                    isError = true

                };
            }
        }

        public async Task<ErrorHandelerDto> UpdateEmployee(EmployeeSalaryEditDto employee)
        {
            try
            {
                await _employeeSalaryRecordRepository.UpdateEmployee(_mapper.Map<EmployeeSalaryRecord>(employee));
                return new ErrorHandelerDto
                {
                    data = "Employee Updated Successfully",
                    StatusCode = 200
                };
            }
            catch (System.Exception)
            {
                return new ErrorHandelerDto
                {
                    data = "Employee Updated Failed",
                    StatusCode = 400,
                    isError = true

                };
            }
        }

        public async Task<ErrorHandelerDto> AddEmployeeForNextMonth()
        {
            try
            {
                EmployeeSalaryRecord lastRecord = await _employeeSalaryRecordRepository.GetLastEmployeeRecord();

                List<EmployeeSalaryRecord> employeeSalaryRecordForThisMonth = await _employeeSalaryRecordRepository.GetEmployees("all", lastRecord.RecordDate.Month, lastRecord.RecordDate.Year);

                foreach (var employee in employeeSalaryRecordForThisMonth)
                {
                    employee.RecordDate = employee.RecordDate.AddMonths(1);
                    employee.Id = 0;
                    await _employeeSalaryRecordRepository.AddEmployee(employee);
                }

                return new ErrorHandelerDto
                {
                    data = "Employee Added Successfully",
                    StatusCode = 200
                };
            }
            catch (System.Exception)
            {
                return new ErrorHandelerDto
                {
                    data = "Employee Added Failed",
                    StatusCode = 400,
                    isError = true

                };
            }
        }

        public async Task<ErrorHandelerDto> AddEmployee(int employeeId)
        {

            // Employee employee = await _employeeRepository.GetEmployeeById(employeeId);
            Discount discount = await _discountRepository.GetDiscountByDate(0, 0);
            RecordCreationDto x = new() { EmployeeId = employeeId, Discount = discount };
            await _employeeSalaryRecordRepository.AddEmployee(_mapper.Map<EmployeeSalaryRecord>(x));
            return new ErrorHandelerDto
            {
                data = "Employee Record Added Successfully",
                StatusCode = 200
            };
        }

        public async Task<ErrorHandelerDto> GetEmployee(int id)
        {
            try
            {
                EmployeeSalaryRecord obj = await _employeeSalaryRecordRepository.GetEmployeeById(id);
                if (obj == null)
                {
                    return new ErrorHandelerDto
                    {
                        data = "Employee Not Found",
                        StatusCode = 404,
                        isError = true
                    };
                }
                return new ErrorHandelerDto
                {
                    data = _mapper.Map<EmployeeSalaryResultDto>(obj),
                    StatusCode = 200
                };
            }
            catch (System.Exception)
            {
                return new ErrorHandelerDto
                {
                    data = "Employee Get Failed",
                    StatusCode = 400,
                    isError = true

                };
            }
        }

        public async Task<ErrorHandelerDto> CalculateSalary()
        {
            try
            {
                EmployeeSalaryRecord lastRecord = await _employeeSalaryRecordRepository.GetLastEmployeeRecord();

                List<EmployeeSalaryRecord> employeeSalaryRecordForThisMonth = await _employeeSalaryRecordRepository.GetEmployees("all", lastRecord.RecordDate.Month, lastRecord.RecordDate.Year);

                foreach (var employee in employeeSalaryRecordForThisMonth)
                {
                    await _employeeSalaryRecordRepository.UpdateEmployee(employee);
                }

                return new ErrorHandelerDto
                {
                    data = "Employee Added Successfully",
                    StatusCode = 200
                };
            }
            catch (System.Exception)
            {
                return new ErrorHandelerDto
                {
                    data = "Employee Added Failed",
                    StatusCode = 400,
                    isError = true

                };
            }
        }

        public async Task<byte[]> ExportExcel(string search, int month, int year)
        {
            // export excel
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
            List<EmployeeSalaryResultDto> data = _mapper.Map<List<EmployeeSalaryResultDto>>(await _employeeSalaryRecordRepository.GetEmployees(search, month, year));
            using var package = new ExcelPackage();
            var worksheet = package.Workbook.Worksheets.Add("Sheet1");

            // Set column headers
            worksheet.Cells[1, 1].Value = "İdarə";
            worksheet.Cells[1, 2].Value = "Bölmə və Şöbə";
            worksheet.Cells[1, 3].Value = "Vəzifə";
            worksheet.Cells[1, 4].Value = "Hərbi rütbə";
            worksheet.Cells[1, 5].Value = "S.A.A.";
            worksheet.Cells[1, 6].Value = "gün";
            worksheet.Cells[1, 7].Value = "ay";
            worksheet.Cells[1, 8].Value = "il";
            worksheet.Cells[1, 9].Value = "Xİ%";
            worksheet.Cells[1, 10].Value = "Xİ";
            worksheet.Cells[1, 11].Value = "Rütbə maaşı";
            worksheet.Cells[1, 12].Value = "Vəzifə maaşı";
            worksheet.Cells[1, 13].Value = "Xİ görə əlavə";
            worksheet.Cells[1, 14].Value = "P.t qatı";
            worksheet.Cells[1, 15].Value = "Məharət dər.";
            worksheet.Cells[1, 16].Value = "Təmsilçilik";
            worksheet.Cells[1, 17].Value = "Məxfiçilik";
            worksheet.Cells[1, 18].Value = "Zərərliyə görə";
            worksheet.Cells[1, 19].Value = "Kibertəhlükəsizlik əlavəsi";
            worksheet.Cells[1, 20].Value = "Xarici dil";
            worksheet.Cells[1, 21].Value = "Kəşf. mükaf.";
            worksheet.Cells[1, 22].Value = "Elmi dərəcə";
            worksheet.Cells[1, 23].Value = "Əlavə öd. (gvti)";
            worksheet.Cells[1, 24].Value = "Əlavə ödəniş";
            worksheet.Cells[1, 25].Value = "Cəmi";
            worksheet.Cells[1, 26].Value = "Gəlir vergisi";
            worksheet.Cells[1, 27].Value = "DSMF";
            worksheet.Cells[1, 28].Value = "Tibbi sığorta";
            worksheet.Cells[1, 29].Value = "Kəsirlər";
            worksheet.Cells[1, 30].Value = "Aliment";
            worksheet.Cells[1, 31].Value = "Artıq 211100";
            worksheet.Cells[1, 32].Value = "Güzəşt";
            worksheet.Cells[1, 33].Value = "Cəmi";
            worksheet.Cells[1, 34].Value = "Ələ veriləcək məbləğ";
            worksheet.Cells[1, 35].Value = "Ərzaq komp-sığ";
            worksheet.Cells[1, 36].Value = "MV müavin.";
            worksheet.Cells[1, 37].Value = "Məzuniyyət";
            worksheet.Cells[1, 38].Value = "Kəşf. məzun.";
            worksheet.Cells[1, 39].Value = "Kəşf. xəstə";
            worksheet.Cells[1, 40].Value = "Kirayə. komp.";
            worksheet.Cells[1, 41].Value = "Maddi yardım";
            worksheet.Cells[1, 42].Value = "Ezamiyyət";
            worksheet.Cells[1, 43].Value = "Səhra pulu";
            worksheet.Cells[1, 44].Value = "Yol xərci";
            worksheet.Cells[1, 45].Value = "Yük pulu";
            worksheet.Cells[1, 46].Value = "Çıxış müav.";
            worksheet.Cells[1, 47].Value = "BPM faiz";
            worksheet.Cells[1, 48].Value = "BPM";
            worksheet.Cells[1, 49].Value = "DSMF ümumi";
            worksheet.Cells[1, 50].Value = "Cəmi";
            worksheet.Cells[1, 51].Value = "Qeyd";
            worksheet.Cells[1, 52].Value = "MV müav. verilir";
            worksheet.Cells[1, 53].Value = "Hesab nömrəsi";
            worksheet.Cells[1, 54].Value = "Məh. %";
            worksheet.Cells[1, 55].Value = "HA_ID";
            worksheet.Cells[1, 56].Value = "H_ID";
            worksheet.Cells[1, 57].Value = "V2F_ID";


            // Fill data rows
            int row = 2;
            foreach (EmployeeSalaryResultDto item in data)
            {
                worksheet.Cells[row, 1].Value = item.EmployeePositionDepartmentAdminstrationName;
                worksheet.Cells[row, 2].Value = item.EmployeePositionDepartmentName;
                worksheet.Cells[row, 3].Value = item.EmployeePositionName;
                worksheet.Cells[row, 4].Value = item.EmployeeRankName;
                worksheet.Cells[row, 5].Value = item.FullName;
                worksheet.Cells[row, 6].Value = "gün";
                worksheet.Cells[row, 7].Value = "ay";
                worksheet.Cells[row, 8].Value = "il";
                worksheet.Cells[row, 9].Value = "Xİ%";
                worksheet.Cells[row, 10].Value = "Xİ";
                worksheet.Cells[row, 11].Value = item.RankSalary;
                worksheet.Cells[row, 12].Value = item.PositionSalary;
                worksheet.Cells[row, 13].Value = item.XIPercent;
                worksheet.Cells[row, 14].Value = item.PTMoney;
                worksheet.Cells[row, 15].Value = item.Meharetlilik;
                worksheet.Cells[row, 16].Value = item.Temsilcilik;
                worksheet.Cells[row, 17].Value = item.Mexfilik;
                worksheet.Cells[row, 18].Value = item.Zererlilik;
                worksheet.Cells[row, 19].Value = item.Kibertehlukesizlik;
                worksheet.Cells[row, 20].Value = item.XariciDil;
                worksheet.Cells[row, 21].Value = item.Kesfiyyat;
                worksheet.Cells[row, 22].Value = item.ElmiDerece;
                worksheet.Cells[row, 23].Value = item.ExtraMoney;
                worksheet.Cells[row, 24].Value = item.ExtraMoney2;
                worksheet.Cells[row, 25].Value = item.TotalIncome;
                worksheet.Cells[row, 26].Value = item.Tax;
                worksheet.Cells[row, 27].Value = item.DSMF;
                worksheet.Cells[row, 28].Value = item.HealthInsurance;
                worksheet.Cells[row, 29].Value = item.Kesirler;
                worksheet.Cells[row, 30].Value = item.Aliment;
                worksheet.Cells[row, 31].Value = item.Extra211100;
                worksheet.Cells[row, 32].Value = item.TotalDiscount;
                worksheet.Cells[row, 33].Value = item.TotalTaken;
                worksheet.Cells[row, 34].Value = item.TotalGiven;
                worksheet.Cells[row, 35].Value = item.Food;
                worksheet.Cells[row, 36].Value = item.DiscountVeteran;
                worksheet.Cells[row, 37].Value = item.Mezuniyyet;
                worksheet.Cells[row, 38].Value = item.KesfMezun;
                worksheet.Cells[row, 39].Value = item.KesfXeste;
                worksheet.Cells[row, 40].Value = item.KirayePrice;
                worksheet.Cells[row, 41].Value = item.MaddiYardim;
                worksheet.Cells[row, 42].Value = item.Ezamiyyet;
                worksheet.Cells[row, 43].Value = item.Sehra;
                worksheet.Cells[row, 44].Value = item.YolXerci;
                worksheet.Cells[row, 45].Value = item.YukPulu;
                worksheet.Cells[row, 46].Value = item.CixisMuv;
                worksheet.Cells[row, 47].Value = "BPM faiz";
                worksheet.Cells[row, 48].Value = "BPM";
                worksheet.Cells[row, 49].Value = item.TotalDSMF;
                worksheet.Cells[row, 50].Value = item.TotalSalary;
                worksheet.Cells[row, 51].Value = item.Comment;
                worksheet.Cells[row, 52].Value = item.İsVeteran ? "Bəli" : "Xeyr";
                worksheet.Cells[row, 53].Value = item.AccountNumber;
                worksheet.Cells[row, 54].Value = 0;
                worksheet.Cells[row, 55].Value = 0;
                worksheet.Cells[row, 56].Value = 0;
                worksheet.Cells[row, 57].Value = 0;
                row++;
            }

            // Auto-fit columns for better visibility
            worksheet.Cells.AutoFitColumns();

            // Convert the Excel package to a byte array
            byte[] fileBytes = package.GetAsByteArray();
            return fileBytes;
        }

        public async Task<ErrorHandelerDto> AddKirayeQat(int kirayeQat)
        {
            try
            {
                await _employeeSalaryRecordRepository.AddKirayeQat(kirayeQat);
                return new ErrorHandelerDto { isError = false, data = "Əməliyyat uğurla yerinə yetirildi" };
            }
            catch (Exception)
            {
                return new ErrorHandelerDto { isError = true, data = "U" };
            }
        }

        public async Task<ErrorHandelerDto> AddFoodQat(int foodQat)
        {
            try
            {
                await _employeeSalaryRecordRepository.AddFoodQat(foodQat);
                return new ErrorHandelerDto { isError = false, data = "Əməliyyat uğurla yerinə yetirildi" };
            }
            catch (Exception)
            {
                return new ErrorHandelerDto { isError = true, data = "U" };
            }
        }
    }
}