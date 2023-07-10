using DistributionAPI.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DistributionAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly DataContext _context;

        public AdminController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Admin>>> GetAdmins()
        {
            return Ok(await _context.Admins.ToListAsync());
        }

        [HttpPost]
        public async Task<ActionResult<List<Admin>>> PostAdmin(Admin admin)
        {
            _context.Admins.Add(admin);
            await _context.SaveChangesAsync();
            return Ok(await _context.Admins.ToListAsync());
        }

        [HttpPut]
        public async Task<ActionResult<List<Admin>>> UpdateAdmin(Admin admin)
        {
            var dbAdmin = await _context.Admins.FindAsync(admin.id_admin);
            if (dbAdmin == null)
            {
                return BadRequest("Admin not found");
            }

            dbAdmin.username = admin.username;
            dbAdmin.password = admin.password;
            dbAdmin.title = admin.title;

            await _context.SaveChangesAsync();
            return Ok(await _context.Admins.ToListAsync());
        }

        [HttpDelete("{id_admin}")]
        public async Task<ActionResult<List<Admin>>> DeleteAdmin(int id_admin)
        {
            var dbAdmin = await _context.Admins.FindAsync(id_admin);
            if (dbAdmin == null)
            {
                return BadRequest("Admin not found");
            }

            _context.Admins.Remove(dbAdmin);
            await _context.SaveChangesAsync();
            return Ok(await _context.Admins.ToListAsync());
        }
    }
}
