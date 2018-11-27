using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PromoCampaign.Core.Models;
using PromoCampaign.Core.Repository;

namespace PromoCampaign.Data
{
    public class ProductRepository : IProductRepository
    {
        private readonly PromoCampaignDbContext _context;
        public ProductRepository(PromoCampaignDbContext _context)
        {
            this._context = _context;

        }
        public async Task<IEnumerable<Product>> GetAll()
        {
            return await _context
                .Products
                .ToListAsync();
        }
    }
}