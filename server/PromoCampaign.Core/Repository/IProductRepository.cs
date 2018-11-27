using System.Collections.Generic;
using System.Threading.Tasks;
using PromoCampaign.Core.Models;

namespace PromoCampaign.Core.Repository
{
    public interface IProductRepository
    {
        Task<IEnumerable<Product>> GetAll();
    }
}