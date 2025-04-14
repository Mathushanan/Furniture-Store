using backend.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Collections.Specialized.BitVector32;

namespace backend.Data
{
    public class SystemDbContext : DbContext
    {
        public SystemDbContext(DbContextOptions<SystemDbContext> options) : base(options)
        {

        }


        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {


            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(u => u.UserId);

                entity.Property(u => u.UserType)
                    .HasMaxLength(50)
                    .IsRequired(true);

                entity.Property(u => u.FirstName)
                    .HasMaxLength(100)
                    .IsRequired(false);

                entity.Property(u => u.LastName)
                    .HasMaxLength(100)
                    .IsRequired(true);

                entity.Property(u => u.Gender)
                    .HasMaxLength(20)
                    .IsRequired(true);

                entity.Property(u => u.Email)
                    .HasMaxLength(100)
                    .IsRequired(true);

                entity.Property(u => u.ContactNumber)
                    .HasMaxLength(20)
                    .IsRequired(true);

                entity.Property(u => u.PasswordHash)
                    .HasMaxLength(200)
                    .IsRequired(true);

             
            });

        }
    }
}
