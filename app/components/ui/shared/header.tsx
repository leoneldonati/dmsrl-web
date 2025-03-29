"use client";
import Image from "next/image";
import logotipo from "@/public/logo-vectorizado.png";
import menuSvg from "@/public/menu-deep.svg";
import menuSvgBlack from "@/public/menu-2.svg";
import cartSvg from "@/public/shopping-cart.svg";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [opened, setOpened] = useState(false);
  return (
    <header className="flex justify-between p-2 bg-brand-1 [&>button]:cursor-pointer ">
      <button
        onClick={() => setOpened((value) => !value)}
        title="Mostrar menú desplegable"
        aria-label="Botón de menú"
      >
        <Image src={menuSvg} alt="Icono para el botón del menú" className="" />
      </button>
      <aside
        className="fixed left-0 top-0 h-screen px-3 py-6 z-50 transition-transform -translate-x-full bg-white flex flex-col items-start gap-6"
        style={{
          transform: `translateX(${opened ? 0 : 100}%)`,
        }}
      >
        <button
          onClick={() => setOpened((value) => !value)}
          title="Mostrar menú desplegable"
          aria-label="Botón de menú"
        >
          <Image src={menuSvgBlack} alt="Icono para el botón del menú" />
        </button>
        <ul className="flex flex-col gap-3">
          <li>
            <Link
              href="/"
              className="bg-brand-1/20 text-brand-1 px-4 py-2 rounded-xl"
            >
              Inicio
            </Link>
          </li>
          <li>
            <Link href="/comestibles">Comestibles</Link>
          </li>
          <li>
            <Link href="/ingredientes">Ingredientes</Link>
          </li>
          <li>
            <Link href="/pollos">Pollos</Link>
          </li>
        </ul>
      </aside>
      <Link href="/" title="Ir al inicio">
        <Image
          src={logotipo}
          alt="Logotipo Distribuidora Multimarca vectorizado con detalles en el color del brand."
          className="max-w-[250px]"
          priority
        />
      </Link>

      <button title="Abrir el carrito" aria-label="Botón de carrito">
        <Image src={cartSvg} alt="Icono para el botón del carrito" />
      </button>
    </header>
  );
}
