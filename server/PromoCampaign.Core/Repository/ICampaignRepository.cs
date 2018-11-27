using System.Collections.Generic;
using System.Threading.Tasks;
using PromoCampaign.Core.Models;

namespace PromoCampaign.Core.Repository
{
    public interface ICampaignRepository
    {
        Task<QueryResult<Campaign>> GetRangeAndTotalNumberByQueryObject(CampaignQuery queryObj);
        Task AddAsync(Campaign newCampaign);
    }
}