namespace GarantiWebApi.Models
{
    public class PaymentLink
    {
        public int Id { get; set; }
        public String ClientName { get; set; }
        public String ProjectDescription { get; set; }
        public decimal Amount { get; set; }
        public Boolean Status { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
