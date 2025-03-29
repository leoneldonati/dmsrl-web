"use client";
import Image from "next/image";
import Link from "next/link";
import menuSvgBlack from "@/public/menu-2.svg";

interface Props {
  closeMenu: () => void;
  opened: boolean;
}
export default function AsideMenu({ closeMenu, opened }: Props) {
  return (
    <aside
      className="fixed left-0 top-0 h-screen px-3 py-6 z-50 transition-transform -translate-x-full bg-white flex flex-col items-start gap-6"
      style={{
        transform: `translateX(${!opened ? 0 : 100}%)`,
      }}
    >
      <button
        onClick={closeMenu}
        title="Mostrar menú desplegable"
        aria-label="Botón de menú"
      >
        <Image src={menuSvgBlack} alt="Icono para el botón del menú" />
      </button>
      <ul className="flex flex-col gap-3 [&>li]:w-full">
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
  );
}
