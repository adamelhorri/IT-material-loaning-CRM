
using DistributionAPI.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DistributionAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly DataContext _context;
        public UserController(DataContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<List<User>>> GetUsers()
        {
            return Ok(await _context.Users.ToListAsync());

        }
        [HttpPost]
        public async Task<ActionResult<List<User>>> PostUser(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return Ok(await _context.Users.ToListAsync());
        }
        [HttpPut]
        public async Task<ActionResult<List<User>>> UpdateUser(User user)
        {
            var dbUser = await _context.Users.FindAsync(user.id_user);
            if (dbUser == null)
            {
                return BadRequest("user not found");
            }
            dbUser.name_user = user.name_user;
            dbUser.fname_user = user.fname_user;
            dbUser.email_user = user.email_user;
            dbUser.title_user= user.title_user;
            dbUser.location_user=user.location_user;
            
            dbUser.departement_user = user.departement_user;
            await _context.SaveChangesAsync();
            return Ok(await _context.Users.ToListAsync());

        }
        [HttpDelete("{id_user}")]
        public async Task<ActionResult<List<User>>> DeleteUser(int id_user)
        {

            var dbUser = await _context.Users.FindAsync(id_user);
            if (dbUser == null)
            {
                return BadRequest("user not found");

            }
            _context.Users.Remove(dbUser);
            await _context.SaveChangesAsync();
            return Ok(await _context.Users.ToListAsync());


        }

    }
}
