import knex from "knex";
import dotenv from "dotenv";

dotenv.config();

async function setup() {
  const dbUrl = process.env.DB_LOCAL_URL!;
  const dbName = "cartgroup";

  // 🧩 שלב 1: חיבור כללי (בלי DB ספציפי)
  const general = knex({
    client: "pg",
    connection: {
      host: "localhost",
      user: "postgres",
      password: "1124",
      port: 5432,
    },
  });

  // 🧠 בדיקה אם המסד קיים
  const exists = await general.raw(
    `SELECT 1 FROM pg_database WHERE datname = ?`,
    [dbName]
  );

  if (exists.rowCount === 0) {
    await general.raw(`CREATE DATABASE ${dbName}`);
    console.log(`✅ Database "${dbName}" created`);
  } else {
    console.log(`ℹ️ Database "${dbName}" already exists`);
  }

  await general.destroy();

  // 🧩 שלב 2: חיבור למסד הנתונים
  const db = knex({
    client: "pg",
    connection: dbUrl,
  });

  // 🧱 users table
  if (!(await db.schema.hasTable("users"))) {
    await db.schema.createTable("users", (table) => {
      table.increments("id").primary();
      table.string("user").notNullable().unique();
      table.timestamp("createdAt").defaultTo(db.fn.now());
    });
    console.log("✅ Table 'users' created");
  } else {
    console.log("ℹ️ Table 'users' already exists");
  }

  // 🧱 products table
  if (!(await db.schema.hasTable("products"))) {
    await db.schema.createTable("products", (table) => {
      table.increments("id");
      table.string("name").notNullable();
      table.decimal("price", 10, 2).notNullable();
      table.timestamp("createdAt").defaultTo(db.fn.now());
    });
    console.log("✅ Table 'products' created");
  } else {
    console.log("ℹ️ Table 'products' already exists");
  }

  // 🧱 carts table
  if (!(await db.schema.hasTable("carts"))) {
    await db.schema.createTable("carts", (table) => {
      table.increments("id").primary();
      table
        .integer("userId")
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
      table.string("status").defaultTo("in_cart");
      table.timestamp("createdAt").defaultTo(db.fn.now());
    });
    console.log("✅ Table 'carts' created");
  } else {
    console.log("ℹ️ Table 'carts' already exists");
  }

  // 🧱 cart_items table
  if (!(await db.schema.hasTable("cart_items"))) {
    await db.schema.createTable("cart_items", (table) => {
      table.increments("id");
      table
        .integer("cartId")
        .references("id")
        .inTable("carts")
        .onDelete("CASCADE");
      table
        .integer("productId")
        .references("id")
        .inTable("products")
        .onDelete("CASCADE");
      table.integer("quantity").notNullable().defaultTo(1);
      table.string("status").defaultTo("in_cart");
      table.timestamp("createdAt").defaultTo(db.fn.now());
    });
    console.log("✅ Table 'cart_items' created");
  } else {
    console.log("ℹ️ Table 'cart_items' already exists");
  }

  // 🍰 שלב 3: הכנסת מוצרים לדוגמה אם אין מוצרים בכלל
  const [{ count }] = await db("products").count("* as count");
  if (Number(count) === 0) {
    const demoProducts = [
      { name: "Chocolate Cake", price: 29.9 },
      { name: "Vanilla Ice Cream", price: 19.5 },
      { name: "Strawberry Tart", price: 25.0 },
    ];
    await db("products").insert(demoProducts);
    console.log("🍩 Inserted 3 demo products!");
  } else {
    console.log("ℹ️ Products already exist, skipping insert.");
  }

  console.log("🎉 All tables and demo data ready in 'cartgroup'");
  await db.destroy();
}

setup().catch(console.error);
