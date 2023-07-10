
using DistributionAPI.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DistributionAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticleController : ControllerBase
    {
        private readonly DataContext _context;
        public ArticleController(DataContext context) {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<List<Article>>> GetArticles()
        {
            return Ok(await _context.Articles.Include(e => e.Purchase).ToListAsync()); 

        }
        [HttpPost]
        public async Task<ActionResult<List<Article>>> PostArticle(Article article) { 
         var dbPurchase = await _context.Purchases.FindAsync(article.po_purchase);
            if (dbPurchase == null)
            {
                return BadRequest("Invalid purchase ID");
    }

  

article.Purchase = dbPurchase;


_context.Articles.Add(article);
await _context.SaveChangesAsync();

return Ok(await _context.Articles
    .Include(e => e.Purchase)
    
    .ToListAsync());
        }
        [HttpPut]
        public async Task<ActionResult<List<Article>>> UpdateArticle(Article article)
        {
            var dbArticle = await _context.Articles.FindAsync(article.sn_article);
            if (dbArticle == null)
            {
                return BadRequest("Article not found");
            }

            var dbPurchase = await _context.Purchases.FindAsync(article.po_purchase);
            if (dbPurchase == null)
            {
                return BadRequest("Invalid purchase ID");
            }



            dbArticle.price_article = article.price_article;
            dbArticle.description_article= article.description_article;
            dbArticle.type_article= article.type_article;
            dbArticle.name_article= article.name_article;
            dbArticle.available_article= article.available_article;
            dbArticle.Purchase = dbPurchase;
           
           

            await _context.SaveChangesAsync();


            return Ok(await _context.Articles
                 .Include(e => e.Purchase)
                 
                 .ToListAsync());

        }
        [HttpDelete("{sn_article}")]
        public async Task<ActionResult<List<Article>>> DeleteArticle(int sn_article)
        {

            var dbArticle = await _context.Articles.FindAsync(sn_article);
            if (dbArticle == null)
            {
                return BadRequest("article not found");

            }
            _context.Articles.Remove(dbArticle);
            await _context.SaveChangesAsync();
            return Ok(await _context.Articles.Include(e => e.Purchase).ToListAsync());


        }

    }
}
