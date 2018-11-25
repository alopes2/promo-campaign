using System.Collections.Generic;
using System.Threading.Tasks;
using PromoCampaign.Core.Models;
using PromoCampaign.Core.Repository;

namespace PromoCampaign.Core.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _repository;
        public ProductService(IProductRepository _repository)
        {
            this._repository = _repository;

        }
        public async Task<IEnumerable<Product>> GetAllProductsAsync()
        {
            return await _repository
                .GetAll();
        }
    }
}