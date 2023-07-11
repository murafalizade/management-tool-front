using System;
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
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IMapper _mapper;
        public EmployeeSalaryRecordService(IEmployeeSalaryRecordRepository employeeSalaryRecordRepository, IEmployeeRepository employeeRepository, IMapper mapper)
        {
            _employeeSalaryRecordRepository = employeeSalaryRecordRepository;
            _employeeRepository = employeeRepository;
            _mapper = mapper;
        }

        public async Task<ErrorHandelerDto> GetAllEmployee(int month = 0, int year = 0)
        {
            try
            {
                month = month == 0 ? DateTime.Now.Month : month;
                year = year == 0 ? DateTime.Now.Year : year;

                List<EmployeeSalaryRecord> obj = await _employeeSalaryRecordRepository.GetEmployees(month, year);
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

        public async Task<ErrorHandelerDto> AddEmployeeForNextMonth()
        {
            try
            {
                EmployeeSalaryRecord lastRecord = await _employeeSalaryRecordRepository.GetLastEmployeeRecord();

                List<EmployeeSalaryRecord> employeeSalaryRecordForThisMonth = await _employeeSalaryRecordRepository.GetEmployees(lastRecord.RecordDate.Month, lastRecord.RecordDate.Year);

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

            Employee employee = await _employeeRepository.GetEmployeeById(employeeId);
            RecordCreationDto x = new RecordCreationDto { Employee = employee, RankSalary = 70 };
            await _employeeSalaryRecordRepository.AddEmployee(_mapper.Map<EmployeeSalaryRecord>(x));
            return new ErrorHandelerDto
            {
                data = "Employee Added Successfully",
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

                List<EmployeeSalaryRecord> employeeSalaryRecordForThisMonth = await _employeeSalaryRecordRepository.GetEmployees(lastRecord.RecordDate.Month, lastRecord.RecordDate.Year);

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
    }
}