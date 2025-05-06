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
        public DbSet<RoomDesign> RoomDesigns { get; set; }
        public DbSet<Furniture> Furnitures { get; set; }

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

                // One-to-many: User → RoomDesigns
                entity.HasMany(u => u.RoomDesigns)
                      .WithOne(r => r.User)
                      .HasForeignKey(r => r.UserId)
                      .OnDelete(DeleteBehavior.Cascade);


            });

            modelBuilder.Entity<RoomDesign>(entity =>
            {
                entity.HasKey(r => r.RoomId);

                entity.Property(r => r.RoomSize).IsRequired();
                entity.Property(r => r.WallHeight).IsRequired();
                entity.Property(r => r.WallThickness).IsRequired();
                entity.Property(r => r.WallColor).HasMaxLength(100);
                entity.Property(r => r.WallTexture).HasMaxLength(100);
                entity.Property(r => r.FloorTexture).HasMaxLength(100);
                entity.Property(r => r.ViewMode).HasMaxLength(10).HasDefaultValue("3D");

              
                entity.HasMany(r => r.Furnitures)
                      .WithOne(f => f.RoomDesign)
                      .HasForeignKey(f => f.RoomId)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            // Furniture Entity
            modelBuilder.Entity<Furniture>(entity =>
            {
                entity.HasKey(f => f.FurnitureId);

                entity.Property(f => f.RoomId)
                      .IsRequired(); // Foreign key

                entity.Property(f => f.Type)
                      .HasMaxLength(100)
                      .IsRequired(false);

                entity.Property(f => f.PositionX)
                      .IsRequired();

                entity.Property(f => f.PositionY)
                      .IsRequired();

                entity.Property(f => f.PositionZ)
                      .IsRequired();

                entity.Property(f => f.Color)
                      .HasMaxLength(50)
                      .IsRequired(false);

                entity.Property(f => f.SizeWidth)
                      .IsRequired(false); // Nullable float

                entity.Property(f => f.SizeHeight)
                      .IsRequired(false);

                entity.Property(f => f.SizeLength)
                      .IsRequired(false);

                entity.Property(f => f.Shade)
                      .HasMaxLength(50)
                      .IsRequired(false);

                entity.Property(f => f.Shadow)
                      .IsRequired();

                // Relationship with RoomDesign (many-to-one)
                entity.HasOne(f => f.RoomDesign)
                      .WithMany(r => r.Furnitures)
                      .HasForeignKey(f => f.RoomId)
                      .OnDelete(DeleteBehavior.Cascade);
            });


        }
    }
}
