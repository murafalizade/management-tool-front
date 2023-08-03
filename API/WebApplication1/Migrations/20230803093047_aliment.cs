using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplication1.Migrations
{
    public partial class aliment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "XIMonths",
                table: "EmployeeSalaryRecords",
                newName: "KirayeQat");

            migrationBuilder.RenameColumn(
                name: "XIDays",
                table: "EmployeeSalaryRecords",
                newName: "FamilyCount");

            migrationBuilder.RenameColumn(
                name: "Kiraye",
                table: "EmployeeSalaryRecords",
                newName: "KirayePrice");

            migrationBuilder.AddColumn<double>(
                name: "AlimentPercentage",
                table: "EmployeeSalaryRecords",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<int>(
                name: "KirayeId",
                table: "EmployeeSalaryRecords",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Kiraye",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Price = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Kiraye", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeSalaryRecords_KirayeId",
                table: "EmployeeSalaryRecords",
                column: "KirayeId");

            migrationBuilder.AddForeignKey(
                name: "FK_EmployeeSalaryRecords_Kiraye_KirayeId",
                table: "EmployeeSalaryRecords",
                column: "KirayeId",
                principalTable: "Kiraye",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EmployeeSalaryRecords_Kiraye_KirayeId",
                table: "EmployeeSalaryRecords");

            migrationBuilder.DropTable(
                name: "Kiraye");

            migrationBuilder.DropIndex(
                name: "IX_EmployeeSalaryRecords_KirayeId",
                table: "EmployeeSalaryRecords");

            migrationBuilder.DropColumn(
                name: "AlimentPercentage",
                table: "EmployeeSalaryRecords");

            migrationBuilder.DropColumn(
                name: "KirayeId",
                table: "EmployeeSalaryRecords");

            migrationBuilder.RenameColumn(
                name: "KirayeQat",
                table: "EmployeeSalaryRecords",
                newName: "XIMonths");

            migrationBuilder.RenameColumn(
                name: "KirayePrice",
                table: "EmployeeSalaryRecords",
                newName: "Kiraye");

            migrationBuilder.RenameColumn(
                name: "FamilyCount",
                table: "EmployeeSalaryRecords",
                newName: "XIDays");
        }
    }
}
