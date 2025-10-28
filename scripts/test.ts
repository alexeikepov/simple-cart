import "dotenv/config";
import { db } from "./db_conn";

async function setup() {
  if (!(await db.schema.hasTable("users"))) {
    await db.schema.createTable("users", (table) => {
      table.increments("id").primary();
      table.string("user").unique();
      table.boolean("isAdmin").defaultTo(false);
      table.timestamp("createdAt").defaultTo(db.fn.now());
    });
    console.log("✅ Table 'users' created");
  } else {
    console.log("ℹ️ Table 'users' already exists");

    const hasIsAdmin = await db.schema.hasColumn("users", "isAdmin");
    if (!hasIsAdmin) {
      await db.schema.alterTable("users", (table) => {
        table.boolean("isAdmin").defaultTo(false);
      });
      console.log("🆕 Column 'isAdmin' added to 'users'");
    } else {
      console.log("ℹ️ Column 'isAdmin' already exists");
    }
  }

  await db.destroy();
}

setup().catch(console.error);
