import Image from "next/image";
import LockSvg from "@/public/lock-access.svg";
import LoginForm from "@/app/components/ui/login-form";
export default function LoginPage() {
  return (
    <section className="w-full">
      <h2 className="flex items-center gap-2 justify-center text-2xl">
        <Image src={LockSvg} alt="" />
        Inicia sesión de administrador
      </h2>
      <p className="max-w-[300px] mx-auto rounded p-2 text-center bg-brand-1/20 text-brand-1 font-bold animate-pulse">
        ¡ESTA SECCIÓN SOLO PUEDE USARLA EL ADMINISTRADOR DEL SITIO!
      </p>
      <LoginForm />
    </section>
  );
}
