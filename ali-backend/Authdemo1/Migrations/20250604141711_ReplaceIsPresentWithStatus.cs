﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Authdemo1.Migrations
{
    /// <inheritdoc />
    public partial class ReplaceIsPresentWithStatus : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "Attendances",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "Attendances");
        }
    }
}
