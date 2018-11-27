using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace PromoCampaign.Core.Models
{
    public class Product
    {
        public Product()
        {
            Campaigns = new Collection<Campaign>();
            
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<Campaign> Campaigns { get; set; }
    }
}