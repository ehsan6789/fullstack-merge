using Authdemo1.DTOs;
using Authdemo1.Models;

namespace Authdemo1.Interfaces
{
    public interface ILeaveRepository
    {
        Task<bool> ApplyLeaveAsync(CreateLeaveRequestDto leaveDto);
        Task<object> GetLeaveBalanceAsync(int employeeId);
        Task<IEnumerable<LeaveRequest>> GetLeaveHistoryAsync(int employeeId);
    }
}
