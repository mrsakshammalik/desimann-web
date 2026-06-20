"use server";

import { cookies } from "next/headers";

export async function loginAdmin(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (email === "malikksakshamm@gmail.com" && password === "Kanakismywife") {
    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set("admin_token", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });
    return { success: true };
  }

  return { success: false, error: "Invalid email or password" };
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_token");
  return { success: true };
}
