using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace PromoCampaign.Controllers
{
    [Route("api/[controller]")]
    public class CampaignController : Controller
    {

        [HttpGet()]
        public async Task<IActionResult> GetCampaignsByQueryResult()
        {
            return Ok();
        }
    }
}
