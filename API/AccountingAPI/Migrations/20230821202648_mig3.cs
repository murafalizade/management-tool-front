using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplication1.Migrations
{
    public partial class mig3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Confidentiality",
                table: "EmployeeSalaryRecords");

            migrationBuilder.DropColumn(
                name: "Harmfulness",
                table: "EmployeeSalaryRecords");

            migrationBuilder.DropColumn(
                name: "Representing",
                table: "EmployeeSalaryRecords");

            migrationBuilder.RenameColumn(
                name: "IsVocationGiven",
                table: "EmployeeSalaryRecords",
                newName: "IsVacationGiven");

            migrationBuilder.AddColumn<int>(
                name: "ConfidentialityPercentage",
                table: "EmployeeSalaryRecords",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "HarmfulnessPercentage",
                table: "EmployeeSalaryRecords",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "IsBPMGiven",
                table: "EmployeeSalaryRecords",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "RepresentingPercentage",
                table: "EmployeeSalaryRecords",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ConfidentialityPercentage",
                table: "EmployeeSalaryRecords");

            migrationBuilder.DropColumn(
                name: "HarmfulnessPercentage",
                table: "EmployeeSalaryRecords");

            migrationBuilder.DropColumn(
                name: "IsBPMGiven",
                table: "EmployeeSalaryRecords");

            migrationBuilder.DropColumn(
                name: "RepresentingPercentage",
                table: "EmployeeSalaryRecords");

            migrationBuilder.RenameColumn(
                name: "IsVacationGiven",
                table: "EmployeeSalaryRecords",
                newName: "IsVocationGiven");

            migrationBuilder.AddColumn<double>(
                name: "Confidentiality",
                table: "EmployeeSalaryRecords",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Harmfulness",
                table: "EmployeeSalaryRecords",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Representing",
                table: "EmployeeSalaryRecords",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }
    }
}
