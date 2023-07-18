using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplication1.Migrations
{
    public partial class discountOptions : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "TotalDiscount",
                table: "EmployeeSalaryRecords",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<int>(
                name: "XIPercent",
                table: "EmployeeSalaryRecords",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "isChernobil",
                table: "EmployeeSalaryRecords",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "isDisabled",
                table: "EmployeeSalaryRecords",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "isMatry",
                table: "EmployeeSalaryRecords",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "isNotGiven",
                table: "EmployeeSalaryRecords",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "isOwner",
                table: "EmployeeSalaryRecords",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "isQachqin",
                table: "EmployeeSalaryRecords",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "isVeteran",
                table: "EmployeeSalaryRecords",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<double>(
                name: "Qachqin",
                table: "Discounts",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TotalDiscount",
                table: "EmployeeSalaryRecords");

            migrationBuilder.DropColumn(
                name: "XIPercent",
                table: "EmployeeSalaryRecords");

            migrationBuilder.DropColumn(
                name: "isChernobil",
                table: "EmployeeSalaryRecords");

            migrationBuilder.DropColumn(
                name: "isDisabled",
                table: "EmployeeSalaryRecords");

            migrationBuilder.DropColumn(
                name: "isMatry",
                table: "EmployeeSalaryRecords");

            migrationBuilder.DropColumn(
                name: "isNotGiven",
                table: "EmployeeSalaryRecords");

            migrationBuilder.DropColumn(
                name: "isOwner",
                table: "EmployeeSalaryRecords");

            migrationBuilder.DropColumn(
                name: "isQachqin",
                table: "EmployeeSalaryRecords");

            migrationBuilder.DropColumn(
                name: "isVeteran",
                table: "EmployeeSalaryRecords");

            migrationBuilder.DropColumn(
                name: "Qachqin",
                table: "Discounts");
        }
    }
}
