using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplication1.Migrations
{
    public partial class fulname : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EmployeeSalaryRecords_Employees_EmployeeId",
                table: "EmployeeSalaryRecords");

            migrationBuilder.AlterColumn<int>(
                name: "EmployeeId",
                table: "EmployeeSalaryRecords",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FullName",
                table: "EmployeeSalaryRecords",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "TotalIncome",
                table: "EmployeeSalaryRecords",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddForeignKey(
                name: "FK_EmployeeSalaryRecords_Employees_EmployeeId",
                table: "EmployeeSalaryRecords",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EmployeeSalaryRecords_Employees_EmployeeId",
                table: "EmployeeSalaryRecords");

            migrationBuilder.DropColumn(
                name: "FullName",
                table: "EmployeeSalaryRecords");

            migrationBuilder.DropColumn(
                name: "TotalIncome",
                table: "EmployeeSalaryRecords");

            migrationBuilder.AlterColumn<int>(
                name: "EmployeeId",
                table: "EmployeeSalaryRecords",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_EmployeeSalaryRecords_Employees_EmployeeId",
                table: "EmployeeSalaryRecords",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
