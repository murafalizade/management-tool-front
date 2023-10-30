using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplication1.Migrations
{
    public partial class mig_1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employees_Abilities_AbilityId",
                table: "Employees");

            migrationBuilder.DropForeignKey(
                name: "FK_Employees_ForeignLanguages_ForeignLanguageId",
                table: "Employees");

            migrationBuilder.DropForeignKey(
                name: "FK_Employees_ScientificDegrees_ScientificDegreeId",
                table: "Employees");

            migrationBuilder.DropIndex(
                name: "IX_Employees_AbilityId",
                table: "Employees");

            migrationBuilder.DropIndex(
                name: "IX_Employees_ForeignLanguageId",
                table: "Employees");

            migrationBuilder.DropIndex(
                name: "IX_Employees_ScientificDegreeId",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "AbilityId",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "ForeignLanguageId",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "ScientificDegreeId",
                table: "Employees");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AbilityId",
                table: "Employees",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ForeignLanguageId",
                table: "Employees",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ScientificDegreeId",
                table: "Employees",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Employees_AbilityId",
                table: "Employees",
                column: "AbilityId");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_ForeignLanguageId",
                table: "Employees",
                column: "ForeignLanguageId");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_ScientificDegreeId",
                table: "Employees",
                column: "ScientificDegreeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_Abilities_AbilityId",
                table: "Employees",
                column: "AbilityId",
                principalTable: "Abilities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_ForeignLanguages_ForeignLanguageId",
                table: "Employees",
                column: "ForeignLanguageId",
                principalTable: "ForeignLanguages",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_ScientificDegrees_ScientificDegreeId",
                table: "Employees",
                column: "ScientificDegreeId",
                principalTable: "ScientificDegrees",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
