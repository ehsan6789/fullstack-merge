using Authdemo1.Data;
using Authdemo1.Interfaces;
using Authdemo1.Models;
using Microsoft.EntityFrameworkCore;

namespace Authdemo1.Repositories
{
    public class AttendanceRepository: IAttendanceRepository
    {
        private readonly AppDbContext _context;
        private readonly IAttendanceRepository _attendanceRepo;
       

        public AttendanceRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<bool> CheckInAsync(int employeeId, DateTime date)
        {
            var existing = await _context.Attendances
                .FirstOrDefaultAsync(x => x.EmployeeId == employeeId && x.Date.Date == date.Date);

            if (existing != null) return false;

            var attendance = new Attendance
            {
                EmployeeId = employeeId,
                Date = date.Date,
                CheckInTime = DateTime.Now,
                IsPresent = true
            };

            await _context.Attendances.AddAsync(attendance);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> CheckOutAsync(int employeeId, DateTime date)
        {
            var existing = await _context.Attendances
                .FirstOrDefaultAsync(x => x.EmployeeId == employeeId && x.Date.Date == date.Date);

            if (existing == null) return false;

            existing.CheckOutTime = DateTime.Now;
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<IEnumerable<Attendance>> GetAttendanceRangeAsync(int employeeId, DateTime from, DateTime to)
        {
            return await _context.Attendances
                .Where(x => x.EmployeeId == employeeId && x.Date >= from && x.Date <= to)
                .ToListAsync();
        }
    }
}
