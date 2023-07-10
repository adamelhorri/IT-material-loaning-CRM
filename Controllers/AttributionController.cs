
using DistributionAPI.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DistributionAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AttributionController : ControllerBase
    {
        private readonly DataContext _context;
        public AttributionController(DataContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<List<Attribution>>> GetAttributions()
        {
            return Ok(await _context.Attributions.Include(e => e.Article)
                .Include(e => e.User).Include(e=>e.Purchase).ToListAsync());

        }
        [HttpPost]
        public async Task<ActionResult<List<Attribution>>> PostAttribution(Attribution attribution)
        {
            if (attribution.sn_article == null && attribution.po_purchase == null)
            {
                return BadRequest("Attribution must have either sn_article or po_purchase as a foreign key.");
            }

            if (attribution.sn_article != null && attribution.po_purchase != null)
            {
                return BadRequest("Attribution cannot have both sn_article and po_purchase as a foreign key.");
            }
            if (attribution.sn_article != null)
            {
                var dbArticle = await _context.Articles.FindAsync(attribution.sn_article);
                if (dbArticle == null)
                {
                    return BadRequest("Invalid article ID");
                }

                attribution.Article = dbArticle;
                attribution.po_purchase = null;
                attribution.Purchase = null;
            }

            if (attribution.po_purchase != null)
            {
                var dbPurchase = await _context.Purchases.FindAsync(attribution.po_purchase);
                if (dbPurchase == null)
                {
                    return BadRequest("Invalid purchase ID");
                }

                attribution.Purchase = dbPurchase;
                attribution.sn_article = null;
                attribution.Article = null;
            }


            var dbUser = await _context.Users.FindAsync(attribution.id_user);
            if (dbUser == null)
            {
                return BadRequest("Invalid user ID");
            }
            attribution.User = dbUser;







            _context.Attributions.Add(attribution);
            await _context.SaveChangesAsync();

            return Ok(await _context.Attributions
                .Include(e => e.Article)
                .Include(e => e.User).Include(e=>e.Purchase)
                .ToListAsync());
        }
        [HttpPut]
        public async Task<ActionResult<List<Attribution>>> UpdateAttribution(Attribution attribution)
        {
            if (attribution.sn_article == null && attribution.po_purchase == null)
            {
                return BadRequest("Either sn_article or po_purchase must be specified.");
            }

            if (attribution.sn_article != null && attribution.po_purchase != null)
            {
                return BadRequest("Cannot specify both sn_article and po_purchase.");
            }

            var dbAttribution = await _context.Attributions.FindAsync(attribution.id_attribution);
            if (dbAttribution == null)
            {
                return BadRequest("Attribution not found");
            }

            if (attribution.sn_article != null)
            {
                var dbArticle = await _context.Articles.FindAsync(attribution.sn_article);
                if (dbArticle == null)
                {
                    return BadRequest("Invalid article ID");
                }
                dbAttribution.Article = dbArticle;
                attribution.po_purchase = null;
                attribution.Purchase = null;
            }
            if (attribution.po_purchase != null)
            {
                var dbPurchase = await _context.Purchases.FindAsync(attribution.po_purchase);
                if (dbPurchase == null)
                {
                    return BadRequest("Invalid purchase ID");
                }
                dbAttribution.Purchase = dbPurchase;
                attribution.sn_article = null;
                attribution.Article = null;
            }

            var dbUser = await _context.Users.FindAsync(attribution.id_user);
            if (dbUser == null)
            {
                return BadRequest("Invalid user ID");
            }
            dbAttribution.User = dbUser;

            dbAttribution.date_attribution = attribution.date_attribution;
            dbAttribution.comment_attribution= attribution.comment_attribution;
            dbAttribution.status_attribution = attribution.status_attribution;

            await _context.SaveChangesAsync();

            return Ok(await _context.Attributions
                .Include(e => e.Article).Include(e => e.Purchase)
                .Include(e => e.User)
                .ToListAsync());

        }
        [HttpDelete("{id_attribution}")]
        public async Task<ActionResult<List<Attribution>>> DeleteAttribution(int id_attribution)
        {

            var dbAttribution = await _context.Attributions.FindAsync(id_attribution);
            if (dbAttribution == null)
            {
                return BadRequest("Attribution not found");
            }

            _context.Attributions.Remove(dbAttribution);
            await _context.SaveChangesAsync();

            return Ok(await _context.Attributions
                .Include(e => e.Article)
                .Include(e => e.User).Include(e=>e.Purchase)
                .ToListAsync());


        }

    }
}
