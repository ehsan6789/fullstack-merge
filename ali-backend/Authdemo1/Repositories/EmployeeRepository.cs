using Authdemo1.Data;
using Authdemo1.Interfaces;
using Authdemo1.Models;
using Microsoft.EntityFrameworkCore;

namespace Authdemo1.Repositories
{
    public class EmployeeRepository : Repository<Employee>, IEmployeeRepository
    {
        public EmployeeRepository(AppDbContext context) : base(context)
        {
        }
        // YE METHOD ADD KIYA - GetAllAsync override
        public override async Task<IEnumerable<Employee>> GetAllAsync()
        {
            return await _context.Employees
                .Include(e => e.Department)  // Department include kar rahe hain
                .ToListAsync();
        }

        // YE METHOD BHI ADD KIYA - GetByIdAsync override
        public override async Task<Employee> GetByIdAsync(int id)
        {
            return await _context.Employees
                .Include(e => e.Department)
                .FirstOrDefaultAsync(e => e.Id == id);
        }
        public async Task<IEnumerable<Employee>> GetEmployeesByDepartmentAsync(int departmentId)
        {
            return await _context.Employees
                    .Include(e => e.Department)
                .Where(e => e.DepartmentId == departmentId)
                .ToListAsync();
        }
   

        public async Task<IEnumerable<Employee>> GetEmployeesByStatusAsync(EmployeeStatus status)
        {
            return await _context.Employees
                .Where(e => e.Status == status)
                .Include(e => e.Department)
                .ToListAsync();
        }
        public async Task<Employee> GetEmployeeWithBankAccountsAsync(int id)
        {
            return await _context.Employees
                .Include(e => e.Department)
                .Include(e => e.BankAccounts)
                .FirstOrDefaultAsync(e => e.Id == id);
        }

        public Task SaveChangesAsync()
        {
            throw new NotImplementedException();
        }
    }
}
