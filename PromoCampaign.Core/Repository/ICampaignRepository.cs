using System.Collections.Generic;
using System.Threading.Tasks;
using PromoCampaign.Core.Models;

namespace PromoCampaign.Core.Repository
{
    public interface ICampaignRepository
    {
        Task<IEnumerable<Campaign>> GetRangeAndTotalNumberByQueryObject();
        Task AddAsync(Campaign newCampaign);
    }
}