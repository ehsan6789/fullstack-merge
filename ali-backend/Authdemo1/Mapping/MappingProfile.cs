//using Authdemo1.DTOs;
//using Authdemo1.Models;
//using AutoMapper;

//namespace Authdemo1.Mapping
//{

//    public class MappingProfile : Profile
//    {
//        public MappingProfile()
//        {
//            // Department mappings
//            CreateMap<Department, DepartmentDto>();

//            // BankAccount mappings
//            CreateMap<BankAccount, BankAccountDto>();
//            CreateMap<CreateBankAccountDto, BankAccount>();

//            // Employee mappings
//            CreateMap<Employee, EmployeeDto>()
//                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status.ToString()))
//                .ForMember(dest => dest.DepartmentName, opt => opt.MapFrom(src => src.Department.Name));
//            CreateMap<CreateEmployeeDto, Employee>()
//                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => Enum.Parse<EmployeeStatus>(src.Status)));

//            CreateMap<UpdateEmployeeDto, Employee>()
//                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => Enum.Parse<EmployeeStatus>(src.Status)));
//        }

//        private void CreateMap<T1, T2>()
//        {
//            throw new NotImplementedException();
//        }
//    }
//}

using Authdemo1.DTOs;
using Authdemo1.Models;
using AutoMapper;

namespace Authdemo1.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Department mappings
            CreateMap<Department, DepartmentDto>().ReverseMap();

            // BankAccount mappings
            CreateMap<BankAccount, BankAccountDto>().ReverseMap();
            CreateMap<CreateBankAccountDto, BankAccount>();

            // Employee mappings
            //CreateMap<Employee, EmployeeDto>()
            //    .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status.ToString()))
            //        .ForMember(dest => dest.DepartmentName, opt => opt.MapFrom(src => src.Department.Name));
            CreateMap<Employee, EmployeeDto>()
               .ForMember(dest => dest.DepartmentName,
                         opt => opt.MapFrom(src => src.Department != null ? src.Department.Name : "No Department"));


            CreateMap<CreateEmployeeDto, Employee>()
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => Enum.Parse<EmployeeStatus>(src.Status)));

            CreateMap<UpdateEmployeeDto, Employee>()
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => Enum.Parse<EmployeeStatus>(src.Status)));

            //Attendance System
            CreateMap<Attendance, AttendanceDto>().ReverseMap();
            CreateMap<LeaveRequest, CreateLeaveRequestDto>().ReverseMap();
            CreateMap<LeaveRequest, LeaveRequestDto>()
                .ForMember(dest => dest.EmployeeName, opt => opt.MapFrom(src => src.Employee.Name));
        }
    }
}