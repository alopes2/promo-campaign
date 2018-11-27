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
        private readonly IUnitOfWork _unitOfWork;
        public CampaignService(ICampaignRepository _repository, IUnitOfWork _unitOfWork)
        {
            this._unitOfWork = _unitOfWork;
            this._repository = _repository;

        }

        public async Task<Campaign> AddCampaignAsync(Campaign newCampaign)
        {
            await _repository
                .AddAsync(newCampaign);
            
            await _unitOfWork.CompleteAsync();

            return newCampaign;
        }

        public async Task<QueryResult<Campaign>> GetCampaignsAndCountByFilterQueryAsync(CampaignQuery query)
        {
            return await _repository
                .GetRangeAndTotalNumberByQueryObject(query);
        }
    }
}