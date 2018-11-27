namespace PromoCampaign.Core.Extensions
{
    public interface IQueryObject
    {
        string SortBy { get; set; }
        bool Ascending { get; set; }
        int Page { get; set; }
        int PageSize { get; set; }
    }
}