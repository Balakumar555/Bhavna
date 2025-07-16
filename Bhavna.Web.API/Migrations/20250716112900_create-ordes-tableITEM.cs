using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Bhavna.Web.API.Migrations
{
    /// <inheritdoc />
    public partial class createordestableITEM : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "orderItems",
                columns: table => new
                {
                    Id = table.Column<long>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    OrderId = table.Column<long>(type: "INTEGER", nullable: true),
                    ProductId = table.Column<long>(type: "INTEGER", nullable: true),
                    ProductName = table.Column<string>(type: "TEXT", nullable: true),
                    ProductSku = table.Column<string>(type: "TEXT", nullable: true),
                    UnitPrice = table.Column<decimal>(type: "TEXT", nullable: true),
                    DiscountedPrice = table.Column<decimal>(type: "TEXT", nullable: true),
                    Quantity = table.Column<int>(type: "INTEGER", nullable: true),
                    TotalPrice = table.Column<decimal>(type: "TEXT", nullable: true),
                    VariantInfo = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_orderItems", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "orderItems");
        }
    }
}
