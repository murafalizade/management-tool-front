using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplication1.Migrations
{
    public partial class empp2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ExtraMoneyReason",
                table: "Employees",
                newName: "ExtraMoney2");

            migrationBuilder.CreateTable(
                name: "EmployeeSalaryRecords",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RankSalary = table.Column<double>(type: "float", nullable: false),
                    PositionSalary = table.Column<double>(type: "float", nullable: false),
                    XIMoney = table.Column<double>(type: "float", nullable: false),
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
                    Tax = table.Column<double>(type: "float", nullable: false),
                    DSMF = table.Column<double>(type: "float", nullable: false),
                    HealthInsurance = table.Column<double>(type: "float", nullable: false),
                    Kesirler = table.Column<double>(type: "float", nullable: false),
                    Aliment = table.Column<double>(type: "float", nullable: false),
                    Extra211100 = table.Column<double>(type: "float", nullable: false),
                    Discount = table.Column<double>(type: "float", nullable: false),
                    ExtraGivenMoney = table.Column<double>(type: "float", nullable: false),
                    Food = table.Column<double>(type: "float", nullable: false),
                    Muavin = table.Column<double>(type: "float", nullable: false),
                    Mezuniyyet = table.Column<double>(type: "float", nullable: false),
                    KesfMezun = table.Column<double>(type: "float", nullable: false),
                    KesfXeste = table.Column<double>(type: "float", nullable: false),
                    Kiraye = table.Column<double>(type: "float", nullable: false),
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
                    EmployeeId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeSalaryRecords", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmployeeSalaryRecords_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeSalaryRecords_EmployeeId",
                table: "EmployeeSalaryRecords",
                column: "EmployeeId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EmployeeSalaryRecords");

            migrationBuilder.RenameColumn(
                name: "ExtraMoney2",
                table: "Employees",
                newName: "ExtraMoneyReason");
        }
    }
}
