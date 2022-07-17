using Microsoft.EntityFrameworkCore;using proj.Models;namespace proj.Data{    public class MyContext : DbContext    {        public MyContext(DbContextOptions<MyContext> options) : base(options)        {        }        public DbSet<User> Users { get; set; }        public DbSet<Chat> Messages { get; set; }        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    base.OnModelCreating(modelBuilder);

        //}    }}