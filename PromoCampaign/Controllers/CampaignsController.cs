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
    }
}
