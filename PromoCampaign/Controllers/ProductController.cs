using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace PromoCampaign.Controllers
{
    [Route("api/[controller]")]
    public class ProductController : Controller
    {
        private readonly IMapper _mapper;
        public ProductController(IMapper mapper)
        {
            this._mapper = mapper;
        }

        public Task<IActionResult> GetProducts() 
        {
            return Ok();
        }
    }
}