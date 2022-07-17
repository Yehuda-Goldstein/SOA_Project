using proj.Models;
using System.Collections.Generic;
using System.Linq;

namespace proj.Services
{
    public class UserConnectedService
    {
        private readonly List<HubUser> _connectedUsers = new();
        private readonly List<HubUser> _disConnectedUsers = new();
        public HubUser[] ConnectedUsers { get => _connectedUsers.ToArray(); }
        public void UserConnected(User user, string connectionId)
        {
            _connectedUsers.Add(new HubUser { User = user, ConnectionId = connectionId });
            var disconnected = _disConnectedUsers.SingleOrDefault(u => u.User.Name == user.Name);
            if (disconnected != null)
                _disConnectedUsers.Remove(disconnected);
        }
        public void UserDisconnected(string connectionId)
        {
            var toDisconnect = _connectedUsers.SingleOrDefault(u => u.ConnectionId == connectionId);
            _disConnectedUsers.Add(toDisconnect);
            _connectedUsers.Remove(toDisconnect);
        }

        public List<User> GetAllUsers()
        {
            List<User> users = new();
            foreach (var user in _connectedUsers)
            {
                user.User.IsActive = true;
                users.Add(user.User);
            }
            foreach (var user in _disConnectedUsers)
            {
                user.User.IsActive = false;
                users.Add(user.User);
            }
            return users;
        }

        public bool FindUser(User user, out string connectionId)
        {
            connectionId = "";
            var to = _connectedUsers.SingleOrDefault(u => u.User.Id == user.Id);
            if (to != null) connectionId = to.ConnectionId;
            return to != null;
        }

        public User FindUserById(string connectionId)
        {
            return _connectedUsers.SingleOrDefault(u => u.ConnectionId == connectionId).User;
        }

        public string FindUserName(string userId, out string userName)
        {
            userName = "";
            var from = _connectedUsers.SingleOrDefault(u => u.ConnectionId == userId).User.Name;
            if (from != null) userName = from;
            return userName;
        }
    }
    public class HubUser
    {
        public User User { get; set; }
        public string ConnectionId { get; set; }
    }
}
