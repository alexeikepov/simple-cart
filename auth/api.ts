"use server";

import { db } from "@/config/db";
import { User } from "@/types/type";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function connectUser(data: any) {
  const username = data.username?.trim();

  let user = await db<User>("users").where("user", username).first();

  if (!user) {
    const [newUser] = await db<User>("users")
      .insert({ name: username })
      .returning("*");
    user = newUser;
  }

  const cookieStore = await cookies();
  cookieStore.set("user_id", "", { path: "/", maxAge: 0 });
  cookieStore.set("user_id", String(user.id), {
    path: "/",
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect("/shop");
}
