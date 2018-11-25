using System.Collections.Generic;
using System.Threading.Tasks;
using PromoCampaign.Core.Models;
using PromoCampaign.Core.Repository;
using PromoCampaign.Core.Services;

namespace PromoCampaign.Core.Services
{
    public class CampaignService : ICampaignService
    {
        private readonly ICampaignRepository _repository;
        public CampaignService(ICampaignRepository _repository)
        {
            this._repository = _repository;

        }
        public async Task<IEnumerable<Campaign>> GetCampaignsAndCountByQueryResultAsync()
        {
            return await _repository
                .GetRangeAndTotalNumberByQueryObject();
        }
    }
}