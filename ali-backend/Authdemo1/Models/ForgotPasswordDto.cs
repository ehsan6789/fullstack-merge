using System.ComponentModel.DataAnnotations;

namespace Authdemo1.Models
{
    public class ForgotPasswordDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}
