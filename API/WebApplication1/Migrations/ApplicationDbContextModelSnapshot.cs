﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using WebApplication1.Data;

namespace WebApplication1.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.0");

            modelBuilder.Entity("WebApplication1.Models.Ability", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<int>("ForGizirPercentage")
                        .HasColumnType("int");

                    b.Property<int>("ForMuddetliPercentage")
                        .HasColumnType("int");

                    b.Property<int>("ForZabitPercentage")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.ToTable("Abilities");
                });

            modelBuilder.Entity("WebApplication1.Models.Adminstration", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ShortName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime2");

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

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.HasIndex("AdminstrationId");

                    b.ToTable("Departments");
                });

            modelBuilder.Entity("WebApplication1.Models.Discount", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<double>("Chernobyl")
                        .HasColumnType("float");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<double>("Desert")
                        .HasColumnType("float");

                    b.Property<double>("Disability")
                        .HasColumnType("float");

                    b.Property<int>("Dsmf")
                        .HasColumnType("int");

                    b.Property<double>("Food")
                        .HasColumnType("float");

                    b.Property<int>("HealthInjurance")
                        .HasColumnType("int");

                    b.Property<double>("Martyr")
                        .HasColumnType("float");

                    b.Property<double>("MinWage")
                        .HasColumnType("float");

                    b.Property<double>("Owner")
                        .HasColumnType("float");

                    b.Property<double>("Refugee")
                        .HasColumnType("float");

                    b.Property<int>("TaxPercentage")
                        .HasColumnType("int");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime2");

                    b.Property<double>("Veteran")
                        .HasColumnType("float");

                    b.Property<double>("VeteranTaxDiscount")
                        .HasColumnType("float");

                    b.HasKey("Id");

                    b.ToTable("Discounts");
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

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("EnteranceCommand")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("EnteranceDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("FatherName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Fin")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("InjuranceNo")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("MeharetDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.ToTable("Employees");
                });

            modelBuilder.Entity("WebApplication1.Models.EmployeeSalaryRecord", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<int?>("AbilityId")
                        .HasColumnType("int");

                    b.Property<double>("AbilityPrice")
                        .HasColumnType("float");

                    b.Property<string>("AccountNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("Alimony")
                        .HasColumnType("float");

                    b.Property<double>("AlimonyPercentage")
                        .HasColumnType("float");

                    b.Property<double>("BPM")
                        .HasColumnType("float");

                    b.Property<double>("BPMDSMF")
                        .HasColumnType("float");

                    b.Property<int>("BPMQat")
                        .HasColumnType("int");

                    b.Property<double>("BusinessTrip")
                        .HasColumnType("float");

                    b.Property<string>("Comment")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("ConfidentialityPercentage")
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<int>("CyberSecurityPercentage")
                        .HasColumnType("int");

                    b.Property<double>("DSMF")
                        .HasColumnType("float");

                    b.Property<double>("DesertPrice")
                        .HasColumnType("float");

                    b.Property<int>("DiscountId")
                        .HasColumnType("int");

                    b.Property<int>("EmployeeId")
                        .HasColumnType("int");

                    b.Property<double>("ExitAid")
                        .HasColumnType("float");

                    b.Property<double>("ExitAidDSMF")
                        .HasColumnType("float");

                    b.Property<double>("ExploretionPrice")
                        .HasColumnType("float");

                    b.Property<double>("Extra211100")
                        .HasColumnType("float");

                    b.Property<double>("ExtraGivenMoney")
                        .HasColumnType("float");

                    b.Property<double>("ExtraMoney")
                        .HasColumnType("float");

                    b.Property<double>("ExtraMoney2")
                        .HasColumnType("float");

                    b.Property<double>("Fails")
                        .HasColumnType("float");

                    b.Property<int>("FamilyCount")
                        .HasColumnType("int");

                    b.Property<double>("FinancialAid")
                        .HasColumnType("float");

                    b.Property<double>("FinancialAidDSMF")
                        .HasColumnType("float");

                    b.Property<double>("Food")
                        .HasColumnType("float");

                    b.Property<bool>("FoodGiven")
                        .HasColumnType("bit");

                    b.Property<int?>("ForeignLanguageId")
                        .HasColumnType("int");

                    b.Property<double>("ForeignLanguagePrice")
                        .HasColumnType("float");

                    b.Property<int>("HarmfulnessPercentage")
                        .HasColumnType("int");

                    b.Property<double>("HealthInsurance")
                        .HasColumnType("float");

                    b.Property<int?>("HonorTitleId")
                        .HasColumnType("int");

                    b.Property<double>("HonorTitlePrice")
                        .HasColumnType("float");

                    b.Property<bool>("IsBPMGiven")
                        .HasColumnType("bit");

                    b.Property<bool>("IsChernobyl")
                        .HasColumnType("bit");

                    b.Property<bool>("IsDisabled")
                        .HasColumnType("bit");

                    b.Property<bool>("IsEternalQat")
                        .HasColumnType("bit");

                    b.Property<bool>("IsExitAidGiven")
                        .HasColumnType("bit");

                    b.Property<bool>("IsFinancialAidGiven")
                        .HasColumnType("bit");

                    b.Property<bool>("IsGiven")
                        .HasColumnType("bit");

                    b.Property<bool>("IsMatry")
                        .HasColumnType("bit");

                    b.Property<bool>("IsOwner")
                        .HasColumnType("bit");

                    b.Property<bool>("IsRefugee")
                        .HasColumnType("bit");

                    b.Property<bool>("IsVacationGiven")
                        .HasColumnType("bit");

                    b.Property<bool>("IsVeteran")
                        .HasColumnType("bit");

                    b.Property<double>("KesfMezun")
                        .HasColumnType("float");

                    b.Property<double>("KesfXeste")
                        .HasColumnType("float");

                    b.Property<double>("Muavin")
                        .HasColumnType("float");

                    b.Property<double>("PTMoney")
                        .HasColumnType("float");

                    b.Property<int>("PTQat")
                        .HasColumnType("int");

                    b.Property<int?>("PositionId")
                        .HasColumnType("int");

                    b.Property<double>("PositionSalary")
                        .HasColumnType("float");

                    b.Property<int?>("RankId")
                        .HasColumnType("int");

                    b.Property<double>("RankSalary")
                        .HasColumnType("float");

                    b.Property<DateTime>("RecordDate")
                        .HasColumnType("datetime2");

                    b.Property<int?>("RentId")
                        .HasColumnType("int");

                    b.Property<double>("RentPrice")
                        .HasColumnType("float");

                    b.Property<int>("RentQat")
                        .HasColumnType("int");

                    b.Property<int>("RepresentingPercentage")
                        .HasColumnType("int");

                    b.Property<int?>("ScientificDegreeId")
                        .HasColumnType("int");

                    b.Property<double>("ScientificDegreePrice")
                        .HasColumnType("float");

                    b.Property<double>("Tax")
                        .HasColumnType("float");

                    b.Property<double>("TripExpense")
                        .HasColumnType("float");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime2");

                    b.Property<double>("Vacation")
                        .HasColumnType("float");

                    b.Property<double>("VacationDSMF")
                        .HasColumnType("float");

                    b.Property<int>("VeteranQat")
                        .HasColumnType("int");

                    b.Property<double>("XIMoney")
                        .HasColumnType("float");

                    b.Property<int>("XIPercent")
                        .HasColumnType("int");

                    b.Property<double>("YukPulu")
                        .HasColumnType("float");

                    b.HasKey("Id");

                    b.HasIndex("AbilityId");

                    b.HasIndex("DiscountId");

                    b.HasIndex("EmployeeId");

                    b.HasIndex("ForeignLanguageId");

                    b.HasIndex("HonorTitleId");

                    b.HasIndex("PositionId");

                    b.HasIndex("RankId");

                    b.HasIndex("RentId");

                    b.HasIndex("ScientificDegreeId");

                    b.ToTable("EmployeeSalaryRecords");
                });

            modelBuilder.Entity("WebApplication1.Models.ForeignLanguage", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Percentage")
                        .HasColumnType("int");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.ToTable("ForeignLanguages");
                });

            modelBuilder.Entity("WebApplication1.Models.HonorTitle", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Salary")
                        .HasColumnType("int");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.ToTable("HonorTitles");
                });

            modelBuilder.Entity("WebApplication1.Models.Position", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<int>("DepartmentId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RankName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("Salary")
                        .HasColumnType("float");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime2");

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

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Salary")
                        .HasColumnType("int");

                    b.Property<string>("ShortName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.ToTable("Ranks");
                });

            modelBuilder.Entity("WebApplication1.Models.Rent", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("Price")
                        .HasColumnType("float");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.ToTable("Rents");
                });

            modelBuilder.Entity("WebApplication1.Models.ScientificDegree", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<int>("For10to15Salary")
                        .HasColumnType("int");

                    b.Property<int>("For15to20Salary")
                        .HasColumnType("int");

                    b.Property<int>("For20Salary")
                        .HasColumnType("int");

                    b.Property<int>("For5to10Salary")
                        .HasColumnType("int");

                    b.Property<int>("ForEveryoneSalary")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.ToTable("ScientificDegrees");
                });

            modelBuilder.Entity("WebApplication1.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<byte[]>("PasswordHash")
                        .HasColumnType("varbinary(max)");

                    b.Property<byte[]>("PasswordSalt")
                        .HasColumnType("varbinary(max)");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime2");

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

            modelBuilder.Entity("WebApplication1.Models.EmployeeSalaryRecord", b =>
                {
                    b.HasOne("WebApplication1.Models.Ability", "Ability")
                        .WithMany("EmployeeSalaryRecords")
                        .HasForeignKey("AbilityId");

                    b.HasOne("WebApplication1.Models.Discount", "Discount")
                        .WithMany("EmployeeSalaryRecords")
                        .HasForeignKey("DiscountId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("WebApplication1.Models.Employee", "Employee")
                        .WithMany("EmployeeSalaryRecords")
                        .HasForeignKey("EmployeeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("WebApplication1.Models.ForeignLanguage", "ForeignLanguage")
                        .WithMany("EmployeeSalaryRecords")
                        .HasForeignKey("ForeignLanguageId");

                    b.HasOne("WebApplication1.Models.HonorTitle", "HonorTitle")
                        .WithMany("EmployeeSalaryRecords")
                        .HasForeignKey("HonorTitleId");

                    b.HasOne("WebApplication1.Models.Position", "Position")
                        .WithMany("EmployeeSalaryRecords")
                        .HasForeignKey("PositionId");

                    b.HasOne("WebApplication1.Models.Rank", "Rank")
                        .WithMany("EmployeeSalaryRecords")
                        .HasForeignKey("RankId");

                    b.HasOne("WebApplication1.Models.Rent", "Rent")
                        .WithMany("EmployeeSalaryRecord")
                        .HasForeignKey("RentId");

                    b.HasOne("WebApplication1.Models.ScientificDegree", "ScientificDegree")
                        .WithMany("EmployeeSalaryRecords")
                        .HasForeignKey("ScientificDegreeId");

                    b.Navigation("Ability");

                    b.Navigation("Discount");

                    b.Navigation("Employee");

                    b.Navigation("ForeignLanguage");

                    b.Navigation("HonorTitle");

                    b.Navigation("Position");

                    b.Navigation("Rank");

                    b.Navigation("Rent");

                    b.Navigation("ScientificDegree");
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

            modelBuilder.Entity("WebApplication1.Models.Ability", b =>
                {
                    b.Navigation("EmployeeSalaryRecords");
                });

            modelBuilder.Entity("WebApplication1.Models.Adminstration", b =>
                {
                    b.Navigation("Departments");
                });

            modelBuilder.Entity("WebApplication1.Models.Department", b =>
                {
                    b.Navigation("Positions");
                });

            modelBuilder.Entity("WebApplication1.Models.Discount", b =>
                {
                    b.Navigation("EmployeeSalaryRecords");
                });

            modelBuilder.Entity("WebApplication1.Models.Employee", b =>
                {
                    b.Navigation("EmployeeSalaryRecords");
                });

            modelBuilder.Entity("WebApplication1.Models.ForeignLanguage", b =>
                {
                    b.Navigation("EmployeeSalaryRecords");
                });

            modelBuilder.Entity("WebApplication1.Models.HonorTitle", b =>
                {
                    b.Navigation("EmployeeSalaryRecords");
                });

            modelBuilder.Entity("WebApplication1.Models.Position", b =>
                {
                    b.Navigation("EmployeeSalaryRecords");
                });

            modelBuilder.Entity("WebApplication1.Models.Rank", b =>
                {
                    b.Navigation("EmployeeSalaryRecords");
                });

            modelBuilder.Entity("WebApplication1.Models.Rent", b =>
                {
                    b.Navigation("EmployeeSalaryRecord");
                });

            modelBuilder.Entity("WebApplication1.Models.ScientificDegree", b =>
                {
                    b.Navigation("EmployeeSalaryRecords");
                });
#pragma warning restore 612, 618
        }
    }
}
