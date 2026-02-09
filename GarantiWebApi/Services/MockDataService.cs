namespace GarantiWebApi.Services
{
    public class MockDataService
    {
        // Listeler static olmalı ki her request'te sıfırlanmasın!
        private static List<Models.Transaction> _transactions = new List<Models.Transaction>
        {
             new Models.Transaction { Id = 1, Title = "Doğrular Nakliyat Web Ödemesi", Amount = 15000, Date = DateTime.Now.AddDays(-2), Category = "Gelir", IsIncome = true },
             new Models.Transaction { Id = 2, Title = "AWS Sunucu Gideri", Amount = 450, Date = DateTime.Now.AddDays(-5), Category = "Gider", IsIncome = false },
             new Models.Transaction { Id = 3, Title = "Market Alışverişi", Amount = 350, Date = DateTime.Now.AddDays(-1), Category = "Gider", IsIncome = false },
             new Models.Transaction { Id = 4, Title = "Logo Tasarım Ödemesi", Amount = 2500, Date = DateTime.Now.AddDays(-10), Category = "Gelir", IsIncome = true }
        };

        private static List<Models.PaymentLink> _paymentLinks = new List<Models.PaymentLink>
        {
             new Models.PaymentLink { Id = 1, ClientName = "Ahmet Yılmaz", ProjectDescription = "E-Ticaret Sitesi", Amount = 20000, Status = true, CreatedDate = DateTime.Now.AddDays(-7) },
             new Models.PaymentLink { Id = 2, ClientName = "Mehmet Demir", ProjectDescription = "Mobil Uygulama Arayüzü", Amount = 8000, Status = false, CreatedDate = DateTime.Now.AddDays(-1) }
        };

        public List<Models.Transaction> GetMockTransactions()
        {
            return _transactions;
        }

        public List<Models.PaymentLink> GetMockPaymentLinks()
        {
            return _paymentLinks;
        }

        // Yeni link eklemek için bir metod lazım
        public void AddPaymentLink(Models.PaymentLink link)
        {
            _paymentLinks.Add(link);
        }
    }
}