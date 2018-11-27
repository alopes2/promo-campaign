using System.Collections.Generic;
using System.Threading.Tasks;
using PromoCampaign.Core.Models;

namespace PromoCampaign.Core.Services
{
    public interface ICampaignService
    {
         Task<QueryResult<Campaign>> GetCampaignsAndCountByQueryResultAsync(CampaignQuery query);
         Task<Campaign> AddCampaignAsync(Campaign newCampaign);
    }
}