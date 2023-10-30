using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplication1.Migrations
{
    public partial class mig5 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Positions_Ranks_RankId",
                table: "Positions");

            migrationBuilder.DropIndex(
                name: "IX_Positions_RankId",
                table: "Positions");

            migrationBuilder.DropColumn(
                name: "RankId",
                table: "Positions");

            migrationBuilder.AddColumn<string>(
                name: "RankName",
                table: "Positions",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RankName",
                table: "Positions");

            migrationBuilder.AddColumn<int>(
                name: "RankId",
                table: "Positions",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Positions_RankId",
                table: "Positions",
                column: "RankId");

            migrationBuilder.AddForeignKey(
                name: "FK_Positions_Ranks_RankId",
                table: "Positions",
                column: "RankId",
                principalTable: "Ranks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
