using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace CrudOperationsWithReactJs.Models
{
    public partial class MarsOnboardingContext : DbContext
    {
        public MarsOnboardingContext()
        {
        }

        public MarsOnboardingContext(DbContextOptions<MarsOnboardingContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Customer> Customer { get; set; }
        public virtual DbSet<Product> Product { get; set; }
        public virtual DbSet<ProductSold> ProductSold { get; set; }
        public virtual DbSet<Store> Store { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Data Source=DESKTOP-LJOOHE3\\SQLEXPRESS;Initial Catalog=MarsOnboarding;Integrated Security=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Customer>(entity =>
            {
                entity.Property(e => e.CustomerId)
                    .HasMaxLength(50)
                    .ValueGeneratedNever();

                entity.Property(e => e.Address).IsRequired();

                entity.Property(e => e.Name).IsRequired();
            });

            modelBuilder.Entity<Product>(entity =>
            {
                entity.Property(e => e.ProductId)
                    .HasMaxLength(50)
                    .ValueGeneratedNever();

                entity.Property(e => e.Name).IsRequired();

                entity.Property(e => e.Price).HasColumnType("money");
            });

            modelBuilder.Entity<ProductSold>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasMaxLength(50)
                    .ValueGeneratedNever();

                entity.Property(e => e.CustomerId)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.DateSold).HasColumnType("datetime");

                entity.Property(e => e.ProductId)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.StoreId)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.ProductSold)
                    .HasForeignKey(d => d.CustomerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ProductSold_Customer");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.ProductSold)
                    .HasForeignKey(d => d.ProductId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ProductSold_Product");

                entity.HasOne(d => d.Store)
                    .WithMany(p => p.ProductSold)
                    .HasForeignKey(d => d.StoreId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ProductSold_Store");
            });

            modelBuilder.Entity<Store>(entity =>
            {
                entity.Property(e => e.StoreId)
                    .HasMaxLength(50)
                    .ValueGeneratedNever();

                entity.Property(e => e.Name).IsRequired();
            });
        }
    }
}
