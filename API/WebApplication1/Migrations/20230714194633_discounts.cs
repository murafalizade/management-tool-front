using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplication1.Migrations
{
    public partial class discounts : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Discounts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TaxPercentage = table.Column<int>(type: "int", nullable: false),
                    Dsmf = table.Column<int>(type: "int", nullable: false),
                    HealthInjurance = table.Column<int>(type: "int", nullable: false),
                    Food = table.Column<double>(type: "float", nullable: false),
                    Veteran = table.Column<double>(type: "float", nullable: false),
                    Disability = table.Column<double>(type: "float", nullable: false),
                    Chernobil = table.Column<double>(type: "float", nullable: false),
                    Martyr = table.Column<double>(type: "float", nullable: false),
                    Owner = table.Column<double>(type: "float", nullable: false),
                    Desert = table.Column<double>(type: "float", nullable: false),
                    VeteranTaxDiscount = table.Column<double>(type: "float", nullable: false),
                    MinWage = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Discounts", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Discounts");
        }
    }
}
