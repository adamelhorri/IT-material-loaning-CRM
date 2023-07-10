using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DistributionAPI
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]

        public int id_user { get; set; }
        public string? name_user { get; set; }
        public string? fname_user { get; set; }
        public string? title_user { get; set; }
        public string? location_user { get; set; }
        public string? email_user { get; set; }
        public string? departement_user { get; set; }
        

    }
}