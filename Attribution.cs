using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DistributionAPI
{
    public class Attribution
    {
        [Key]
        public int id_attribution { get; set; }

        [ForeignKey ("Article")]
        public int? sn_article { get; set; }
        public virtual Article? Article { get; set; }
     
        [ForeignKey("User")]
        public int id_user { get; set; }
        public User User { get; set; }
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]

        [ForeignKey("Purchase")]
        public int? po_purchase { get; set; }
        public virtual Purchase? Purchase { get; set; }
        public string? comment_attribution { get; set; }
        public string? status_attribution { get; set; }
        public DateTime date_attribution { get; set; }
        //old  idarticle , iduser ,attributiondate
        public bool ShouldSerializesn_article()
        {
            return sn_article.HasValue;
        }

        public bool ShouldSerializepo_purchase()
        {
            return po_purchase.HasValue;
        }




    }
}
