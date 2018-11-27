using System;

namespace PromoCampaign.Controllers.Resources
{
    public class SaveCampaignResource
    {
        public string Name { get; set; }
        public int ProductId { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
    }
}