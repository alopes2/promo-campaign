using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PromoCampaign.Core.Repository;
using PromoCampaign.Persistence.Models;

namespace PromoCampaign.Persistence
{
    public class CampaignRepository : ICampaignRepository
    {
        private readonly PromoCampaignDbContext _context;
        public CampaignRepository(PromoCampaignDbContext _context)
        {
            this._context = _context;

        }
        public async Task<IEnumerable<Campaign>> GetRangeAndTotalNumberByQueryObject()
        {
            return await _context
                .Campaigns
                .ToListAsync();
        }
    }
}