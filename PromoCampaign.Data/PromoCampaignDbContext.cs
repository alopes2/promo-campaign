using Microsoft.EntityFrameworkCore;
using PromoCampaign.Core.Models;
using PromoCampaign.Data.Configuration;

namespace PromoCampaign.Data
{
    public class PromoCampaignDbContext : DbContext
    {
        public DbSet<Product> Products { get; set; }
        public DbSet<Campaign> Campaigns { get; set; }

        public PromoCampaignDbContext(DbContextOptions<PromoCampaignDbContext> options)
            :base(options)
        {    
        }

        protected override void OnModelCreating(ModelBuilder builder) 
        {
            builder
                .ApplyConfiguration(new ProductConfiguration());
            builder
                .ApplyConfiguration(new CampaignConfiguration());
        }
    }
}