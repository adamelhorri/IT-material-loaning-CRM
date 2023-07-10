using System.ComponentModel;
using System.Data;

using Microsoft.EntityFrameworkCore;
namespace DistributionAPI.Data

{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) :base(options) {
        }
        public DbSet<Article> Articles =>Set<Article>();
        public DbSet<User> Users => Set<User>();
        public DbSet<Attribution> Attributions =>Set<Attribution>();
        public DbSet<Purchase> Purchases => Set<Purchase>();
        public DbSet<Admin> Admins => Set<Admin>();


        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Article>().ToTable("article");
            builder.Entity<User>().ToTable("teuser");
            builder.Entity<Attribution>().ToTable("attribution");
            builder.Entity<Purchase>().ToTable("purchase");
            builder.Entity<Admin>().ToTable("admin");
        }
    }
}
