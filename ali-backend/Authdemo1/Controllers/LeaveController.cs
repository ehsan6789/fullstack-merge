using Authdemo1.DTOs;
using Authdemo1.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Authdemo1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeaveController : ControllerBase
    {
        private readonly ILeaveRepository _repo;
        private readonly IMapper _mapper;

        public LeaveController(ILeaveRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpPost("apply")]
        public async Task<IActionResult> ApplyLeave([FromBody] CreateLeaveRequestDto dto)
        {
            var result = await _repo.ApplyLeaveAsync(dto);
            return Ok(result);
        }

        [HttpGet("balance/{employeeId}")]
        public async Task<IActionResult> GetBalance(int employeeId)
        {
            var result = await _repo.GetLeaveBalanceAsync(employeeId);
            return Ok(result);
        }

        [HttpGet("history/{employeeId}")]
        public async Task<IActionResult> GetHistory(int employeeId)
        {
            var history = await _repo.GetLeaveHistoryAsync(employeeId);
            return Ok(_mapper.Map<IEnumerable<LeaveRequestDto>>(history));
        }
    }
}
