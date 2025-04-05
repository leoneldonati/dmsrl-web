"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { adminModel } from "../db";

const COOKIE_NAME = "admin-session";
export async function hasCookies() {
  const cookie = (await cookies()).get(COOKIE_NAME);
  if (!cookie) return false;

  return true;
}

export async function createSession(formState: unknown, formData: FormData) {
  const { username, password } = Object.fromEntries(formData);

  if (!username.toString().trim() || !password.toString().trim())
    return {
      error: true,
      message: "¡Debe enviar el usuario y la contraseña!",
    };
  const admin = await adminModel.findOne({ username });

  if (admin === null)
    return {
      error: true,
      message: "¡Solo el administrador tiene acceso!",
    };

  const isAdminId = admin._id.toJSON() === process.env.ID_ADMIN;

  if (!isAdminId)
    return {
      error: true,
      message: "¡El ID del administrador no coincide!",
    };
  const sessionPayload = {
    username,

    loggedAt: new Date(),
  };
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const token = jwt.sign(sessionPayload, process.env.PRIVATE_KEY ?? "", {
    expiresIn: Date.now() + 7 * 24 * 60 * 60 * 1000,
  });

  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });

  return {
    error: false,
    message: "¡Sesión iniciada!",
  };
}

export async function clearSession() {
  const cookieStore = await cookies();

  cookieStore.delete(COOKIE_NAME);
}
