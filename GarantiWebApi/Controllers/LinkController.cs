using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;

namespace GarantiWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LinkController : ControllerBase
    {
        [HttpPost("create")]
        public IActionResult ActionCreateLink([FromBody] Models.PaymentLink paymentLink)
        {
            var mockDataService = new Services.MockDataService();
            var paymentLinks = mockDataService.GetMockPaymentLinks();

            paymentLink.Id = paymentLinks.Count > 0 ? paymentLinks.Max(pl => pl.Id) + 1 : 1;
            paymentLink.CreatedDate = DateTime.Now;

            // Listeye ekleme metodunu çağırmalısın (Yukarıda servise eklediğimiz metod)
            mockDataService.AddPaymentLink(paymentLink);

            return Ok(paymentLink);
        }

        [HttpGet("list")]
        public IActionResult ActionListLinks()
        {
            var mockDataService = new Services.MockDataService();
            return Ok(mockDataService.GetMockPaymentLinks());
        }
    }
}