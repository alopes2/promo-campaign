using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using PromoCampaign.Controllers.Resources;
using PromoCampaign.Core.Models;
using PromoCampaign.Core.Services;

namespace PromoCampaign.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IProductService service;
        public ProductsController(IMapper mapper, IProductService service)
        {
            this.service = service;
            this._mapper = mapper;

        }

        public async Task<IActionResult> GetProductsAsync()
        {
            var products = await this.service
                .GetAllProductsAsync();
            
            var productsResources = _mapper
                        .Map<IEnumerable<Product>, IEnumerable<ProductResource>>(products);
                        
            return Ok(productsResources);
        }
    }
}