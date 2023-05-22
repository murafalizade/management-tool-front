using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using WebApplication1.Dtos;
using WebApplication1.Models;
using WebApplication1.Repositories;

namespace WebApplication1.Services
{
    public class DepartmentService : IDepartmentService
    {
        private readonly IDepartmentRepository _departmentRepository;
        private readonly IMapper _mapper;
        public DepartmentService(IDepartmentRepository departmentRepository, IMapper mapper)
        {
            _departmentRepository = departmentRepository;
            _mapper = mapper;
        }
        public async Task<ErrorHandelerDto> AddDepartment(DepartmentInputDto department2)
        {
            var department = _mapper.Map<Department>(department2);   
            try
            {
                var result = await _departmentRepository.AddDepartment(department);
                if (result != null)
                {
                    return new ErrorHandelerDto
                    {
                        StatusCode = 200,
                        data = department
                    };
                }
                else
                {
                    return new ErrorHandelerDto
                    {
                        StatusCode = 400,
                        data = "Department Not Added Successfully"
                    };
                }
            }
            catch (Exception ex)
            {
                return new ErrorHandelerDto
                {
                    StatusCode = 500,
                    data = ex.Message
                };
            }
        }
        public async Task<ErrorHandelerDto> DeleteDepartment(int departmentId)
        {
            try
            {
                var result = await _departmentRepository.DeleteDepartment(departmentId);
                if (result != null)
                {
                    return new ErrorHandelerDto
                    {
                        StatusCode = 200,
                        data = "Department Deleted Successfully"
                    };
                }
                else
                {
                    return new ErrorHandelerDto
                    {
                        StatusCode = 400,
                        data = "Department Not Deleted Successfully"
                    };
                }
            }
            catch (Exception ex)
            {
                return new ErrorHandelerDto
                {
                    StatusCode = 500,
                    data = ex.Message
                };
            }
        }
        public async Task<ErrorHandelerDto> GetDepartment(int departmentId)
        {
            try
            {
                var result = await _departmentRepository.GetDepartment(departmentId);
                if (result != null)
                {
                    return new ErrorHandelerDto
                    {
                        StatusCode = 200,
                        data = _mapper.Map<DepartmantResultDto>(result)
                    };
                }
                else
                {
                    return new ErrorHandelerDto
                    {
                        StatusCode = 400,
                        data = "Department Not Get Successfully"
                    };
                }
            }
            catch (Exception ex)
            {
                return new ErrorHandelerDto
                {
                    StatusCode = 500,
                    data = ex.Message
                };
            }
        }
        public async Task<ErrorHandelerDto> GetDepartments()
        {
            try
            {
                List<Department> result = await _departmentRepository.GetDepartments();
                if (result != null)
                {
                    return new ErrorHandelerDto
                    {
                        StatusCode = 200,
                        data = _mapper.Map<List<DepartmentBasicDto>>(result)
                    };
                }
                else
                {
                    return new ErrorHandelerDto
                    {
                        StatusCode = 400,
                        data = "Departments Not Get Successfully"
                    };
                }
            }
            catch (Exception ex)
            {
                return new ErrorHandelerDto
                {
                    StatusCode = 500,
                    data = ex.Message
                };
            }
        }
        public async Task<ErrorHandelerDto> SaveDepartment(List<DepartmentBasicDto> department)
        {
            if(department == null)
            {
                return new ErrorHandelerDto { StatusCode = 404, data = "Error" };
            }
            foreach(DepartmentBasicDto departmentBasic in department)
            {
                Department obj = _mapper.Map<Department>(departmentBasic);
                if (obj.Id < 0)
                {
                    obj.Id = 0;
                    await _departmentRepository.AddDepartment(obj);
                }
                else
                {
                    await _departmentRepository.UpdateDepartment(obj);
                }
            }
            return new ErrorHandelerDto {StatusCode=200,data="Success" };
        }
        public async Task<ErrorHandelerDto> UpdateDepartment(Department department)
        {
            try
            {
                var result = await _departmentRepository.UpdateDepartment(department);
                if (result != null)
                {
                    return new ErrorHandelerDto
                    {
                        StatusCode = 200,
                        data = "Department Updated Successfully"
                    };
                }
                else
                {
                    return new ErrorHandelerDto
                    {
                        StatusCode = 400,
                        data = "Department Not Updated Successfully"
                    };
                }
            }
            catch (Exception ex)
            {
                return new ErrorHandelerDto
                {
                    StatusCode = 500,
                    data = ex.Message
                };
            }
        }
    }
}
