using System.ComponentModel.DataAnnotations;

namespace Bhavna.Web.API.Models
{
    public class OrderItem
    {
        [Key]
        public long Id { get; set; }
        public long? OrderId { get; set; }
        public long? ProductId { get; set; }
        public string? ProductName { get; set; }
        public string? ProductSku { get; set; }
        public decimal? UnitPrice { get; set; }
        public decimal? DiscountedPrice { get; set; }
        public int? Quantity { get; set; }
        public decimal? TotalPrice { get; set; }
        public string? VariantInfo { get; set; }
    }
}
