using Authdemo1.Data;
using Authdemo1.DTOs;
using Authdemo1.Interfaces;
using Authdemo1.Models;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
namespace Authdemo1.Repositories
{
    public class LeaveRepository : ILeaveRepository
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public LeaveRepository(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<bool> ApplyLeaveAsync(CreateLeaveRequestDto dto)
        {
            var leave = _mapper.Map<LeaveRequest>(dto);
            leave.Status = "Pending";
            await _context.LeaveRequests.AddAsync(leave);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<object> GetLeaveBalanceAsync(int employeeId)
        {
            var emp = await _context.Employees.FindAsync(employeeId);
            return new
            {
                emp.AnnualLeaveBalance,
                emp.SickLeaveBalance,
                emp.CasualLeaveBalance
            };
        }

        public async Task<IEnumerable<LeaveRequest>> GetLeaveHistoryAsync(int employeeId)
        {
            return await _context.LeaveRequests
                .Where(l => l.EmployeeId == employeeId)
                .ToListAsync();
        }
    }
}
