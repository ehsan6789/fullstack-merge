using Authdemo1.Models;

namespace Authdemo1.Interfaces
{
    public interface IAttendanceRepository
    {
        Task<bool> CheckInAsync(int employeeId, DateTime date);
        Task<bool> CheckOutAsync(int employeeId, DateTime date);
        Task<IEnumerable<Attendance>> GetAttendanceRangeAsync(int employeeId, DateTime from, DateTime to);
    }
}
