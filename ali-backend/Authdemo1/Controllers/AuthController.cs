using System.Net;
using Authdemo1.Models;
using Authdemo1.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;


namespace Authdemo1.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly TokenService _tokenService;
        private readonly ICustomEmailSender _emailSender;
        private readonly IConfiguration _configuration;



        public AuthController(UserManager<ApplicationUser> userManager,
                              SignInManager<ApplicationUser> signInManager,
                              TokenService tokenService, ICustomEmailSender emailSender, IConfiguration configuration)
                               
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
            _emailSender = emailSender;
            _configuration = configuration;
        }

        //[HttpPost("register")]
        //public async Task<IActionResult> Register(RegisterModel model)
        //{
        //    var user = new ApplicationUser { UserName = model.Email, Email = model.Email };
        //    var result = await _userManager.CreateAsync(user, model.Password);

        //    if (!result.Succeeded)
        //        return BadRequest(result.Errors);

        //    return Ok("User registered successfully.");
        //}
        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterModel model)
        {
            var user = new ApplicationUser { UserName = model.Email, Email = model.Email };
            var result = await _userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
            {
                var errors = result.Errors.Select(e => e.Description);
                return BadRequest(new { errors });
            }

            return Ok(new { message = "User registered successfully." });
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null) return Unauthorized("Invalid email");

            var result = await _signInManager.CheckPasswordSignInAsync(user, model.Password, false);
            if (!result.Succeeded) return Unauthorized("Invalid password");

            var token = _tokenService.CreateToken(user);
            return Ok(new { token });
        }
        //      [HttpPost("forgot-password")]
        //      public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordDto model)
        //      {
        //          if (!ModelState.IsValid)
        //              return BadRequest(ModelState);

        //          var user = await _userManager.FindByEmailAsync(model.Email);
        //          if (user == null || !(await _userManager.IsEmailConfirmedAsync(user)))
        //          {
        //              // Don't reveal if the user exists
        //              return Ok(new { Message = "If your email exists, a reset link has been sent." });
        //          }

        //          // ✅ Generate password reset token
        //          var token = await _userManager.GeneratePasswordResetTokenAsync(user);
        //          var encodedToken = HttpUtility.UrlEncode(token);

        //          // ✅ Construct the reset URL (frontend)
        //          var resetUrl = $"http://localhost:4200/auth/reset-password?email={model.Email}&token={encodedToken}";

        //          // ✅ Call your email service here
        //          await _emailSender.SendEmailAsync(
        //    model.Email,
        //    "Reset Password",
        //    $"<p>Click <a href='{resetUrl}'>here</a> to reset your password.</p>"
        //);

        //          return Ok(new { Message = "If your email exists, a reset link has been sent." });
        //      }

        //  }


        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordDto model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null || !(await _userManager.IsEmailConfirmedAsync(user)))
            {
                return Ok(new { Message = "If your email exists, a reset link has been sent." });
            }

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            var encodedToken = WebUtility.UrlEncode(token);

            var resetUrl = $"http://localhost:4200/auth/reset-password?email={model.Email}&token={encodedToken}";

            await _emailSender.SendEmailAsync(
                model.Email,
                "Reset Password",
                $"<p>Click <a href='{resetUrl}'>here</a> to reset your password.</p>"
            );

            return Ok(new { Message = "If your email exists, a reset link has been sent." });
        }

    }
}
