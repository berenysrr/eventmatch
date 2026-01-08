using Microsoft.AspNetCore.Mvc;
using EventMatch.API.Data;
using EventMatch.API.Models;
using Microsoft.EntityFrameworkCore;

namespace EventMatch.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EventsController(AppDbContext context)
        {
            _context = context;
        }

        // 1. TÜM ETKİNLİKLERİ LİSTELE
        [HttpGet]
        public async Task<IActionResult> GetEvents()
        {
            var events = await _context.Events.ToListAsync();
            return Ok(events);
        }

        // 2. YENİ ETKİNLİK EKLE
        [HttpPost]
        public async Task<IActionResult> CreateEvent([FromBody] Event newEvent)
        {
            _context.Events.Add(newEvent);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Event created successfully!", eventId = newEvent.Id });
        }

        // 3. ETKİNLİĞE KATIL (JOIN)
        [HttpPost("join")]
        public async Task<IActionResult> JoinEvent([FromBody] ParticipantRequest request)
        {
            var sql = "INSERT INTO Participants (UserId, EventId, JoinedAt) VALUES ({0}, {1}, {2})";
            try 
            {
                await _context.Database.ExecuteSqlRawAsync(sql, request.UserId, request.EventId, DateTime.Now);
                return Ok(new { message = "Successfully joined the event!" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Already joined or error.", error = ex.Message });
            }
        }

        // 4. KULLANICININ KATILDIĞI ETKİNLİKLERİ GETİR (Profil Sayfası İçin)
        [HttpGet("my-events/{userId}")]
        public async Task<IActionResult> GetUserEvents(int userId)
        {
            var userEvents = await _context.Events
                .FromSqlRaw("SELECT e.* FROM Events e JOIN Participants p ON e.Id = p.EventId WHERE p.UserId = {0}", userId)
                .ToListAsync();

            return Ok(userEvents);
        }

        // 5. ETKİNLİK SİL (Admin İçin) - YENİ EKLENEN KISIM
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEvent(int id)
        {
            var eventToDelete = await _context.Events.FindAsync(id);
            if (eventToDelete == null)
            {
                return NotFound("Event not found.");
            }

            _context.Events.Remove(eventToDelete);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Event deleted successfully!" });
        }
    }

    public class ParticipantRequest
    {
        public int UserId { get; set; }
        public int EventId { get; set; }
    }
}