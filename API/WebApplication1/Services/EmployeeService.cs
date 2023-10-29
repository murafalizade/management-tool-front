using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using WebApplication1.Dtos;
using WebApplication1.Models;
using WebApplication1.Repositories;

namespace WebApplication1.Services
{
    class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IEmployeeSalaryRecordRepository _employeeSalaryRecordRepository;
        private readonly IDiscountRepository _discountRepository;

        private readonly IMapper _mapper;
        public EmployeeService(IEmployeeRepository employeeRepository, IEmployeeSalaryRecordRepository employeeSalaryRecordRepository, IDiscountRepository discountRepository, IMapper mapper)
        {
            _employeeRepository = employeeRepository;
            _employeeSalaryRecordRepository = employeeSalaryRecordRepository;
            _discountRepository = discountRepository;
            _mapper = mapper;
        }
        public async Task<ErrorHandelerDto> AddEmployee(EmployeeInputDto employee)
        {
            // try
            // {
            var obj = await _employeeRepository.GetEmployeeByFin(employee.Fin);
            if (obj != null)
            {
                return new ErrorHandelerDto
                {
                    data = "Employee Already Exist",
                    StatusCode = 400,
                    isError = true

                };
            }
            employee.StartDate = DateTime.Today.AddYears(-employee.WorkExperience);
            int id = await _employeeRepository.AddEmployee(_mapper.Map<Employee>(employee));
            Discount discount = await _discountRepository.GetDiscountByDate(0, 0);
            RecordCreationDto x = new() { EmployeeId = id, Discount = discount };
            EmployeeSalaryRecord employeeSalaryRecord = _mapper.Map<EmployeeSalaryRecord>(x);
            await _employeeSalaryRecordRepository.AddEmployee(employeeSalaryRecord);
            return new ErrorHandelerDto
            {
                data = "Employee Added Successfully",
                StatusCode = 200
            };
        }
        // catch (System.Exception)
        // {

        //     return new ErrorHandelerDto
        //     {
        //         data = "Employee Added Failed",
        //         StatusCode = 400,
        //         isError = true

        //     };

        // }
        // }

        public async Task<ErrorHandelerDto> DeleteEmployee(int id)
        {
            try
            {
                var obj = await _employeeRepository.GetEmployeeById(id);
                if (obj == null)
                {
                    return new ErrorHandelerDto
                    {
                        data = "Employee Not Found",
                        StatusCode = 404,
                        isError = true

                    };
                }
                await _employeeRepository.DeleteEmployee(id);
                return new ErrorHandelerDto
                {
                    data = "Employee Deleted Successfully",
                    StatusCode = 200
                };
            }
            catch (System.Exception)
            {
                return new ErrorHandelerDto
                {
                    data = "Employee Deleted Failed",
                    StatusCode = 400
                };
            }
        }

        public async Task<ErrorHandelerDto> GetAllEmployee()
        {
            try
            {
                List<EmployeeGetDto> obj = _mapper.Map<List<EmployeeGetDto>>(await _employeeRepository.GetEmployees());
                return new ErrorHandelerDto
                {
                    data = obj,
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
                Employee obj = await _employeeRepository.GetEmployeeById(id);
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
                    data = obj,
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

        public async Task<ErrorHandelerDto> GetEmployeeByPosition(int positionId)
        {
            List<Employee> obj = _mapper.Map<List<Employee>>(
                await _employeeRepository.GetEmployeeByPosition(positionId));
            return new ErrorHandelerDto
            {
                data = obj,
                StatusCode = 200
            };
        }

        public async Task<ErrorHandelerDto> UpdateEmployee(EmployeeEditDto employee)
        {
            try
            {
                await _employeeRepository.UpdateEmployee(_mapper.Map<Employee>(employee));
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