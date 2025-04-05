"use client";

import { createSession } from "@/app/services/cookies";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import LoadSvg from "@/public/spiral.svg";
import { redirect } from "next/navigation";

export default function LoginForm() {
  const [state, action, pending] = useActionState(createSession, undefined);
  useEffect(() => {
    if (state?.error) {
      toast.error(state.message);
      return;
    }
    if (state && !state.error) {
      toast.success(state?.message);
      const timer = setTimeout(() => {
        redirect("/");
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [state]);
  return (
    <form
      action={action}
      className="flex flex-col gap-3 max-w-[200px] mx-auto my-4"
    >
      <label htmlFor="username">
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Ingresa tu nombre de usuario..."
          className="w-full p-2"
        />
      </label>

      <label htmlFor="password">
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Ingresa tu contraseña aquí..."
          className="w-full p-2"
        />
      </label>

      <button
        disabled={pending}
        className="px-4 py-2 rounded-md bg-brand-1 text-white flex items-center gap-1 justify-center"
      >
        {pending && (
          <Image src={LoadSvg} alt="Loading spin" className="animate-spin" />
        )}
        {pending ? "Iniciando sesión..." : "Iniciar sesión"}
      </button>
    </form>
  );
}
