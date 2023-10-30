using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplication1.Migrations
{
    public partial class mig16 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CyberSecurity",
                table: "EmployeeSalaryRecords");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "CyberSecurity",
                table: "EmployeeSalaryRecords",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }
    }
}
