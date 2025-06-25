using Authdemo1.Models;

namespace Authdemo1.DTOs
{
    public class AttendanceDto
    {
        public int EmployeeId { get; set; }
        public DateTime Date { get; set; }
        public DateTime? CheckInTime { get; set; }
        public DateTime? CheckOutTime { get; set; }
        public AttendanceStatus Status { get; set; }
    }
}
