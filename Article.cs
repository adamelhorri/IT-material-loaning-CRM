using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DistributionAPI
{
    public class Article
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int sn_article { get; set; }
        public string? name_article { get;set; }
        public string? description_article { get; set; }
        public int price_article { get; set; }

        public bool? available_article { get; set; } = true;


        public string? type_article { get; set; }
        [ForeignKey("Purchase")]
        public int po_purchase { get; set; }
        public Purchase Purchase { get; set; }
        

    }
}
