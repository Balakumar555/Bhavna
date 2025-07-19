using Bhavna.Web.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Bhavna.Web.API.DdContextConfiguration
{
    public class ApplicationDBContext : DbContext
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options)
            : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>(entity =>
            {
                entity.Property(p => p.Price)
                      .HasColumnType("decimal(18,2)");

                entity.Property(p => p.SalePrice)
                      .HasColumnType("decimal(18,2)");

              
            });

            // Other configurations...
        }

        public DbSet<Product> products { get; set; }
    }
}