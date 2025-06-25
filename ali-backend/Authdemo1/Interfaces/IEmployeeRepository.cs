using Authdemo1.Models;

namespace Authdemo1.Interfaces
{
    public interface IEmployeeRepository : IRepository<Employee>
    {
        Task<IEnumerable<Employee>> GetEmployeesByDepartmentAsync(int departmentId);
        Task<IEnumerable<Employee>> GetEmployeesByStatusAsync(EmployeeStatus status);
        Task<Employee> GetEmployeeWithBankAccountsAsync(int id);
        Task SaveChangesAsync();
    }
}
