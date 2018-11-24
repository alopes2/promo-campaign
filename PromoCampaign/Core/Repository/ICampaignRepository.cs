using System.Collections.Generic;
using System.Threading.Tasks;
using PromoCampaign.Persistence.Models;

namespace PromoCampaign.Core.Repository
{
    public interface ICampaignRepository
    {
         Task<IEnumerable<Campaign>> GetRangeAndTotalNumberByQueryObject();
    }
}