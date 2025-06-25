using System.Security.Claims;
using Authdemo1.DTOs;
using Authdemo1.Interfaces;
using Authdemo1.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Authdemo1.Controllers
{
  
    [Route("api/[controller]")]
    [ApiController]
  
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IDepartmentRepository _departmentRepository;
        private readonly IMapper _mapper;
        public EmployeesController(
            IEmployeeRepository employeeRepository,
            IDepartmentRepository departmentRepository,
            IMapper mapper)
        {
            _employeeRepository = employeeRepository;
            _departmentRepository = departmentRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<EmployeeDto>>> GetEmployees()
        {
        
            var employees = await _employeeRepository.GetAllAsync();
            return Ok(_mapper.Map<IEnumerable<EmployeeDto>>(employees));
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<EmployeeDto>> GetEmployee(int id)
        {
            var employee = await _employeeRepository.GetEmployeeWithBankAccountsAsync(id);
            if (employee == null)
            {
                return NotFound();
            }
            
            return Ok(_mapper.Map<EmployeeDto>(employee));
        }
        [HttpGet("department/{departmentId}")]
        public async Task<ActionResult<IEnumerable<EmployeeDto>>> GetEmployeesByDepartment(int departmentId)
        {
            var employees = await _employeeRepository.GetEmployeesByDepartmentAsync(departmentId);
            return Ok(_mapper.Map<IEnumerable<EmployeeDto>>(employees));
        }
        [HttpGet("status/{status}")]
        public async Task<ActionResult<IEnumerable<EmployeeDto>>> GetEmployeesByStatus(string status)
        {
            if (!Enum.TryParse<EmployeeStatus>(status, out var employeeStatus))
            {
                return BadRequest("Invalid status value");
            }
            var employees = await _employeeRepository.GetEmployeesByStatusAsync(employeeStatus);
            return Ok(_mapper.Map<IEnumerable<EmployeeDto>>(employees));
        }

        //[HttpPost]
        //public async Task<ActionResult<EmployeeDto>> CreateEmployee(CreateEmployeeDto createEmployeeDto)
        //{
        //           var claims = User.Claims.Select(c => new { c.Type, c.Value });
        //    // Check if department exists
        //    var department = await _departmentRepository.GetByIdAsync(createEmployeeDto.DepartmentId);
        //    if (department == null)
        //    {
        //        return BadRequest("Invalid department ID");
        //    }

        //    var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        //    if (string.IsNullOrEmpty(userId))
        //    {
        //        return Unauthorized("User ID not found in token.");
        //    }


        //    // Map and create employee
        //    var employee = _mapper.Map<Employee>(createEmployeeDto);
        //    employee.CreatedAt = DateTime.UtcNow;
        //    employee.CreatedBy = userId;

        //    await _employeeRepository.AddAsync(employee);

        //    return CreatedAtAction(nameof(GetEmployee), new { id = employee.Id }, _mapper.Map<EmployeeDto>(employee));
        //}
        [HttpPost]
        public async Task<ActionResult<EmployeeDto>> CreateEmployee(CreateEmployeeDto createEmployeeDto)
        {
            // Check if department exists
            var department = await _departmentRepository.GetByIdAsync(createEmployeeDto.DepartmentId);
            if (department == null)
            {
                return BadRequest("Invalid department ID");
            }

            // TEMP: Skip extracting UserId from token, use a dummy value
            var userId = "TestUser123"; // or use a fixed GUID

            // Map and create employeeMa 
            var employee = _mapper.Map<Employee>(createEmployeeDto);
            employee.CreatedAt = DateTime.UtcNow;
            employee.CreatedBy = userId;

            await _employeeRepository.AddAsync(employee);

            return CreatedAtAction(nameof(GetEmployee), new { id = employee.Id }, _mapper.Map<EmployeeDto>(employee));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEmployee(int id, UpdateEmployeeDto updateEmployeeDto)
        {
            var employee = await _employeeRepository.GetByIdAsync(id);
            if (employee == null)
            {
                return NotFound();
            }
            // Check if department exists
            var department = await _departmentRepository.GetByIdAsync(updateEmployeeDto.DepartmentId);
            if (department == null)
            {
                return BadRequest("Invalid department ID");
            }
            // Update only the fields in the DTO
            _mapper.Map(updateEmployeeDto, employee);
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            employee.UpdatedAt = DateTime.UtcNow;
            employee.UpdatedBy = userId;
            await _employeeRepository.UpdateAsync(employee);
            return NoContent();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var employee = await _employeeRepository.GetByIdAsync(id);
            if (employee == null)
            {
                return NotFound();
            }
            employee.IsDeleted = true;
            employee.DeletedAt = DateTime.UtcNow;
            await _employeeRepository.UpdateAsync(employee);
            return NoContent();
        }
    }
}
