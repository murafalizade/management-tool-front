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
        private readonly IMapper _mapper;
        public EmployeeService(IEmployeeRepository employeeRepository, IEmployeeSalaryRecordRepository employeeSalaryRecordRepository, IMapper mapper)
        {
            _employeeRepository = employeeRepository;
            _employeeSalaryRecordRepository = employeeSalaryRecordRepository;
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
                Employee obj1 = _mapper.Map<Employee>(employee);
                await _employeeRepository.AddEmployee(obj1);
                RecordCreationDto x = new RecordCreationDto { Employee = obj1 };
                await _employeeSalaryRecordRepository.AddEmployee(_mapper.Map<EmployeeSalaryRecord>(x));
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
                List<Employee> obj = await _employeeRepository.GetEmployees();
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
            List<Employee> obj = await _employeeRepository.GetEmployeeByPosition(positionId);
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