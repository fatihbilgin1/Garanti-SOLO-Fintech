namespace GarantiWebApi.Models
{
    public class AccountSummary
    {
        public decimal TotalIncome { get; set; }         // Toplam gelir
        public decimal TotalExpense { get; set; }        // Toplam gider
        public decimal NetBalance { get; set; }          // Net bakiye (gelir - gider)
    }
}
