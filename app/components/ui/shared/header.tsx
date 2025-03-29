"use client";
import Image from "next/image";
import logotipo from "@/public/logo-vectorizado.png";
import menuSvg from "@/public/menu-deep.svg";
import cartSvg from "@/public/shopping-cart.svg";
export default function Header() {
  return (
    <header className="flex justify-between p-2 bg-brand-1 [&>button]:cursor-pointer">
      <button aria-label="Botón de menú">
        <Image src={menuSvg} alt="Icono para el botón del menú" />
      </button>

      <Image
        src={logotipo}
        alt="Logotipo Distribuidora Multimarca vectorizado con detalles en el color del brand."
        className="max-w-[250px]"
      />

      <button aria-label="Botón de carrito">
        <Image src={cartSvg} alt="Icono para el botón del carrito" />
      </button>
    </header>
  );
}
