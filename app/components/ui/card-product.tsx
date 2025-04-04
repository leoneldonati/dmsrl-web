"use client";

import Image from "next/image";
import { useState } from "react";
import AddToCartModal from "./add-to-cart-modal";
import { useCartStore } from "@/app/stores/cart";

interface Props {
  product: Product;
}
export default function CardProduct({ product }: Props) {
  const { isInCart, deleteOne } = useCartStore();
  const { presentations } = product;
  const [modal, setModal] = useState(false);

  return (
    <article className="max-w-[180px] min-h-full w-full p-2 rounded-md flex flex-col flex-shrink-0 gap-3 ">
      <Image
        src={product.asset ? product.asset.secureUrl : ""}
        width={product.asset ? product.asset.width : undefined}
        height={product.asset ? product.asset.height : undefined}
        alt={product.name}
        aria-label="Fotografia del producto dentro de la tarjeta del producto."
        className="aspect-video w-full object-contain shadow-md shadow-brand-1/20 rounded-md"
      />
      <p className="truncate overflow-hidden whitespace-nowrap font-bold">
        {product.name.trim()}
      </p>

      <div className="flex flex-col gap-2 flex-1">
        <i className="text-black/60">Presentaciones:</i>
        <ul className="p-2 outline-2 outline-black/60 rounded-md">
          {presentations.map((presentation, index) => (
            <li
              key={index}
              className="flex  flex-col justify-between w-full border-b border-black/60 py-2"
            >
              <p>{presentation.presentation}</p>

              <strong className="text-end">
                ${presentation.price.toFixed(2)}
              </strong>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={() =>
          isInCart(product._id) ? deleteOne(product._id) : setModal(true)
        }
        aria-label={`Boton para agregar ${product.name} al carro`}
        title={`Boton para agregar ${product.name} al carro`}
        className="py-2 px-4 w-full rounded-md bg-brand-1 text-white font-bold outline-4 outline-transparent transition-colors hover:outline-brand-1 hover:bg-transparent cursor-pointer hover:text-brand-1"
      >
        {isInCart(product._id) ? "Quitar del carro" : "Añadir al carro"}
      </button>

      {/* ADD TO CART */}
      {modal && (
        <AddToCartModal product={product} close={() => setModal(false)} />
      )}
    </article>
  );
}
