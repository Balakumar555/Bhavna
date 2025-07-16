using System.ComponentModel.DataAnnotations;

namespace Bhavna.Web.API.Models
{
    public class Product
    {
        [Key]
        public long Id { get; set; }

        public string? Name { get; set; }

        public string? Description { get; set; }

        public decimal? Price { get; set; }

        public decimal? SalePrice { get; set; }

        public int? StockQuantity { get; set; }

        public string? Category { get; set; }

        public string? Brand { get; set; }

        public decimal? Weight { get; set; }

        public string? Rating { get; set; }
    }
}
