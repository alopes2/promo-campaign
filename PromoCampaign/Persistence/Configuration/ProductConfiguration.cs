using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PromoCampaign.Persistence.Models;

namespace PromoCampaign.Persistence.Configuration
{
    public class ProductConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder
                .Property(p => p.Name)
                .IsRequired()
                .HasMaxLength(255);
                
            builder
                .ToTable("Products");
        }
    }
}