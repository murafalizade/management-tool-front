using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplication1.Migrations
{
    public partial class totalValues : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "TotalGiven",
                table: "EmployeeSalaryRecords",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "TotalSalary",
                table: "EmployeeSalaryRecords",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "TotalTaken",
                table: "EmployeeSalaryRecords",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TotalGiven",
                table: "EmployeeSalaryRecords");

            migrationBuilder.DropColumn(
                name: "TotalSalary",
                table: "EmployeeSalaryRecords");

            migrationBuilder.DropColumn(
                name: "TotalTaken",
                table: "EmployeeSalaryRecords");
        }
    }
}
