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
    <article className="w-full max-w-[250px] md:max-w-[800px] rounded-md grid grid-cols-1 md:grid-cols-5 gap-4 p-4">
      {/* Imagen del producto */}
      <Image
        src={product.asset ? product.asset.secureUrl : ""}
        width={product.asset ? product.asset.width : undefined}
        height={product.asset ? product.asset.height : undefined}
        alt={product.name}
        aria-label="Fotografía del producto dentro de la tarjeta del producto."
        className="aspect-square w-full object-contain md:max-w-[150px] shadow-md shadow-brand-1/20 rounded-md col-span-1"
      />

      {/* Lista de presentaciones */}
      <ul className="p-2 outline-2 outline-black/60 rounded-md flex flex-col w-full h-full overflow-y-auto col-span-1 md:col-span-2">
        {presentations.map((presentation, index) => (
          <li
            key={index}
            className="flex flex-col flex-shrink-0 justify-between w-full border-b border-black/60 py-2"
          >
            <p className="truncate overflow-hidden whitespace-nowrap">
              {presentation.presentation}{" "}
              <span>{`(${presentation.quantity})`}</span>
            </p>
            <strong className="text-end">
              ${(presentation.price * presentation.quantity).toFixed(2)}
            </strong>
          </li>
        ))}
      </ul>

      {/* Nombre del producto */}
      <div className="col-span-1 md:col-span-2 md:col-start-4 outline-2 outline-black/60 rounded-md grid place-items-center p-2">
        <p className="truncate overflow-hidden whitespace-nowrap font-bold text-xl text-center">
          {product.name.trim()}
        </p>
      </div>

      {/* Botón de quitar */}
      <button
        onClick={() => deleteOne(product._id)}
        aria-label={`Botón para quitar ${product.name} del carro`}
        title={`Botón para quitar ${product.name} del carro`}
        className="py-2 px-4 col-span-1 md:col-span-2 md:col-start-4 w-full rounded-md bg-brand-1 text-white font-bold outline-4 outline-transparent transition-colors hover:outline-brand-1 hover:bg-transparent cursor-pointer hover:text-brand-1"
      >
        Quitar
      </button>
    </article>
  );
}
