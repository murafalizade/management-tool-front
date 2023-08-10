using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplication1.Migrations
{
    public partial class creationOfDatabase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Adminstrations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ShortName = table.Column<string>(type: "nvarchar(max)", nullable: true)
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
                    PasswordSalt = table.Column<byte[]>(type: "varbinary(max)", nullable: true)
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
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TaxPercentage = table.Column<int>(type: "int", nullable: false),
                    Dsmf = table.Column<int>(type: "int", nullable: false),
                    HealthInjurance = table.Column<int>(type: "int", nullable: false),
                    Food = table.Column<double>(type: "float", nullable: false),
                    Veteran = table.Column<double>(type: "float", nullable: false),
                    Disability = table.Column<double>(type: "float", nullable: false),
                    Qachqin = table.Column<double>(type: "float", nullable: false),
                    Chernobil = table.Column<double>(type: "float", nullable: false),
                    Martyr = table.Column<double>(type: "float", nullable: false),
                    Owner = table.Column<double>(type: "float", nullable: false),
                    Desert = table.Column<double>(type: "float", nullable: false),
                    VeteranTaxDiscount = table.Column<double>(type: "float", nullable: false),
                    MinWage = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Discounts", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "FexriAds",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Salary = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FexriAds", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "XariciDils",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Percentage = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_XariciDils", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Kirayes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Price = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Kirayes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Meharets",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ForZabitPercentage = table.Column<int>(type: "int", nullable: false),
                    ForGizirPercentage = table.Column<int>(type: "int", nullable: false),
                    ForMuddetliPercentage = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Meharets", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Ranks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ShortName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Salary = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ranks", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Departments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AdminstrationId = table.Column<int>(type: "int", nullable: false)
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
                name: "Positions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Salary = table.Column<double>(type: "float", nullable: false),
                    DepartmentId = table.Column<int>(type: "int", nullable: false)
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
                    FexriAdName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Fin = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    InjuranceNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BirthDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EnteranceDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    MeharetDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EnteranceCommand = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CommandNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Temsilcilik = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Mexfilik = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Zererlilik = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Kesfiyyat = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ElmiDerece = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ExtraMoney = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ExtraMoney2 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RankId = table.Column<int>(type: "int", nullable: true),
                    XariciDilId = table.Column<int>(type: "int", nullable: true),
                    FexriAdId = table.Column<int>(type: "int", nullable: true),
                    MeharetId = table.Column<int>(type: "int", nullable: true),
                    PositionId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employees", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Employees_FexriAds_FexriAdId",
                        column: x => x.FexriAdId,
                        principalTable: "FexriAds",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Employees_XariciDils_XariciDilId",
                        column: x => x.XariciDilId,
                        principalTable: "XariciDils",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Employees_Meharets_MeharetId",
                        column: x => x.MeharetId,
                        principalTable: "Meharets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Employees_Positions_PositionId",
                        column: x => x.PositionId,
                        principalTable: "Positions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Employees_Ranks_RankId",
                        column: x => x.RankId,
                        principalTable: "Ranks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "EmployeeSalaryRecords",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmployeeId = table.Column<int>(type: "int", nullable: false),
                    FullName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RankSalary = table.Column<double>(type: "float", nullable: false),
                    PositionSalary = table.Column<double>(type: "float", nullable: false),
                    XIPercent = table.Column<int>(type: "int", nullable: false),
                    XIMoney = table.Column<double>(type: "float", nullable: false),
                    PTQat = table.Column<int>(type: "int", nullable: false),
                    IsEternalQat = table.Column<bool>(type: "bit", nullable: false),
                    PTMoney = table.Column<double>(type: "float", nullable: false),
                    RecordDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Meharetlilik = table.Column<double>(type: "float", nullable: false),
                    Temsilcilik = table.Column<double>(type: "float", nullable: false),
                    Mexfilik = table.Column<double>(type: "float", nullable: false),
                    Zererlilik = table.Column<double>(type: "float", nullable: false),
                    XariciDil = table.Column<double>(type: "float", nullable: false),
                    Kibertehlukesizlik = table.Column<double>(type: "float", nullable: false),
                    Kesfiyyat = table.Column<double>(type: "float", nullable: false),
                    ElmiDerece = table.Column<double>(type: "float", nullable: false),
                    FexriAd = table.Column<double>(type: "float", nullable: false),
                    ExtraMoney = table.Column<double>(type: "float", nullable: false),
                    ExtraMoney2 = table.Column<double>(type: "float", nullable: false),
                    DiscountId = table.Column<int>(type: "int", nullable: false),
                    isMatry = table.Column<bool>(type: "bit", nullable: false),
                    isChernobil = table.Column<bool>(type: "bit", nullable: false),
                    isVeteran = table.Column<bool>(type: "bit", nullable: false),
                    isDisabled = table.Column<bool>(type: "bit", nullable: false),
                    isOwner = table.Column<bool>(type: "bit", nullable: false),
                    isQachqin = table.Column<bool>(type: "bit", nullable: false),
                    Tax = table.Column<double>(type: "float", nullable: false),
                    DSMF = table.Column<double>(type: "float", nullable: false),
                    HealthInsurance = table.Column<double>(type: "float", nullable: false),
                    Kesirler = table.Column<double>(type: "float", nullable: false),
                    AlimentPercentage = table.Column<double>(type: "float", nullable: false),
                    Aliment = table.Column<double>(type: "float", nullable: false),
                    Extra211100 = table.Column<double>(type: "float", nullable: false),
                    ExtraGivenMoney = table.Column<double>(type: "float", nullable: false),
                    Food = table.Column<double>(type: "float", nullable: false),
                    FoodGiven = table.Column<bool>(type: "bit", nullable: false),
                    Muavin = table.Column<double>(type: "float", nullable: false),
                    Mezuniyyet = table.Column<double>(type: "float", nullable: false),
                    KesfMezun = table.Column<double>(type: "float", nullable: false),
                    KesfXeste = table.Column<double>(type: "float", nullable: false),
                    KirayeId = table.Column<int>(type: "int", nullable: false),
                    FamilyCount = table.Column<int>(type: "int", nullable: false),
                    KirayeQat = table.Column<int>(type: "int", nullable: false),
                    KirayePrice = table.Column<double>(type: "float", nullable: false),
                    MaddiYardim = table.Column<double>(type: "float", nullable: false),
                    Ezamiyyet = table.Column<double>(type: "float", nullable: false),
                    Sehra = table.Column<double>(type: "float", nullable: false),
                    YolXerci = table.Column<double>(type: "float", nullable: false),
                    YukPulu = table.Column<double>(type: "float", nullable: false),
                    CixisMuv = table.Column<double>(type: "float", nullable: false),
                    BPM = table.Column<double>(type: "float", nullable: false),
                    BPMPercentage = table.Column<double>(type: "float", nullable: false),
                    TotalDSMF = table.Column<double>(type: "float", nullable: false),
                    Comment = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AccountNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    isNotGiven = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeSalaryRecords", x => x.Id);
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
                        name: "FK_EmployeeSalaryRecords_Kirayes_KirayeId",
                        column: x => x.KirayeId,
                        principalTable: "Kirayes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Departments_AdminstrationId",
                table: "Departments",
                column: "AdminstrationId");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_FexriAdId",
                table: "Employees",
                column: "FexriAdId");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_XariciDilId",
                table: "Employees",
                column: "XariciDilId");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_MeharetId",
                table: "Employees",
                column: "MeharetId");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_PositionId",
                table: "Employees",
                column: "PositionId");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_RankId",
                table: "Employees",
                column: "RankId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeSalaryRecords_DiscountId",
                table: "EmployeeSalaryRecords",
                column: "DiscountId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeSalaryRecords_EmployeeId",
                table: "EmployeeSalaryRecords",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeSalaryRecords_KirayeId",
                table: "EmployeeSalaryRecords",
                column: "KirayeId");

            migrationBuilder.CreateIndex(
                name: "IX_Positions_DepartmentId",
                table: "Positions",
                column: "DepartmentId");
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
                name: "Kirayes");

            migrationBuilder.DropTable(
                name: "FexriAds");

            migrationBuilder.DropTable(
                name: "XariciDils");

            migrationBuilder.DropTable(
                name: "Meharets");

            migrationBuilder.DropTable(
                name: "Positions");

            migrationBuilder.DropTable(
                name: "Ranks");

            migrationBuilder.DropTable(
                name: "Departments");

            migrationBuilder.DropTable(
                name: "Adminstrations");
        }
    }
}
