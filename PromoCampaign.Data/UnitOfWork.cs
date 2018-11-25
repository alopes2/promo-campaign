using System.Threading.Tasks;
using PromoCampaign.Core.Services;

namespace PromoCampaign.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly PromoCampaignDbContext _context;
        public UnitOfWork(PromoCampaignDbContext _context)
        {
            this._context = _context;

        }
        public async Task CompleteAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}