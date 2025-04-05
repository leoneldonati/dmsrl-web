"use client";

import Image from "next/image";
import { useState } from "react";
import { useCartStore } from "@/app/stores/cart";
import OfferSvg from "@/public/shopping-bag-discount.svg";
interface Props {
  product: Product;
  isAdmin: boolean;
}
export default function CardProduct({ product }: Props) {
  const { addToCart } = useCartStore();
  const [cartProduct, setCartProduct] = useState<ProductInCart>({
    ...product,
    quantity: 1,
  });
  const getPriceWithoutDiscount = () =>
    (product.price + product.discount).toFixed(2);
  const getPrice = () => product.price.toFixed(2);

  return (
    <article className="max-w-[220px] min-h-full w-full p-2 rounded-md flex flex-col flex-shrink-0 gap-3 bg-white">
      <div className="relative">
        <Image
          src={product.asset.secureUrl}
          alt={product.name}
          width={product.asset.width}
          height={product.asset.height}
          aria-label="Fotografia del producto dentro de la tarjeta del producto."
          className="aspect-square w-full object-contain  rounded-md bg-white"
        />

        <div className="absolute top-0 left-0 text-white z-20 flex flex-row items-center gap-1 bg-brand-1 p-1 rounded text-xs">
          <Image src={OfferSvg} alt="Icono" className="w-4 h-4" /> OFERTA
        </div>
      </div>

      <p className="truncate overflow-hidden whitespace-nowrap ">
        {product.name.trim()}
      </p>

      <div className="flex items-center gap-1 ">
        <span className="text-xl text-red-500">${getPrice()}</span>
        <span className="line-through text-black/50">
          ${getPriceWithoutDiscount()}
        </span>
      </div>

      <div className="flex rounded-2xl max-w-full overflow-hidden">
        <div className="flex bg-black/10 items-center [&>button]:text-4xl [&>button]:cursor-pointer px-2">
          <button
            onClick={() =>
              setCartProduct((prev) => {
                return {
                  ...prev,
                  quantity: prev.quantity === 1 ? 1 : prev.quantity - 1,
                };
              })
            }
          >
            -
          </button>
          <input
            type="number"
            className="flex w-10 focus:outline-none mx-2 text-center text-xl text-black"
            value={cartProduct.quantity}
            placeholder={cartProduct.quantity.toString()}
            min={0}
            onChange={({ target }) =>
              setCartProduct((prev) => ({
                ...prev,
                quantity: Number(
                  target.value === "" || target.value === "0" ? 1 : target.value
                ),
              }))
            }
          />
          <button
            onClick={() =>
              setCartProduct((prev) => ({
                ...prev,
                quantity: prev.quantity + 1,
              }))
            }
          >
            +
          </button>
        </div>
        <button
          onClick={() => addToCart(cartProduct)}
          aria-label={`Boton para agregar ${product.name} al carro`}
          title={`Boton para agregar ${product.name} al carro`}
          className="py-2 px-4 w-full rounded-md bg-brand-1 text-white font-bold outline-2 outline-transparent cursor-pointer hover:bg-brand-1/80"
        >
          Agregar
        </button>
      </div>
    </article>
  );
}
