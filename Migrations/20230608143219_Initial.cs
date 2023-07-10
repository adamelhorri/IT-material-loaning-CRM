using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DistributionAPI.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "admin",
                columns: table => new
                {
                    id_admin = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    username = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    password = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    title = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_admin", x => x.id_admin);
                });

            migrationBuilder.CreateTable(
                name: "purchase",
                columns: table => new
                {
                    po_purchase = table.Column<int>(type: "int", nullable: false),
                    status_purchase = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    available_purchase = table.Column<bool>(type: "bit", nullable: true),
                    date_delivery_purchase = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_purchase", x => x.po_purchase);
                });

            migrationBuilder.CreateTable(
                name: "teuser",
                columns: table => new
                {
                    id_user = table.Column<int>(type: "int", nullable: false),
                    name_user = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    fname_user = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    title_user = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    location_user = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    email_user = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    departement_user = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_teuser", x => x.id_user);
                });

            migrationBuilder.CreateTable(
                name: "article",
                columns: table => new
                {
                    sn_article = table.Column<int>(type: "int", nullable: false),
                    name_article = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    description_article = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    price_article = table.Column<int>(type: "int", nullable: false),
                    available_article = table.Column<bool>(type: "bit", nullable: true),
                    type_article = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    po_purchase = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_article", x => x.sn_article);
                    table.ForeignKey(
                        name: "FK_article_purchase_po_purchase",
                        column: x => x.po_purchase,
                        principalTable: "purchase",
                        principalColumn: "po_purchase",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "attribution",
                columns: table => new
                {
                    id_attribution = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    sn_article = table.Column<int>(type: "int", nullable: true),
                    id_user = table.Column<int>(type: "int", nullable: false),
                    po_purchase = table.Column<int>(type: "int", nullable: true),
                    comment_attribution = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    status_attribution = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    date_attribution = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_attribution", x => x.id_attribution);
                    table.ForeignKey(
                        name: "FK_attribution_article_sn_article",
                        column: x => x.sn_article,
                        principalTable: "article",
                        principalColumn: "sn_article");
                    table.ForeignKey(
                        name: "FK_attribution_purchase_po_purchase",
                        column: x => x.po_purchase,
                        principalTable: "purchase",
                        principalColumn: "po_purchase");
                    table.ForeignKey(
                        name: "FK_attribution_teuser_id_user",
                        column: x => x.id_user,
                        principalTable: "teuser",
                        principalColumn: "id_user",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_article_po_purchase",
                table: "article",
                column: "po_purchase");

            migrationBuilder.CreateIndex(
                name: "IX_attribution_id_user",
                table: "attribution",
                column: "id_user");

            migrationBuilder.CreateIndex(
                name: "IX_attribution_po_purchase",
                table: "attribution",
                column: "po_purchase");

            migrationBuilder.CreateIndex(
                name: "IX_attribution_sn_article",
                table: "attribution",
                column: "sn_article");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "admin");

            migrationBuilder.DropTable(
                name: "attribution");

            migrationBuilder.DropTable(
                name: "article");

            migrationBuilder.DropTable(
                name: "teuser");

            migrationBuilder.DropTable(
                name: "purchase");
        }
    }
}
