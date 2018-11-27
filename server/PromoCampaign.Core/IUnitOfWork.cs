using System.Threading.Tasks;

namespace PromoCampaign.Core.Services
{
    public interface IUnitOfWork
    {
        Task CompleteAsync();
    }
}