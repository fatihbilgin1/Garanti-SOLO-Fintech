using Microsoft.AspNetCore.Mvc;
using GarantiWebApi.Models; // Modelleri görsün
using System.Linq; // LINQ için gerekli

namespace GarantiWebApi.Controllers
{
    [Route("api/[controller]")] // Rota standartlaşsın
    [ApiController] // Bunu eklemezsen Swagger çalışmaz
    public class DashboardController : ControllerBase // Miras almalı!
    {
        [HttpGet("summary")] // api/dashboard/summary olur
        public IActionResult ActionSummary()
        {
            var mockDataService = new Services.MockDataService();
            var transactions = mockDataService.GetMockTransactions();

            decimal totalIncome = transactions.Where(t => t.IsIncome).Sum(t => t.Amount);
            decimal totalExpense = transactions.Where(t => !t.IsIncome).Sum(t => t.Amount);
            decimal netBalance = totalIncome - totalExpense;

            // Vergi  Hesaplaması 
            decimal taxReserved = totalIncome * 0.20m; 

            var summary = new AccountSummary
            {
                TotalIncome = totalIncome,
                TotalExpense = totalExpense,
                NetBalance = netBalance
            };

            return Ok(summary); // 200 OK ile birlikte summary nesnesini döndürür
        }

        [HttpGet("transactions")] 
        public IActionResult ActionTransactions()
        {
            var mockDataService = new Services.MockDataService();
            return Ok(mockDataService.GetMockTransactions());
        }
    }
}