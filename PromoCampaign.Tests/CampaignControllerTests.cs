using System;
using Xunit;
using Moq;
using PromoCampaign.Controllers;
using PromoCampaign.Core.Services;
using AutoMapper;
using System.Threading.Tasks;
using PromoCampaign.Controllers.Resources;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using PromoCampaign.Core.Models;

namespace PromoCampaign.Tests
{
    public class CampaignControllerTests
    {
        private Mock<ICampaignService> service;
        private Mock<IMapper> mapper ;

        private CampaignsController controller;
        
        public CampaignControllerTests()
        {
            service = new Mock<ICampaignService>();
            mapper = new Mock<IMapper>();
            controller = new CampaignsController(mapper.Object, service.Object);
        }

        [Fact]
        public async Task When_AddNewCampaign_ItShouldReturnBadRequestWhenTheresNoName()
        {
             var param = new SaveCampaignResource() {
                Name = "",
                Start = DateTime.Now,
                End = DateTime.Now,
                ProductId = 0
            };
            
            var response = await controller.AddNewCampaign(param);

            var result = response as ObjectResult;

            Assert.NotNull(result.StatusCode);
            Assert.Equal(result.StatusCode, (int)HttpStatusCode.BadRequest);
            
        }
        
        [Fact]
        public async Task When_AddNewCampaign_ItShouldReturnBadRequestTheresNoProduct()
        {
             var param = new SaveCampaignResource() {
                Name = "Test",
                Start = DateTime.Now,
                End = DateTime.Now,
                ProductId = 0
            };
            
            var response = await controller.AddNewCampaign(param);

            var result = response as ObjectResult;
            
            Assert.NotNull(result.StatusCode);
            Assert.Equal(result.StatusCode, (int)HttpStatusCode.BadRequest);
            
        }
        
        [Fact]
        public async Task When_AddNewCampaign_ItShouldReturnBadRequestStartDateIsBeforeToday()
        {
            var startDate = DateTime.Now.AddDays(-1);


            var param = new SaveCampaignResource() {
                Name = "Test",
                Start = startDate,
                End = DateTime.Now,
                ProductId = 1
            };
            
            var response = await controller.AddNewCampaign(param);

            var result = response as ObjectResult;
            
            Assert.NotNull(result.StatusCode);
            Assert.Equal(result.StatusCode, (int)HttpStatusCode.BadRequest);
            
        }
        
        [Fact]
        public async Task When_AddNewCampaign_ItShouldReturnBadRequestEndDateIsBeforeStartDate()
        {
            var startDate = DateTime.Now;
            var endDate = startDate.AddDays(-1);

            var param = new SaveCampaignResource() {
                Name = "Test",
                Start = startDate,
                End = endDate,
                ProductId = 1
            };
            
            var response = await controller.AddNewCampaign(param);

            var result = response as ObjectResult;
            
            Assert.NotNull(result.StatusCode);
            Assert.Equal(result.StatusCode, (int)HttpStatusCode.BadRequest);
            
        }
        
        [Fact]
        public async Task When_AddNewCampaign_ItShouldReturnOkWhenRightParamsAreProvided()
        {
            // setup variables
            var startDate = DateTime.Now.AddDays(1);
            var endDate = startDate.AddDays(2);

            var param = new SaveCampaignResource() {
                Name = "Test",
                Start = startDate,
                End = endDate,
                ProductId = 1
            };
            var newCampaign = new Campaign() {
                Id = 1,
                Name = param.Name,
                Start = param.Start,
                End = param.End,
                ProductId = param.ProductId
            };
            var newCampaignResource = new CampaignResource() {
                Id = newCampaign.Id,
                Name = param.Name,
                Start = param.Start,
                End = param.End,
                Product = new ProductResource() {
                    Id = param.ProductId
                }
            };

            // mock services behaviors
            service.Setup(_ => _.AddCampaignAsync(newCampaign)).ReturnsAsync(newCampaign);

            mapper.Setup(_ => _.Map<SaveCampaignResource, Campaign>(param)).Returns(newCampaign);
            mapper.Setup(_ => _.Map<Campaign, CampaignResource>(newCampaign)).Returns(newCampaignResource);

            var response = await controller.AddNewCampaign(param);

            var result = response as ObjectResult;
            
            Assert.NotNull(result.StatusCode);
            Assert.Equal(result.StatusCode, (int)HttpStatusCode.OK);
            Assert.Equal(newCampaignResource.Id, newCampaign.Id);
        }
    }
}
