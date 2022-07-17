using Microsoft.AspNetCore.SignalR;
using proj.Models;
using proj.Services;
using System;
using System.Threading.Tasks;
//using WebApplication2.Models;

namespace proj.HubConfig
{
    public class ChartHub : Hub
    {
        readonly UserConnectedService _service;
        

        public ChartHub(UserConnectedService service)
        {
            _service = service;
        }
        public async Task Login(User user)
        {
            _service.UserConnected(user, Context.ConnectionId);
            await Clients.AllExcept(Context.ConnectionId).SendAsync("logInUser", user);
            
        }
        public async Task ShowUsers()
        {
            var prevUsers = _service.GetAllUsers();
            await Clients.Caller.SendAsync("getAllUsers", prevUsers);
        }
        public async Task SendMessage(Message msg, User user)
        {           
            var id = Context.ConnectionId;
            msg.From = _service.FindUserName(id, out _);
            if (_service.FindUser(user, out string connectionId))
                await Clients.Client(connectionId).SendAsync("MessageReceived", msg);
        }
        public override async Task OnDisconnectedAsync(Exception exception)
        {
            var user =_service.FindUserById(Context.ConnectionId);
            _service.UserDisconnected(Context.ConnectionId);
            await Clients.AllExcept(Context.ConnectionId).SendAsync("disconnect", user);
            await base.OnDisconnectedAsync(exception);
        }
    }
}
