"use client";
import { useCartStore } from "@/app/stores/cart";
import Image from "next/image";
interface Props {
  product: Product;
}
export default function CartCard({ product }: Props) {
  const { deleteOne } = useCartStore();
  const { presentations } = product;
  return (
    <article className="  w-full p-2 rounded-md flex flex-row flex-shrink-0 gap-3  items-center justify-between">
      <div className="flex flex-col-reverse gap-1 max-w-[150px]">
        <Image
          src={product.asset ? product.asset.secureUrl : ""}
          width={product.asset ? product.asset.width : undefined}
          height={product.asset ? product.asset.height : undefined}
          alt={product.name}
          aria-label="Fotografia del producto dentro de la tarjeta del producto."
          className="aspect-square w-full object-cover  shadow-md shadow-brand-1/20 rounded-md"
        />
        <p className="truncate overflow-hidden whitespace-nowrap font-bold">
          {product.name.trim()}
        </p>
      </div>

      <ul className="p-2 outline-2 outline-black/60 rounded-md flex flex-col w-full">
        {presentations.map((presentation, index) => (
          <li
            key={index}
            className="flex  flex-col  flex-shrink-0 justify-between w-full border-b border-black/60 py-2"
          >
            <p className="truncate overflow-hidden whitespace-nowrap ">
              {presentation.presentation}{" "}
              <span>{`(${presentation.quantity})`}</span>
            </p>

            <strong className="text-end">
              ${(presentation.price * presentation.quantity).toFixed(2)}
            </strong>
          </li>
        ))}
      </ul>

      <button
        onClick={() => deleteOne(product._id)}
        aria-label={`Boton para agregar ${product.name} al carro`}
        title={`Boton para agregar ${product.name} al carro`}
        className="py-2 px-4 w-full rounded-md bg-brand-1 text-white font-bold outline-4 outline-transparent transition-colors hover:outline-brand-1 hover:bg-transparent cursor-pointer hover:text-brand-1"
      >
        Quitar
      </button>
    </article>
  );
}
