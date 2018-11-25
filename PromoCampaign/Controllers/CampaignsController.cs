using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using PromoCampaign.Controllers.Resources;
using PromoCampaign.Core.Models;
using PromoCampaign.Core.Services;

namespace PromoCampaign.Controllers
{
    [Route("api/[controller]")]
    public class CampaignsController : Controller
    {
        private readonly ICampaignService service;
        private readonly IMapper _mapper;
        public CampaignsController(IMapper _mapper, ICampaignService service)
        {
            this._mapper = _mapper;
            this.service = service;

        }
        [HttpGet()]
        public async Task<IActionResult> GetCampaignsByQueryResult()
        {
            var campaigns = await service.GetCampaignsAndCountByQueryResultAsync();
            var campaignsResources = _mapper
                .Map<IEnumerable<Campaign>, IEnumerable<CampaignResource>>(campaigns);

            return Ok(campaignsResources);
        }

        [HttpPost()]
        public async Task<IActionResult> AddNewCampaign([FromBody] CampaignResource newCampaignResource) 
        {
            if (!ModelState.IsValid) {
                return BadRequest("Please, check your properties' values");
            }

            if (newCampaignResource.Product == null || newCampaignResource.Product.Id == null) {
                return BadRequest("Please, select a product");
            }

            if (newCampaignResource.Start.CompareTo(DateTime.Now) <= 0) {
                return BadRequest("The start date needs to be later than today");
            }

            if (newCampaignResource.Start.CompareTo(newCampaignResource.End) <= 0) {
                return BadRequest("The start date needs to be later than the end date");
            }
            var newCampaign = _mapper.Map<CampaignResource, Campaign>(newCampaignResource);

            var campaign =  await service.AddCampaignAsync(newCampaign);
            var campaignResource = _mapper.Map<Campaign, CampaignResource>(campaign);
            return Ok(campaignResource);
        }
    }
}
