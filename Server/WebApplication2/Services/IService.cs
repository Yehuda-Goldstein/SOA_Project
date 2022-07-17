using proj.Models;
using System.Collections.Generic;

namespace proj.Services
{
    public interface IService
    {
        List<User> GetAllUsers();
        User CreateUser(User user);
        void SendMessage(Chat chat);
        List<Chat> GetAllMessages();
    }
}
