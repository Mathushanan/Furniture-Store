using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class V2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "RoomDesigns",
                columns: table => new
                {
                    RoomId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    RoomSize = table.Column<float>(type: "real", nullable: false),
                    WallHeight = table.Column<float>(type: "real", nullable: false),
                    WallThickness = table.Column<float>(type: "real", nullable: false),
                    WallColor = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    WallTexture = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    FloorTexture = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    ViewMode = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: true, defaultValue: "3D")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RoomDesigns", x => x.RoomId);
                    table.ForeignKey(
                        name: "FK_RoomDesigns_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Furnitures",
                columns: table => new
                {
                    FurnitureId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoomId = table.Column<int>(type: "int", nullable: false),
                    Type = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    PositionX = table.Column<float>(type: "real", nullable: false),
                    PositionY = table.Column<float>(type: "real", nullable: false),
                    PositionZ = table.Column<float>(type: "real", nullable: false),
                    Color = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    SizeWidth = table.Column<float>(type: "real", nullable: true),
                    SizeHeight = table.Column<float>(type: "real", nullable: true),
                    SizeLength = table.Column<float>(type: "real", nullable: true),
                    Shade = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Shadow = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Furnitures", x => x.FurnitureId);
                    table.ForeignKey(
                        name: "FK_Furnitures_RoomDesigns_RoomId",
                        column: x => x.RoomId,
                        principalTable: "RoomDesigns",
                        principalColumn: "RoomId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Furnitures_RoomId",
                table: "Furnitures",
                column: "RoomId");

            migrationBuilder.CreateIndex(
                name: "IX_RoomDesigns_UserId",
                table: "RoomDesigns",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Furnitures");

            migrationBuilder.DropTable(
                name: "RoomDesigns");
        }
    }
}
