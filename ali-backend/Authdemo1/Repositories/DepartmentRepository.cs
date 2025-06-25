using Authdemo1.Data;
using Authdemo1.Interfaces;
using Authdemo1.Models;
using Microsoft.EntityFrameworkCore;

namespace Authdemo1.Repositories
{
    public class DepartmentRepository : Repository<Department>, IDepartmentRepository
    {
        public DepartmentRepository(AppDbContext context) : base(context)
        {
        }
        public async Task<Department> GetByNameAsync(string name)
        {
            return await _context.Departments
                .FirstOrDefaultAsync(d => d.Name.ToLower() == name.ToLower());
        }
    }
}
