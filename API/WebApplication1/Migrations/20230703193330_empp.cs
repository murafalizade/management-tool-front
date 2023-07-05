using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplication1.Migrations
{
    public partial class empp : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ElmiDerece",
                table: "Employees",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ExtraMoney",
                table: "Employees",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ExtraMoneyReason",
                table: "Employees",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FexriAd",
                table: "Employees",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Kesfiyyat",
                table: "Employees",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Meharetlilik",
                table: "Employees",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Mexfilik",
                table: "Employees",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Temsilcilik",
                table: "Employees",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "XariciDil",
                table: "Employees",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Zererlilik",
                table: "Employees",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ElmiDerece",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "ExtraMoney",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "ExtraMoneyReason",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "FexriAd",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "Kesfiyyat",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "Meharetlilik",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "Mexfilik",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "Temsilcilik",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "XariciDil",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "Zererlilik",
                table: "Employees");
        }
    }
}
