using AutoMapper;
using OfficeOpenXml;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebApplication1.Dtos;
using WebApplication1.Models;
using WebApplication1.Repositories;

namespace WebApplication1.Services
{
    class AdminstrationService : IAdminstrationService
    {
        private readonly IAdminstrationRepository _adminstrationRepository;
        private readonly IMapper _mapper;

        public AdminstrationService(IAdminstrationRepository adminstrationRepository,IMapper mapper)
        {
            _adminstrationRepository = adminstrationRepository;
            _mapper = mapper;
        }
        public async Task<ErrorHandelerDto> GetAdminstrations()
        {
            List<Adminstration> obj = await _adminstrationRepository.GetAdminstrations();
            List<AdminstratorBasicDto> obj1 = _mapper.Map<List<AdminstratorBasicDto>>(obj);
            return new ErrorHandelerDto { StatusCode = 200, data = obj1 };
        }

        public async Task<ErrorHandelerDto> GetAdminstration(int id)
        {
            if (id == 0)
            {
                return new ErrorHandelerDto { StatusCode = 400, isError = true, data = "id is required" };
            }
            var obj = await _adminstrationRepository.GetAdminstration(id);
            if (obj == null)
            {
                return new ErrorHandelerDto { StatusCode = 404, isError = true, data = "Adminstration not found" };
            }
            return new ErrorHandelerDto { StatusCode = 200, data = _mapper.Map<AdminstratorResultDto>(obj) };
        }

        public async Task<ErrorHandelerDto> AddAdminstration(AdminstratorInputDto adminstration)
        {
            Adminstration adminstration1 = _mapper.Map<Adminstration>(adminstration);
            if (adminstration1 == null)
            {
                return new ErrorHandelerDto { StatusCode = 400, isError = true, data = "Adminstration is required" };
            }
            await _adminstrationRepository.AddAdminstration(adminstration1);
            return new ErrorHandelerDto { StatusCode = 200, data = "sucess" };
        }

        public ErrorHandelerDto GetAllAdminstration()
        {
            return new ErrorHandelerDto { StatusCode=200,data= _adminstrationRepository.GetAllAdminstrationWithRelations() };
        }

        public async Task<ErrorHandelerDto> SaveAdminstration(List<AdminstratorBasicDto> adminstrators)
        {
            foreach(var adminstration in adminstrators){
                Adminstration admin = _mapper.Map<Adminstration>(adminstration);
                if (admin.Id <0)
                {
                    admin.Id = 0;
                    await _adminstrationRepository.AddAdminstration(admin);  
                    continue;
                }
                else
                {
                    await _adminstrationRepository.UpdateAdminstration(admin);
                }
            }
            return new ErrorHandelerDto { data = "sucess", StatusCode =200};
        }

        public async Task<ErrorHandelerDto> DeleteAdminstration(int id)
        {
            if(id == 0)
            {
                return new ErrorHandelerDto { isError = true, data = "Not doun", StatusCode = 404 };
            }
            await _adminstrationRepository.DeleteAdminstration(id);
            return new ErrorHandelerDto
            {
                data = "",
                StatusCode = 200
            };
        }

        public  byte[] ExportToExcel()
        {
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
            List<OrganizationDto> data = _adminstrationRepository.GetAllAdminstrationWithRelations();
            using (var package = new ExcelPackage())
            {
                var worksheet = package.Workbook.Worksheets.Add("Sheet1");

                // Set column headers
                worksheet.Cells[1, 1].Value = "İdarə";
                worksheet.Cells[1, 2].Value = "Bölmə və Şöbə";
                worksheet.Cells[1, 3].Value = "Vəzifə";
                worksheet.Cells[1, 4].Value = "Maaş";

                // Fill data rows
                int row = 2;
                foreach (var item in data)
                {
                    worksheet.Cells[row, 1].Value = item.OrganizationName;
                    worksheet.Cells[row, 2].Value = item.DepartmentName;
                    worksheet.Cells[row, 3].Value = item.PositionName;
                    worksheet.Cells[row, 4].Value = item.Salary;
                    row++;
                }

                // Auto-fit columns for better visibility
                worksheet.Cells.AutoFitColumns();

                // Convert the Excel package to a byte array
                byte[] fileBytes = package.GetAsByteArray();
                return fileBytes;
            }
            }
        }
}