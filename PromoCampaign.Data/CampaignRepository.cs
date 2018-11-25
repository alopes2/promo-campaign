using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PromoCampaign.Core.Models;
using PromoCampaign.Core.Repository;

namespace PromoCampaign.Data
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
        public async Task AddAsync(Campaign newCampaign)
        {
            await _context
                .Campaigns
                .AddAsync(newCampaign);
        }
    }
}