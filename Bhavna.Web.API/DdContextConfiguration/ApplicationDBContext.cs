using Bhavna.Web.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Bhavna.Web.API.DdContextConfiguration
{
    public class ApplicationDBContext : DbContext
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

        public DbSet<User> users { get; set; }

        public DbSet<Product> products { get; set; }

        public DbSet<Order> orders { get; set; }

        public DbSet<OrderItem> orderItems { get; set; }
    }
}
