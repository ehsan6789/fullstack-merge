using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Authdemo1.Migrations
{
    /// <inheritdoc />
    public partial class AddLeaveBalancesToEmployee : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AnnualLeaveBalance",
                table: "Employees",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "CasualLeaveBalance",
                table: "Employees",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "SickLeaveBalance",
                table: "Employees",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AnnualLeaveBalance",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "CasualLeaveBalance",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "SickLeaveBalance",
                table: "Employees");
        }
    }
}
