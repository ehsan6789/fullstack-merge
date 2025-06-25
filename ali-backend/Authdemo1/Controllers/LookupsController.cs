using Authdemo1.Helpers;
using Authdemo1.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Authdemo1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LookupsController : ControllerBase
    {
        [HttpGet("employee-statuses")]
        public IActionResult GetEmployeeStatuses()
        {
            var statuses = EnumHelper.GetEnumAsList<EmployeeStatus>();
            return Ok(statuses);
        }
    }
}
