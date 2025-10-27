import { db } from "@/config/db";
import { User } from "@/types/type";
import { cookies } from "next/headers";

export async function getUser() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("user_id")?.value;
  const user = await db<User>("users").where("id", Number(userId)).first();
  return user;
}
