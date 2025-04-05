"use client";
import Image from "next/image";
import logotipo from "@/public/logo-vectorizado.avif";
import logotipoSinLetras from "@/public/LOGO-1.svg";
import menuSvg from "@/public/menu-deep.svg";
import cartSvg from "@/public/shopping-cart.svg";
import Link from "next/link";
import { useState } from "react";
import AsideMenu from "@/app/components/ui/aside-menu";
import { useCartStore } from "@/app/stores/cart";

export default function Header() {
  const [opened, setOpened] = useState(false);
  const { list, toggleOpened } = useCartStore();
  return (
    <header className="flex justify-between px-2 bg-brand-1 [&>button]:cursor-pointer">
      <button
        onClick={() => setOpened((value) => !value)}
        title="Mostrar menú desplegable"
        aria-label="Botón de menú"
      >
        <Image src={menuSvg} alt="Icono para el botón del menú" className="" />
      </button>
      <AsideMenu
        opened={opened}
        closeMenu={() => setOpened((value) => !value)}
      />
      <Link href="/" title="Ir al inicio">
        <Image
          src={logotipo}
          alt="Logotipo Distribuidora Multimarca vectorizado con detalles en el color del brand."
          className="max-w-[250px] w-full object-contain aspect-video scale-150 hidden md:inline-block"
          priority
        />
        <Image
          src={logotipoSinLetras}
          alt="Logotipo Distribuidora Multimarca vectorizado con detalles en el color del brand."
          className="max-w-[70px] md:hidden"
          priority
        />
      </Link>

      <button
        onClick={() => toggleOpened()}
        title="Abrir el carrito"
        aria-label="Botón de carrito"
        className="flex items-center gap-1 relative text-white"
      >
        <Image src={cartSvg} alt="Icono para el botón del carrito" />
        <span>{list.length > 99 ? "+99" : list.length}</span>
      </button>
    </header>
  );
}
