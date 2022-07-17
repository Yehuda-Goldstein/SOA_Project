using System;

namespace proj.Models
{
    public class Message
    {
        public string Clientuniqueid { get; set; }
        //public int MessageId { get; set; }
        //public int ChatId { get; set; }
        //public virtual Chat Chat {get;set;}
        public string To { get; set; }
        public string From { get; set; }
        public string Type { get; set; }
        public string Content { get; set; }
        public DateTime Date { get; set; }

        //ליצור קונסטרקטור שמקבל מסאג פרום קליאנט
    }
}
