using System.ComponentModel.DataAnnotations;

namespace Bhavna.Web.API.Models
{
    public class Order
    {
        [Key]
        public long Id { get; set; }
        public string? OrderNumber { get; set; }
        public string? ReferenceCode { get; set; }
        public string? Notes { get; set; }
        public decimal? TotalAmount { get; set; }
        public decimal? TaxAmount { get; set; }
        public decimal? ShippingAmount { get; set; }
        public decimal? DiscountAmount { get; set; }
        public decimal? GrandTotal { get; set; }
        public int? TotalItems { get; set; }
        public string? Status { get; set; }
        public long? CustomerId { get; set; }
        public string? CustomerEmail { get; set; }
        public string? CustomerPhone { get; set; }
        public string? ShippingAddress { get; set; }
        public string? BillingAddress { get; set; }
        public string? PaymentMethod { get; set; }
        public string? PaymentStatus { get; set; }
        public DateTime? PaymentDate { get; set; }
        public DateTime? OrderDate { get; set; }
        public DateTime? ProcessingDate { get; set; }
        public DateTime? ShippingDate { get; set; }
        public DateTime? DeliveryDate { get; set; }
        public string? ShippingMethod { get; set; }
        public string? TrackingNumber { get; set; }
        public string? Carrier { get; set; }
    }
}
