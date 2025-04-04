"use client";
import Image from "next/image";
import DeleteSvg from "@/public/trash.svg";
interface Props {
  prod: ProductInCart;
  handleDelete: (id: string) => void;
}
export default function CartCard({ prod, handleDelete }: Props) {
  return (
    <li key={prod._id} className="w-full flex  justify-between">
      <Image
        src={prod.asset.secureUrl}
        width={prod.asset.width}
        height={prod.asset.height}
        alt={prod.name}
        className="w-14 h-14 aspect-square object-contain"
      />

      <div className="flex flex-col">
        <p>{prod.name}</p>

        <p className="flex items-center gap-4">
          <i>Cantidad: {prod.quantity}</i>
          <strong>${(prod.price * prod.quantity).toFixed(2)}</strong>
        </p>
      </div>

      <button
        title="Borrar del carrito"
        aria-label="Clickea aqui para borrar el producto del carrito"
        onClick={() => handleDelete(prod._id)}
      >
        <Image src={DeleteSvg} alt="Delete icon" />
      </button>
    </li>
  );
}
