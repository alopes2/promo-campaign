using System;

namespace PromoCampaign.Controllers.Resources
{
    public class CampaignResource
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ProductResource Product { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public bool IsActive { get; set; }
    }
}