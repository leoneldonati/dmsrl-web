"use client";
import Image from "next/image";
import AlertSvg from "@/public/calendar-exclamation.svg";
import CloseSvg from "@/public/square-x.svg";
import MailFastSvg from "@/public/mail-fast.svg";
import { useCartStore } from "@/app/stores/cart";
import { useState } from "react";
import CartCard from "../cart-card";
import createMsg from "@/app/utils/msg";

export default function CartPage() {
  const [alertModal, setAlertModal] = useState(true);
  const { list, opened, getTotal, deleteOne, toggleOpened } = useCartStore();

  return (
    <section
      style={{
        transform: `translateX(${opened ? "0" : "100"}%)`,
      }}
      className="fixed right-0  transition-transform top-0 z-50 flex flex-col w-full  gap-3 px-2 py-4 bg-white h-screen"
    >
      <button onClick={toggleOpened} className="cursor-pointer">
        <Image
          src={CloseSvg}
          alt="Ícono de cierre de tarjeta"
          className="w-6 h-6"
        />
      </button>
      <h2 className="text-2xl font-bold underline underline-offset-4 text-center">
        Tú carrito
      </h2>

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

      <div className="flex justify-between items-center">
        <p className="italic text-black/40">- {list.length} productos.</p>

        <p className="">
          Total: <strong>${getTotal().toFixed(2)}</strong>
        </p>
      </div>
      <ul>
        {list.map((prod) => (
          <CartCard prod={prod} key={prod._id} handleDelete={deleteOne} />
        ))}
      </ul>
      <a
        href={`https://api.whatsapp.com/send?number=3417502479&text=${createMsg(
          list,
          { encodeMsg: true }
        )}`}
        aria-label="Clickea este botón para enviar el pedido"
        title="Enviar pedido"
        className=" bg-green-100 px-4 py-2 flex items-center gap-2 rounded-md text-green-500 border border-green-500 cursor-pointer transition-transform hover:scale-105"
      >
        <Image src={MailFastSvg} alt="Icono de mail rapido" />
        Enviar pedido
      </a>
    </section>
  );
}
