"use server";

import { cookies } from "next/headers";

export async function hasCookies() {
  const cookie = (await cookies()).get("admin-session");
  if (!cookie) return false;

  return true;
}
