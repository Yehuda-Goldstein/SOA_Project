using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using proj.HubConfig;
using proj.Models;
using proj.Services;
using System.Collections.Generic;
//using updated_proj.Models;

namespace proj.Controllers
{
    [ApiController]
    [Route("controller")]
    public class HomeController : Controller
    {
        private readonly IService _service;
        private readonly IHubContext<ChartHub> _hub;

        public HomeController(IService service, IHubContext<ChartHub> hub)
        {
            _service = service;
            _hub = hub;
        }
        [HttpGet("getMsg")]
        public List<Chat> ShowallMessage()
        {
            return _service.GetAllMessages();
        }
        [HttpPost("user")]
        public User CreateUser(User user)
        {
          return _service.CreateUser(user);
        }
        [HttpPost("sendMsg")]
        public void SendMessage(Chat chat)
        {
            _service.SendMessage(chat);
        }

    }
}
