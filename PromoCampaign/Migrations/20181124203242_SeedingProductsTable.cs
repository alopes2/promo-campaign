using Microsoft.EntityFrameworkCore.Migrations;

namespace PromoCampaign.Migrations
{
    public partial class SeedingProductsTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        
        {
            migrationBuilder.Sql("INSERT INTO Products (Name) VALUES ('Coca-Cola')");
            migrationBuilder.Sql("INSERT INTO Products (Name) VALUES ('Nestle')");
            migrationBuilder.Sql("INSERT INTO Products (Name) VALUES ('Netflix')");
            migrationBuilder.Sql("INSERT INTO Products (Name) VALUES ('Nintendo')");

        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM Products WHERE Name IN ('Coca-Cola', 'Nestle', 'Netflix', 'Nintendo')");

        }
    }
}
