import { db } from "@/config/db";
import { User } from "@/types/type";
import { cookies } from "next/headers";

export async function getUser() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("user_id")?.value;
  if (!userId || isNaN(Number(userId))) {
    console.log("No valid user_id cookie found. Returning null.");
    return null;
  }
  const user = await db<User>("users").where("id", Number(userId)).first();
  console.log("user", user);
  return user;
}
