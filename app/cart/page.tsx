"use client";
import Image from "next/image";
import AlertSvg from "@/public/calendar-exclamation.svg";
import { useCartStore } from "../stores/cart";
import CartCard from "../components/ui/cart-card";

export default function CartPage() {
  const { list, getTotal } = useCartStore();
  return (
    <section className="flex flex-col gap-3 px-2">
      <h2 className="text-2xl font-bold underline underline-offset-4 text-center">
        Tú carrito
      </h2>

      <p className="  bg-brand-1 rounded px-4 py-2 text-white w-fit mx-auto">
        Total: <strong>${getTotal()}</strong>
      </p>

      <div className=" bg-brand-2/80 flex flex-col place-items-center max-w-xs mx-auto p-2 rounded-md">
        <Image
          src={AlertSvg}
          alt="Ícono de alerta de entrega de pedidos"
          className="w-20 h-20 animate-pulse"
        />
        <p className="text-center">
          Los envíos se realizan <strong>LUNES, MIÉRCOLES y VIERNES</strong>
        </p>
      </div>
      <div className="flex flex-col">
        {list.map((prod) => (
          <CartCard product={prod} key={prod._id} />
        ))}
      </div>
    </section>
  );
}
