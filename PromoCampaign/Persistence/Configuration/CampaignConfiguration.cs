using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PromoCampaign.Persistence.Models;

namespace PromoCampaign.Persistence.Configuration
{
    public class CampaignConfiguration : IEntityTypeConfiguration<Campaign>
    {
        public void Configure(EntityTypeBuilder<Campaign> builder)
        {
            builder
                .Property(c => c.Name)
                .IsRequired()
                .HasMaxLength(255);
            
            builder
                .Property(c => c.ProductId)
                .IsRequired();

            builder
                .Property(c => c.Start)
                .IsRequired();
            
            builder
                .Property(c => c.End);
            
            builder
                .Property(c => c.IsActive)
                .HasDefaultValue(true);

            builder
                .HasOne(c => c.Product)
                .WithMany(p => p.Campaigns);

            builder
                .ToTable("Campaigns");
        }
    }
}