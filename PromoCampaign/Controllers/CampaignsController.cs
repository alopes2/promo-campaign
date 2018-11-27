using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using PromoCampaign.Controllers.Resources;
using PromoCampaign.Core;
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
        public async Task<IActionResult> GetCampaignsByQueryResult(CampaignQuery queryParams)
        {
            var campaigns = await service.GetCampaignsAndCountByQueryResultAsync(queryParams);
            var campaignsResources = _mapper
                .Map<QueryResult<Campaign>, QueryResult<CampaignResource>>(campaigns);

            return Ok(campaignsResources);
        }

        [HttpPost()]
        public async Task<IActionResult> AddNewCampaign([FromBody] SaveCampaignResource newCampaignResource) 
        {
            // Basic validations
            if (!ModelState.IsValid) {
                return BadRequest("Please, check your properties' values");
            }

            if (String.IsNullOrWhiteSpace(newCampaignResource.Name)) {
                return BadRequest("Please, add a name to your campaign");
            }

            var productWasntSelected = newCampaignResource.ProductId == 0;
            if (productWasntSelected) {
                return BadRequest("Please, select a product");
            }

            var startDateIsBeforeToday = newCampaignResource.Start.CompareTo(DateTime.Now) <= 0;
            if (startDateIsBeforeToday) {
                return BadRequest("The start date needs to be later than today");
            }
            
            var endDateIsBeforeStartDate = newCampaignResource.Start.CompareTo(newCampaignResource.End) > 0;
            if (endDateIsBeforeStartDate) {
                return BadRequest("The start date needs to be later than the end date");
            }

            var newCampaign = _mapper.Map<SaveCampaignResource, Campaign>(newCampaignResource);

            var campaign =  await service.AddCampaignAsync(newCampaign);
            var campaignResource = _mapper.Map<Campaign, CampaignResource>(campaign);
            return Ok(campaignResource);
        }
    }
}
