using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DistributionAPI
{
    public class Purchase
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]

        public int po_purchase { get; set; }
        public string? status_purchase { get; set; } = "returned";
        public bool? available_purchase { get; set; } = true;
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime date_delivery_purchase { get; set; }
        


    }
}
