using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace proj.Models
{
    public class Chat
    {
        [Key]
        public int Id { get; set; }
        public string Sender { get;  set; }
        public string Reciver { get;  set; }
        public string Message { get;  set; }
    }
}
