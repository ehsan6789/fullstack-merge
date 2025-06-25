using Authdemo1.DTOs;
using Authdemo1.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Authdemo1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AttendanceController : ControllerBase
    {
        private readonly IAttendanceRepository _repo;
        private readonly IMapper _mapper;

        public AttendanceController(IAttendanceRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpPost("checkin")]
        public async Task<IActionResult> CheckIn([FromBody] AttendanceDto dto)
        {
            var result = await _repo.CheckInAsync(dto.EmployeeId, dto.Date);
            return Ok(result);
        }

        [HttpPost("checkout")]
        public async Task<IActionResult> CheckOut([FromBody] AttendanceDto dto)
        {
            var result = await _repo.CheckOutAsync(dto.EmployeeId, dto.Date);
            return Ok(result);
        }

        [HttpGet]
        public async Task<IActionResult> GetAttendance([FromQuery] int employeeId, DateTime fromDate, DateTime toDate)
        {
            var records = await _repo.GetAttendanceRangeAsync(employeeId, fromDate, toDate);
            return Ok(_mapper.Map<IEnumerable<AttendanceDto>>(records));
        }
    }
}
