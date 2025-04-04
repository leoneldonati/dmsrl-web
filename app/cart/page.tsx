"use client";
import Image from "next/image";
import AlertSvg from "@/public/calendar-exclamation.svg";
import CloseSvg from "@/public/square-x.svg";
import MailFastSvg from "@/public/mail-fast.svg";
import { useCartStore } from "../stores/cart";
import CartCard from "../components/ui/cart-card";
import { useState } from "react";
import { createMsg } from "../utils/msg";

export default function CartPage() {
  const [alertModal, setAlertModal] = useState(true);
  const { list, getTotal } = useCartStore();

  return (
    <section className="flex flex-col gap-3 px-2 py-4 relative">
      <h2 className="text-2xl font-bold underline underline-offset-4 text-center">
        Tú carrito
      </h2>

      <p className="bg-brand-1 rounded px-4 py-2 text-white w-fit mx-auto">
        Total: <strong>${getTotal()}</strong>
      </p>

      <div
        hidden={!alertModal}
        className=" bg-brand-2/80 flex flex-col max-w-xs mx-auto p-2 rounded-md"
      >
        <button onClick={() => setAlertModal(false)} className="cursor-pointer">
          <Image
            src={CloseSvg}
            alt="Ícono de cierre de tarjeta"
            className="w-6 h-6"
          />
        </button>
        <Image
          src={AlertSvg}
          alt="Ícono de alerta de entrega de pedidos"
          className="w-20 h-20 animate-pulse mx-auto"
        />
        <p className="text-center">
          Los envíos se realizan <strong>LUNES, MIÉRCOLES y VIERNES</strong>
        </p>
      </div>

      <div className="flex flex-col items-center">
        {list.map((prod) => (
          <CartCard product={prod} key={prod._id} />
        ))}
      </div>

      <a
        href={`https://api.whatsapp.com/send?number=3417502479&text=${encodeURIComponent(
          createMsg(list)
        )}`}
        aria-label="Clickea este botón para enviar el pedido"
        title="Enviar pedido"
        className="fixed bottom-4 right-3 bg-green-100 px-4 py-2 flex items-center gap-2 rounded-md text-green-500 border border-green-500 cursor-pointer transition-transform hover:scale-105"
      >
        <Image src={MailFastSvg} alt="Icono de mail rapido" />
        Enviar pedido
      </a>
    </section>
  );
}
