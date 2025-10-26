import knex from "knex";
import dotenv from "dotenv";

dotenv.config();

async function makeUserNullable() {
  const db = knex({
    client: "pg",
    connection: process.env.DB_LOCAL_URL!,
  });

  // Check if table exists
  const hasUsers = await db.schema.hasTable("users");
  if (!hasUsers) {
    console.log("❌ Table 'users' does not exist");
    await db.destroy();
    return;
  }

  // Alter column to allow NULL
  await db.schema.alterTable("users", (table) => {
    table.string("user").nullable().alter();
  });

  console.log("✅ Column 'user' is now nullable");
  await db.destroy();
}

makeUserNullable().catch(console.error);
