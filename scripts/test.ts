import "dotenv/config";
import { db } from "./db_conn";

async function setup() {
  // if (!(await db.schema.hasTable("users"))) {
  //   await db.schema.createTable("users", (table) => {
  //     table.increments("id").primary();
  //     table.string("user").unique();
  //     table.boolean("isAdmin").defaultTo(false);
  //     table.timestamp("createdAt").defaultTo(db.fn.now());
  //   });
  //   console.log("✅ Table 'users' created");
  // } else {
  //   console.log("ℹ️ Table 'users' already exists");

  //   const hasIsAdmin = await db.schema.hasColumn("users", "isAdmin");
  //   if (!hasIsAdmin) {
  //     await db.schema.alterTable("users", (table) => {
  //       table.boolean("isAdmin").defaultTo(false);
  //     });
  //     console.log("🆕 Column 'isAdmin' added to 'users'");
  //   } else {
  //     console.log("ℹ️ Column 'isAdmin' already exists");
  //   }
  // }

  const res = await db.raw(`
    SELECT
        c.id AS cart_id,
        c.user_id,
        c.status AS cart_status,
        ci.id AS cart_item_id,
        ci.quantity,
        p.id AS product_id,
        p.name AS product_name,
    FROM
        carts c
    JOIN
        cart_items ci ON c.id = ci.cart_id
    JOIN
        products p ON ci.product_id = p.id
    WHERE
        c.status = 'active';
  `);
  console.log(res, "res");

  await db.destroy();
}

setup().catch(console.error);
