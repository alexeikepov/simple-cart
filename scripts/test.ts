import "dotenv/config";
import { db } from "./db_conn.js";

db.raw("SELECT NOW()")
  .then((r) => console.log(r.rows))
  .finally(() => db.destroy());
