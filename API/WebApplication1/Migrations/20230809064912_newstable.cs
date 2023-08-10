using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplication1.Migrations
{
    public partial class newstable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ElmiDerece",
                table: "Employees");

            migrationBuilder.AddColumn<int>(
                name: "VeteranQat",
                table: "EmployeeSalaryRecords",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ElmiDereceId",
                table: "Employees",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ElmiDereces",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    For5to10Salary = table.Column<int>(type: "int", nullable: false),
                    For10to15Salary = table.Column<int>(type: "int", nullable: false),
                    For15to20Salary = table.Column<int>(type: "int", nullable: false),
                    For20Salary = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ElmiDereces", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Employees_ElmiDereceId",
                table: "Employees",
                column: "ElmiDereceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_ElmiDereces_ElmiDereceId",
                table: "Employees",
                column: "ElmiDereceId",
                principalTable: "ElmiDereces",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employees_ElmiDereces_ElmiDereceId",
                table: "Employees");

            migrationBuilder.DropTable(
                name: "ElmiDereces");

            migrationBuilder.DropIndex(
                name: "IX_Employees_ElmiDereceId",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "VeteranQat",
                table: "EmployeeSalaryRecords");

            migrationBuilder.DropColumn(
                name: "ElmiDereceId",
                table: "Employees");

            migrationBuilder.AddColumn<string>(
                name: "ElmiDerece",
                table: "Employees",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
