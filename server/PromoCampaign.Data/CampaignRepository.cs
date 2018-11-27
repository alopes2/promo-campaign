using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PromoCampaign.Core;
using PromoCampaign.Core.Extensions;
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
        public async Task<QueryResult<Campaign>> GetRangeAndTotalNumberByQueryObject(CampaignQuery queryObj)
        {
            var queryResult = new QueryResult<Campaign>();
            var query = _context
                .Campaigns
                .Include(c => c.Product)
                .AsQueryable();
            
            var columnMaps = new Dictionary<string, Expression<Func<Campaign, object>>>()
            {
                ["name"] = c => c.Name,
                ["productName"] = c => c.Product.Name,
                ["start"] = c => c.Start,
                ["end"] = c => c.End
            };
            
            query = query.ApplyFiltering(queryObj);

            query = query.ApplyOrdering<Campaign>(queryObj, columnMaps);
            
            queryResult.TotalItems = await query.CountAsync();

            query = query.ApplyPaging(queryObj);

            queryResult.Items = await query.ToListAsync();

            return queryResult;
        }
        public async Task AddAsync(Campaign newCampaign)
        {
            await _context
                .Campaigns
                .AddAsync(newCampaign);
        }
    }
}