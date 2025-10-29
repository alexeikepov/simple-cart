import { db } from "@/config/db";
import { User } from "@/types/type";
import { cookies } from "next/headers";

export async function getUser() {
  const cookieStore = await cookies();
  let userId = cookieStore.get("user_id")?.value;
  if (!userId) userId = "1";

  const user = await db<User>("users").where("id", Number(userId)).first();
  // console.log("user", user);
  return user;
}
