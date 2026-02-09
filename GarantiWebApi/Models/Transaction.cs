namespace GarantiWebApi.Models
{
    public class Transaction
    {
        public int Id { get; set; }
        public String Title { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public String Category { get; set; }
        public Boolean IsIncome { get; set; }
    }
}
