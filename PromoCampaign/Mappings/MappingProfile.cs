using AutoMapper;
using PromoCampaign.Controllers.Resources;
using PromoCampaign.Core.Models;

namespace PromoCampaign.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Domain to API Resource
            CreateMap<Product, ProductResource>(); 
            CreateMap<Campaign, CampaignResource>();

            // API Resource to Domain
            CreateMap<ProductResource, Product>(); 
            CreateMap<CampaignResource, Campaign>();
        } 
    }
}