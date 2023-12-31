﻿using AutoMapper;
using WebApplication1.Dtos;
using WebApplication1.Models;

namespace WebApplication1
{
    public class AutoMapperProfile:Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<AdminstratorInputDto, Adminstration>();
            CreateMap<DepartmentInputDto, Department>();
            CreateMap<Department,DepartmantResultDto>().ReverseMap();
            CreateMap<Department,DepartmentBasicDto>().ReverseMap();
            CreateMap<Adminstration,AdminstratorBasicDto>().ReverseMap();
            CreateMap<Adminstration,AdminstratorResultDto>().ReverseMap();
            CreateMap<PositionInputcDto, Position>();
            CreateMap<Position, PositionResultDto>();
            CreateMap<Position, PositionBasicDto>().ReverseMap();
            CreateMap<EmployeeInputDto, Employee>();
            CreateMap<EmployeeEditDto,Employee>();
            CreateMap<RecordCreationDto,EmployeeSalaryRecord>();
            CreateMap<EmployeeSalaryRecord, Employee>();
            CreateMap<EmployeeSalaryRecord, EmployeeSalaryResultDto>().ReverseMap();
            CreateMap<EmployeeSalaryEditDto,EmployeeSalaryRecord>();
            CreateMap<Employee, EmployeeGetDto>();
            CreateMap<Rank, RankDto>();
            CreateMap<User, UserDto>();
        }

    }
}
