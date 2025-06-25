using Authdemo1.Models;

namespace Authdemo1.Interfaces
{
    public interface IDepartmentRepository : IRepository<Department>
    {
        Task<Department> GetByNameAsync(string name);
    }
}
