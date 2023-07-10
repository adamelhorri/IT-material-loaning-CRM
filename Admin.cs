using System.ComponentModel.DataAnnotations;

namespace DistributionAPI
{
    public class Admin
    {
        [Key]
        public int id_admin { get; set; }
        public string? username { get; set; }
        public string? password { get; set; }

        public string? title { get; set; }
       
    }
}
