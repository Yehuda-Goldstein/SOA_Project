using proj.Data;
using proj.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace proj.Services
{
    public class Service : IService
    {
        private readonly MyContext _myContext;
        public Service(MyContext myContext)
        {
            _myContext = myContext;
        }
        public User CreateUser(User user)
        {
            var existingUser = _myContext.Users.FirstOrDefault(u => u.Name == user.Name);
            if (existingUser == null)
            {
                var tmp = _myContext.Users.Add(user);
                _myContext.SaveChanges();
            }
            else { return existingUser; }
            return _myContext.Users.SingleOrDefault(u => u.Name == user.Name);
        }

        public List<Chat> GetAllMessages()
        {
            return _myContext.Messages.ToList();
        }

        public List<User> GetAllUsers()
        {
            return _myContext.Users.ToList();
        }
        public void SendMessage(Chat chat)
        {
            _myContext.Messages.Add(chat);
            _myContext.SaveChanges();
        }
    }
}
