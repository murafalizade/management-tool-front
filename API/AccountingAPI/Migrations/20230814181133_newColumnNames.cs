using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplication1.Migrations
{
    public partial class newColumnNames : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Abilities",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ForZabitPercentage = table.Column<int>(type: "int", nullable: false),
                    ForGizirPercentage = table.Column<int>(type: "int", nullable: false),
                    ForMuddetliPercentage = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Abilities", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Adminstrations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ShortName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Adminstrations", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AdminUsers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PasswordHash = table.Column<byte[]>(type: "varbinary(max)", nullable: true),
                    PasswordSalt = table.Column<byte[]>(type: "varbinary(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AdminUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Discounts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TaxPercentage = table.Column<int>(type: "int", nullable: false),
                    Dsmf = table.Column<int>(type: "int", nullable: false),
                    HealthInjurance = table.Column<int>(type: "int", nullable: false),
                    Food = table.Column<double>(type: "float", nullable: false),
                    Veteran = table.Column<double>(type: "float", nullable: false),
                    Disability = table.Column<double>(type: "float", nullable: false),
                    Refugee = table.Column<double>(type: "float", nullable: false),
                    Chernobyl = table.Column<double>(type: "float", nullable: false),
                    Martyr = table.Column<double>(type: "float", nullable: false),
                    Owner = table.Column<double>(type: "float", nullable: false),
                    Desert = table.Column<double>(type: "float", nullable: false),
                    VeteranTaxDiscount = table.Column<double>(type: "float", nullable: false),
                    MinWage = table.Column<double>(type: "float", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Discounts", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ForeignLanguages",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Percentage = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ForeignLanguages", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "HonorTitles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Salary = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HonorTitles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Ranks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ShortName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Salary = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ranks", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Rents",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Price = table.Column<double>(type: "float", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rents", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ScientificDegrees",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    For5to10Salary = table.Column<int>(type: "int", nullable: false),
                    For10to15Salary = table.Column<int>(type: "int", nullable: false),
                    For15to20Salary = table.Column<int>(type: "int", nullable: false),
                    For20Salary = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ScientificDegrees", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Departments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AdminstrationId = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Departments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Departments_Adminstrations_AdminstrationId",
                        column: x => x.AdminstrationId,
                        principalTable: "Adminstrations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Employees",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FatherName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Fin = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    InjuranceNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BirthDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EnteranceDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    MeharetDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EnteranceCommand = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CommandNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AbilityId = table.Column<int>(type: "int", nullable: true),
                    ForeignLanguageId = table.Column<int>(type: "int", nullable: true),
                    ScientificDegreeId = table.Column<int>(type: "int", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employees", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Employees_Abilities_AbilityId",
                        column: x => x.AbilityId,
                        principalTable: "Abilities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Employees_ForeignLanguages_ForeignLanguageId",
                        column: x => x.ForeignLanguageId,
                        principalTable: "ForeignLanguages",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Employees_ScientificDegrees_ScientificDegreeId",
                        column: x => x.ScientificDegreeId,
                        principalTable: "ScientificDegrees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Positions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Salary = table.Column<double>(type: "float", nullable: false),
                    RankId = table.Column<int>(type: "int", nullable: false),
                    DepartmentId = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Positions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Positions_Departments_DepartmentId",
                        column: x => x.DepartmentId,
                        principalTable: "Departments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Positions_Ranks_RankId",
                        column: x => x.RankId,
                        principalTable: "Ranks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EmployeeSalaryRecords",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RankSalary = table.Column<double>(type: "float", nullable: false),
                    PositionSalary = table.Column<double>(type: "float", nullable: false),
                    XIPercent = table.Column<int>(type: "int", nullable: false),
                    XIMoney = table.Column<double>(type: "float", nullable: false),
                    PTQat = table.Column<int>(type: "int", nullable: false),
                    IsEternalQat = table.Column<bool>(type: "bit", nullable: false),
                    PTMoney = table.Column<double>(type: "float", nullable: false),
                    RecordDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    AbilityPrice = table.Column<double>(type: "float", nullable: false),
                    Representing = table.Column<double>(type: "float", nullable: false),
                    Confidentiality = table.Column<double>(type: "float", nullable: false),
                    Harmfulness = table.Column<double>(type: "float", nullable: false),
                    ForeignLanguagePrice = table.Column<double>(type: "float", nullable: false),
                    CyberSecurityPrice = table.Column<double>(type: "float", nullable: false),
                    ExploretionPrice = table.Column<double>(type: "float", nullable: false),
                    ScientificDegreePrice = table.Column<double>(type: "float", nullable: false),
                    HonorTitlePrice = table.Column<double>(type: "float", nullable: false),
                    ExtraMoney = table.Column<double>(type: "float", nullable: false),
                    ExtraMoney2 = table.Column<double>(type: "float", nullable: false),
                    IsMatry = table.Column<bool>(type: "bit", nullable: false),
                    IsChernobyl = table.Column<bool>(type: "bit", nullable: false),
                    IsVeteran = table.Column<bool>(type: "bit", nullable: false),
                    IsDisabled = table.Column<bool>(type: "bit", nullable: false),
                    IsOwner = table.Column<bool>(type: "bit", nullable: false),
                    IsRefugee = table.Column<bool>(type: "bit", nullable: false),
                    VeteranQat = table.Column<int>(type: "int", nullable: false),
                    Tax = table.Column<double>(type: "float", nullable: false),
                    DSMF = table.Column<double>(type: "float", nullable: false),
                    HealthInsurance = table.Column<double>(type: "float", nullable: false),
                    Fails = table.Column<double>(type: "float", nullable: false),
                    AlimonyPercentage = table.Column<double>(type: "float", nullable: false),
                    Alimony = table.Column<double>(type: "float", nullable: false),
                    Extra211100 = table.Column<double>(type: "float", nullable: false),
                    ExtraGivenMoney = table.Column<double>(type: "float", nullable: false),
                    Food = table.Column<double>(type: "float", nullable: false),
                    FoodGiven = table.Column<bool>(type: "bit", nullable: false),
                    Muavin = table.Column<double>(type: "float", nullable: false),
                    IsVocationGiven = table.Column<bool>(type: "bit", nullable: false),
                    Vacation = table.Column<double>(type: "float", nullable: false),
                    VacationDSMF = table.Column<double>(type: "float", nullable: false),
                    KesfMezun = table.Column<double>(type: "float", nullable: false),
                    KesfXeste = table.Column<double>(type: "float", nullable: false),
                    FamilyCount = table.Column<int>(type: "int", nullable: false),
                    RentQat = table.Column<int>(type: "int", nullable: false),
                    RentPrice = table.Column<double>(type: "float", nullable: false),
                    IsFinancialAidGiven = table.Column<bool>(type: "bit", nullable: false),
                    FinancialAid = table.Column<double>(type: "float", nullable: false),
                    FinancialAidDSMF = table.Column<double>(type: "float", nullable: false),
                    BusinessTrip = table.Column<double>(type: "float", nullable: false),
                    DesertPrice = table.Column<double>(type: "float", nullable: false),
                    TripExpense = table.Column<double>(type: "float", nullable: false),
                    YukPulu = table.Column<double>(type: "float", nullable: false),
                    IsExitAidGiven = table.Column<bool>(type: "bit", nullable: false),
                    ExitAid = table.Column<double>(type: "float", nullable: false),
                    ExitAidDSMF = table.Column<double>(type: "float", nullable: false),
                    BPMQat = table.Column<int>(type: "int", nullable: false),
                    BPM = table.Column<double>(type: "float", nullable: false),
                    BPMDSMF = table.Column<double>(type: "float", nullable: false),
                    Comment = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AccountNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsGiven = table.Column<bool>(type: "bit", nullable: false),
                    RankId = table.Column<int>(type: "int", nullable: true),
                    EmployeeId = table.Column<int>(type: "int", nullable: false),
                    ForeignLanguageId = table.Column<int>(type: "int", nullable: true),
                    HonorTitleId = table.Column<int>(type: "int", nullable: true),
                    AbilityId = table.Column<int>(type: "int", nullable: true),
                    PositionId = table.Column<int>(type: "int", nullable: true),
                    ScientificDegreeId = table.Column<int>(type: "int", nullable: true),
                    RentId = table.Column<int>(type: "int", nullable: true),
                    DiscountId = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeSalaryRecords", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmployeeSalaryRecords_Abilities_AbilityId",
                        column: x => x.AbilityId,
                        principalTable: "Abilities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_EmployeeSalaryRecords_Discounts_DiscountId",
                        column: x => x.DiscountId,
                        principalTable: "Discounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EmployeeSalaryRecords_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EmployeeSalaryRecords_ForeignLanguages_ForeignLanguageId",
                        column: x => x.ForeignLanguageId,
                        principalTable: "ForeignLanguages",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_EmployeeSalaryRecords_HonorTitles_HonorTitleId",
                        column: x => x.HonorTitleId,
                        principalTable: "HonorTitles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_EmployeeSalaryRecords_Positions_PositionId",
                        column: x => x.PositionId,
                        principalTable: "Positions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_EmployeeSalaryRecords_Ranks_RankId",
                        column: x => x.RankId,
                        principalTable: "Ranks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_EmployeeSalaryRecords_Rents_RentId",
                        column: x => x.RentId,
                        principalTable: "Rents",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_EmployeeSalaryRecords_ScientificDegrees_ScientificDegreeId",
                        column: x => x.ScientificDegreeId,
                        principalTable: "ScientificDegrees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Departments_AdminstrationId",
                table: "Departments",
                column: "AdminstrationId");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_AbilityId",
                table: "Employees",
                column: "AbilityId");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_ForeignLanguageId",
                table: "Employees",
                column: "ForeignLanguageId");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_ScientificDegreeId",
                table: "Employees",
                column: "ScientificDegreeId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeSalaryRecords_AbilityId",
                table: "EmployeeSalaryRecords",
                column: "AbilityId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeSalaryRecords_DiscountId",
                table: "EmployeeSalaryRecords",
                column: "DiscountId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeSalaryRecords_EmployeeId",
                table: "EmployeeSalaryRecords",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeSalaryRecords_ForeignLanguageId",
                table: "EmployeeSalaryRecords",
                column: "ForeignLanguageId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeSalaryRecords_HonorTitleId",
                table: "EmployeeSalaryRecords",
                column: "HonorTitleId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeSalaryRecords_PositionId",
                table: "EmployeeSalaryRecords",
                column: "PositionId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeSalaryRecords_RankId",
                table: "EmployeeSalaryRecords",
                column: "RankId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeSalaryRecords_RentId",
                table: "EmployeeSalaryRecords",
                column: "RentId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeSalaryRecords_ScientificDegreeId",
                table: "EmployeeSalaryRecords",
                column: "ScientificDegreeId");

            migrationBuilder.CreateIndex(
                name: "IX_Positions_DepartmentId",
                table: "Positions",
                column: "DepartmentId");

            migrationBuilder.CreateIndex(
                name: "IX_Positions_RankId",
                table: "Positions",
                column: "RankId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AdminUsers");

            migrationBuilder.DropTable(
                name: "EmployeeSalaryRecords");

            migrationBuilder.DropTable(
                name: "Discounts");

            migrationBuilder.DropTable(
                name: "Employees");

            migrationBuilder.DropTable(
                name: "HonorTitles");

            migrationBuilder.DropTable(
                name: "Positions");

            migrationBuilder.DropTable(
                name: "Rents");

            migrationBuilder.DropTable(
                name: "Abilities");

            migrationBuilder.DropTable(
                name: "ForeignLanguages");

            migrationBuilder.DropTable(
                name: "ScientificDegrees");

            migrationBuilder.DropTable(
                name: "Departments");

            migrationBuilder.DropTable(
                name: "Ranks");

            migrationBuilder.DropTable(
                name: "Adminstrations");
        }
    }
}
