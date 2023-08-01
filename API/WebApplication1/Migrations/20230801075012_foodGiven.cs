using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplication1.Migrations
{
    public partial class foodGiven : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TotalDiscount",
                table: "EmployeeSalaryRecords");

            migrationBuilder.DropColumn(
                name: "TotalGiven",
                table: "EmployeeSalaryRecords");

            migrationBuilder.DropColumn(
                name: "TotalIncome",
                table: "EmployeeSalaryRecords");

            migrationBuilder.DropColumn(
                name: "TotalSalary",
                table: "EmployeeSalaryRecords");

            migrationBuilder.DropColumn(
                name: "TotalTaken",
                table: "EmployeeSalaryRecords");

            migrationBuilder.AddColumn<bool>(
                name: "FoodGiven",
                table: "EmployeeSalaryRecords",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FoodGiven",
                table: "EmployeeSalaryRecords");

            migrationBuilder.AddColumn<double>(
                name: "TotalDiscount",
                table: "EmployeeSalaryRecords",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "TotalGiven",
                table: "EmployeeSalaryRecords",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "TotalIncome",
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
    }
}
