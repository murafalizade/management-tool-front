using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using WebApplication1.Dtos;
using WebApplication1.Models;
using WebApplication1.Repositories;

namespace WebApplication1.Services
{
    class EmployeeSalaryRecordService : IEmployeeSalaryRecordService
    {
        private readonly IEmployeeSalaryRecordRepository _employeeSalaryRecordRepository;
        private readonly IMapper _mapper;
        public EmployeeSalaryRecordService(IEmployeeSalaryRecordRepository employeeSalaryRecordRepository, IMapper mapper)
        {
            _employeeSalaryRecordRepository = employeeSalaryRecordRepository;
            _mapper = mapper;
        }
        public async Task<ErrorHandelerDto> GetAllEmployee()
        {
            try
            {
                List<EmployeeSalaryRecord> obj = await _employeeSalaryRecordRepository.GetEmployees();
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
                    data =  _mapper.Map<EmployeeSalaryResultDto>(obj),
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

        public async Task<ErrorHandelerDto> UpdateEmployee(EmployeeEditDto employee)
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
    }
}