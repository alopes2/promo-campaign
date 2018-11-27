using PromoCampaign.Core.Extensions;

namespace PromoCampaign.Core
{
    public class CampaignQuery : IQueryObject
    {
        public bool? IsActive { get; set; }
        public string SortBy { get; set; }
        public bool Ascending { get; set; }
        public int Page { get; set; }
        public int PageSize { get; set; }
    }
}