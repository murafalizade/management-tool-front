using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplication1.Migrations
{
    public partial class employeeSalaryDiscount : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Discount",
                table: "EmployeeSalaryRecords");

            migrationBuilder.AddColumn<int>(
                name: "DiscountId",
                table: "EmployeeSalaryRecords",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeSalaryRecords_DiscountId",
                table: "EmployeeSalaryRecords",
                column: "DiscountId");

            migrationBuilder.AddForeignKey(
                name: "FK_EmployeeSalaryRecords_Discounts_DiscountId",
                table: "EmployeeSalaryRecords",
                column: "DiscountId",
                principalTable: "Discounts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EmployeeSalaryRecords_Discounts_DiscountId",
                table: "EmployeeSalaryRecords");

            migrationBuilder.DropIndex(
                name: "IX_EmployeeSalaryRecords_DiscountId",
                table: "EmployeeSalaryRecords");

            migrationBuilder.DropColumn(
                name: "DiscountId",
                table: "EmployeeSalaryRecords");

            migrationBuilder.AddColumn<double>(
                name: "Discount",
                table: "EmployeeSalaryRecords",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }
    }
}
