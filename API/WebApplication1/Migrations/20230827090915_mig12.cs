using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplication1.Migrations
{
    public partial class mig12 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CyberSecurityPrice",
                table: "EmployeeSalaryRecords",
                newName: "CyberSecurity");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CyberSecurity",
                table: "EmployeeSalaryRecords",
                newName: "CyberSecurityPrice");
        }
    }
}
