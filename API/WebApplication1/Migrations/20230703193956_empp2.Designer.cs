﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using WebApplication1.Data;

namespace WebApplication1.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20230703193956_empp2")]
    partial class empp2
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.0");

            modelBuilder.Entity("WebApplication1.Models.Adminstration", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ShortName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Adminstrations");
                });

            modelBuilder.Entity("WebApplication1.Models.Department", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<int>("AdminstrationId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("AdminstrationId");

                    b.ToTable("Departments");
                });

            modelBuilder.Entity("WebApplication1.Models.Employee", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<DateTime>("BirthDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("CommandNo")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ElmiDerece")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ExtraMoney")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ExtraMoney2")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FatherName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FexriAd")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Fin")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("InjuranceNo")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Kesfiyyat")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Meharetlilik")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Mexfilik")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("PositionId")
                        .HasColumnType("int");

                    b.Property<int?>("RankId")
                        .HasColumnType("int");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Temsilcilik")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("XariciDil")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Zererlilik")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("PositionId");

                    b.HasIndex("RankId");

                    b.ToTable("Employees");
                });

            modelBuilder.Entity("WebApplication1.Models.EmployeeSalaryRecord", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("AccountNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("Aliment")
                        .HasColumnType("float");

                    b.Property<double>("BPM")
                        .HasColumnType("float");

                    b.Property<double>("BPMPercentage")
                        .HasColumnType("float");

                    b.Property<double>("CixisMuv")
                        .HasColumnType("float");

                    b.Property<string>("Comment")
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("DSMF")
                        .HasColumnType("float");

                    b.Property<double>("Discount")
                        .HasColumnType("float");

                    b.Property<double>("ElmiDerece")
                        .HasColumnType("float");

                    b.Property<int?>("EmployeeId")
                        .HasColumnType("int");

                    b.Property<double>("Extra211100")
                        .HasColumnType("float");

                    b.Property<double>("ExtraGivenMoney")
                        .HasColumnType("float");

                    b.Property<double>("ExtraMoney")
                        .HasColumnType("float");

                    b.Property<double>("ExtraMoney2")
                        .HasColumnType("float");

                    b.Property<double>("Ezamiyyet")
                        .HasColumnType("float");

                    b.Property<double>("FexriAd")
                        .HasColumnType("float");

                    b.Property<double>("Food")
                        .HasColumnType("float");

                    b.Property<double>("HealthInsurance")
                        .HasColumnType("float");

                    b.Property<double>("KesfMezun")
                        .HasColumnType("float");

                    b.Property<double>("KesfXeste")
                        .HasColumnType("float");

                    b.Property<double>("Kesfiyyat")
                        .HasColumnType("float");

                    b.Property<double>("Kesirler")
                        .HasColumnType("float");

                    b.Property<double>("Kibertehlukesizlik")
                        .HasColumnType("float");

                    b.Property<double>("Kiraye")
                        .HasColumnType("float");

                    b.Property<double>("MaddiYardim")
                        .HasColumnType("float");

                    b.Property<double>("Meharetlilik")
                        .HasColumnType("float");

                    b.Property<double>("Mexfilik")
                        .HasColumnType("float");

                    b.Property<double>("Mezuniyyet")
                        .HasColumnType("float");

                    b.Property<double>("Muavin")
                        .HasColumnType("float");

                    b.Property<double>("PTMoney")
                        .HasColumnType("float");

                    b.Property<double>("PositionSalary")
                        .HasColumnType("float");

                    b.Property<double>("RankSalary")
                        .HasColumnType("float");

                    b.Property<DateTime>("RecordDate")
                        .HasColumnType("datetime2");

                    b.Property<double>("Sehra")
                        .HasColumnType("float");

                    b.Property<double>("Tax")
                        .HasColumnType("float");

                    b.Property<double>("Temsilcilik")
                        .HasColumnType("float");

                    b.Property<double>("TotalDSMF")
                        .HasColumnType("float");

                    b.Property<double>("XIMoney")
                        .HasColumnType("float");

                    b.Property<double>("XariciDil")
                        .HasColumnType("float");

                    b.Property<double>("YolXerci")
                        .HasColumnType("float");

                    b.Property<double>("YukPulu")
                        .HasColumnType("float");

                    b.Property<double>("Zererlilik")
                        .HasColumnType("float");

                    b.HasKey("Id");

                    b.HasIndex("EmployeeId");

                    b.ToTable("EmployeeSalaryRecords");
                });

            modelBuilder.Entity("WebApplication1.Models.Position", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<int>("DepartmentId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("Salary")
                        .HasColumnType("float");

                    b.HasKey("Id");

                    b.HasIndex("DepartmentId");

                    b.ToTable("Positions");
                });

            modelBuilder.Entity("WebApplication1.Models.Rank", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Salary")
                        .HasColumnType("int");

                    b.Property<string>("ShortName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Ranks");
                });

            modelBuilder.Entity("WebApplication1.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<byte[]>("PasswordHash")
                        .HasColumnType("varbinary(max)");

                    b.Property<byte[]>("PasswordSalt")
                        .HasColumnType("varbinary(max)");

                    b.HasKey("Id");

                    b.ToTable("AdminUsers");
                });

            modelBuilder.Entity("WebApplication1.Models.Department", b =>
                {
                    b.HasOne("WebApplication1.Models.Adminstration", "Adminstration")
                        .WithMany("Departments")
                        .HasForeignKey("AdminstrationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Adminstration");
                });

            modelBuilder.Entity("WebApplication1.Models.Employee", b =>
                {
                    b.HasOne("WebApplication1.Models.Position", "Position")
                        .WithMany()
                        .HasForeignKey("PositionId");

                    b.HasOne("WebApplication1.Models.Rank", "Rank")
                        .WithMany("Employees")
                        .HasForeignKey("RankId");

                    b.Navigation("Position");

                    b.Navigation("Rank");
                });

            modelBuilder.Entity("WebApplication1.Models.EmployeeSalaryRecord", b =>
                {
                    b.HasOne("WebApplication1.Models.Employee", "Employee")
                        .WithMany()
                        .HasForeignKey("EmployeeId");

                    b.Navigation("Employee");
                });

            modelBuilder.Entity("WebApplication1.Models.Position", b =>
                {
                    b.HasOne("WebApplication1.Models.Department", "Department")
                        .WithMany("Positions")
                        .HasForeignKey("DepartmentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Department");
                });

            modelBuilder.Entity("WebApplication1.Models.Adminstration", b =>
                {
                    b.Navigation("Departments");
                });

            modelBuilder.Entity("WebApplication1.Models.Department", b =>
                {
                    b.Navigation("Positions");
                });

            modelBuilder.Entity("WebApplication1.Models.Rank", b =>
                {
                    b.Navigation("Employees");
                });
#pragma warning restore 612, 618
        }
    }
}
