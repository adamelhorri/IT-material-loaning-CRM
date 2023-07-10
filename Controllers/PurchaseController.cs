
using DistributionAPI.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DistributionAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PurchaseController : ControllerBase
    {
        private readonly DataContext _context;
        public PurchaseController(DataContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<List<Purchase>>> GetPurchases()
        {
            return Ok(await _context.Purchases.ToListAsync());

        }
        [HttpGet("{po_purchase}")]
        public async Task<ActionResult<Purchase>> GetPurchaseByPoPurchase(int po_purchase)
        {
            var purchase = await _context.Purchases.FindAsync(po_purchase);
            if (purchase == null)
            {
                return NotFound();
            }
            return Ok(purchase);
        }
        [HttpPost]
        public async Task<ActionResult<List<Purchase>>> PostPurchase(Purchase purchase)
        {
            _context.Purchases.Add(purchase);
            await _context.SaveChangesAsync();
            return Ok(await _context.Purchases.ToListAsync());
        }
        [HttpPut]
        public async Task<ActionResult<List<Purchase>>> UpdatePurchase(Purchase purchase)
        {
            var dbPurchase = await _context.Purchases.FindAsync(purchase.po_purchase);
            if (dbPurchase == null)
            {
                return BadRequest("purchase not found");
            }
            dbPurchase.status_purchase = purchase.status_purchase;
            dbPurchase.available_purchase = purchase.available_purchase;
            dbPurchase.date_delivery_purchase = purchase.date_delivery_purchase;
           
            await _context.SaveChangesAsync();
            return Ok(await _context.Purchases.ToListAsync());

        }
        [HttpDelete("{po_purchase}")]
        public async Task<ActionResult<List<Purchase>>> DeletePurchase(int po_purchase)
        {

            var dbPurchase = await _context.Purchases.FindAsync(po_purchase);
            if (dbPurchase == null)
            {
                return BadRequest("purchase not found");

            }
            _context.Purchases.Remove(dbPurchase);
            await _context.SaveChangesAsync();
            return Ok(await _context.Purchases.ToListAsync());


        }

    }
}
