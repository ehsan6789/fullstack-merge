﻿using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Authdemo1.Models;

namespace Authdemo1.Data
{
    public class AppDbContext : IdentityDbContext<ApplicationUser>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Employee> Employees { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<BankAccount> BankAccounts { get; set; }
        public DbSet<Attendance> Attendances { get; set; }
        public DbSet<LeaveRequest> LeaveRequests { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            // Department configuration
            modelBuilder.Entity<Department>()
                .HasMany(d => d.Employees)
                .WithOne(e => e.Department)
                .HasForeignKey(e => e.DepartmentId)
                .OnDelete(DeleteBehavior.Restrict);
            // Employee configuration
            modelBuilder.Entity<Employee>()
                .Property(e => e.Status)
                .HasConversion<int>();
            // Bank Account configuration
            modelBuilder.Entity<BankAccount>()
                .HasOne(b => b.Employee)
                .WithMany(e => e.BankAccounts)
                .HasForeignKey(b => b.EmployeeId)
                .OnDelete(DeleteBehavior.Cascade);

            // Soft Deleted 
            modelBuilder.Entity<Employee>().HasQueryFilter(e => !e.IsDeleted);

            // Initial data seeding
            modelBuilder.Entity<Department>().HasData(
                new Department { Id = 1, Name = "Dev", Description = "Development Department" },
                new Department { Id = 2, Name = "QA", Description = "Quality Assurance Department" },
                new Department { Id = 3, Name = "HR", Description = "Human Resources Department" },
                new Department { Id = 4, Name = "Finance", Description = "Finance Department" }
            );
        }
    }
}
