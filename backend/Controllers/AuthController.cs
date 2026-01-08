using Microsoft.AspNetCore.Mvc;
using EventMatch.API.Data;
using EventMatch.API.Models;
using Microsoft.EntityFrameworkCore;

namespace EventMatch.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AuthController(AppDbContext context)
        {
            _context = context;
        }

        // REGISTER (Sign Up)
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User user)
        {
            if (await _context.Users.AnyAsync(u => u.Email == user.Email))
            {
                // Updated to English
                return BadRequest("Email address is already in use."); 
            }

            user.PasswordHash = user.PasswordHash + "_secret"; 
            user.CreatedAt = DateTime.Now;
            
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // Updated to English
            return Ok(new { message = "Registration successful!", userId = user.Id });
        }

        // LOGIN
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest loginData)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == loginData.Email && u.PasswordHash == loginData.Password + "_secret");

            if (user == null)
                // Updated to English
                return Unauthorized("Invalid email or password.");

           // ID bilgisini de gönderiyoruz ki Frontend kimin giriş yaptığını bilsin
return Ok(new { 
    message = "Login successful!", 
    userId = user.Id, 
    user = user.FullName 
});
        }
    }

    public class LoginRequest
    {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}