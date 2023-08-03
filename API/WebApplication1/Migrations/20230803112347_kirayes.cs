using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplication1.Migrations
{
    public partial class kirayes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EmployeeSalaryRecords_Kiraye_KirayeId",
                table: "EmployeeSalaryRecords");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Kiraye",
                table: "Kiraye");

            migrationBuilder.RenameTable(
                name: "Kiraye",
                newName: "Kirayes");

            migrationBuilder.AlterColumn<int>(
                name: "KirayeId",
                table: "EmployeeSalaryRecords",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Kirayes",
                table: "Kirayes",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_EmployeeSalaryRecords_Kirayes_KirayeId",
                table: "EmployeeSalaryRecords",
                column: "KirayeId",
                principalTable: "Kirayes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EmployeeSalaryRecords_Kirayes_KirayeId",
                table: "EmployeeSalaryRecords");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Kirayes",
                table: "Kirayes");

            migrationBuilder.RenameTable(
                name: "Kirayes",
                newName: "Kiraye");

            migrationBuilder.AlterColumn<int>(
                name: "KirayeId",
                table: "EmployeeSalaryRecords",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Kiraye",
                table: "Kiraye",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_EmployeeSalaryRecords_Kiraye_KirayeId",
                table: "EmployeeSalaryRecords",
                column: "KirayeId",
                principalTable: "Kiraye",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
