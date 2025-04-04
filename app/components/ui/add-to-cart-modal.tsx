"use client";

import Image from "next/image";
import closeSvg from "@/public/square-x.svg";
import { useState } from "react";
import { useCartStore } from "@/app/stores/cart";
import { toast } from "react-toastify";

interface Props {
  product: Product;
  close: () => void;
}
export default function AddToCartModal({ product, close }: Props) {
  const [modificable, setModificable] = useState({
    ...product,
    presentations: [] as Presentation[],
  });
  const { addToCart } = useCartStore();
  const isAdded = (id: string) => {
    return (
      modificable.presentations.find((pres) => pres.id === id) !== undefined
    );
  };
  const handleAddToCart = () => {
    const hasNotPresentationsSelected = modificable.presentations.length === 0;
    if (hasNotPresentationsSelected)
      return toast.error("Debes seleccionar al menos 1 (una) presentacion!");

    addToCart(modificable);
    close();
    toast.success("Producto añadido al carro");
  };

  return (
    <dialog className="fixed top-0 left-0 z-50 bg-black/20 w-full h-screen grid place-items-center px-2">
      <form className="bg-white p-2 rounded-md flex flex-col gap-3 max-w-sm w-full">
        <button
          type="button"
          onClick={close}
          aria-label="Cerrar modal"
          className="cursor-pointer"
        >
          <Image src={closeSvg} alt={product.name} />
        </button>
        <Image
          src={product.asset ? product.asset.secureUrl : ""}
          width={product.asset ? product.asset.width : undefined}
          height={product.asset ? product.asset.height : undefined}
          alt={product.name}
          priority
          className="aspect-video object-contain shadow-md shadow-black/20 rounded-md"
        />
        <h3 className="text-xl underline underline-offset-2 truncate overflow-hidden whitespace-nowrap">
          {product.name}
        </h3>
        <div className="flex flex-col gap-2 flex-1">
          <i className="text-black/60">
            Selecciona la presentacion:{" "}
            <span>
              {modificable.presentations.length.toString() + " (seleccionados)"}{" "}
            </span>
          </i>
          <ul className="flex flex-col gap-2">
            {product.presentations.map((presentation, index) => (
              <li
                key={index}
                onClick={() =>
                  setModificable((prev) => {
                    if (isAdded(presentation.id))
                      return {
                        ...prev,
                        presentations: prev.presentations.filter(
                          (pres) => pres.id !== presentation.id
                        ),
                      };

                    return {
                      ...prev,
                      presentations: [
                        ...prev.presentations,
                        { ...presentation, quantity: 1 },
                      ],
                    };
                  })
                }
                style={{
                  borderColor: isAdded(presentation.id)
                    ? "var(--color-brand-1)"
                    : "transparent",
                }}
                title={`Añadir ${presentation.presentation}`}
                className="flex border-4 border-transparent  flex-col justify-between w-full  p-2 cursor-pointer rounded-md"
              >
                <div className="w-full flex flex-col">
                  <p>{presentation.presentation}</p>

                  <strong className="text-end">
                    ${presentation.price.toFixed(2)}
                  </strong>
                </div>

                <label htmlFor="quantity" className="w-full">
                  <input
                    id="quantity"
                    type="number"
                    min={0}
                    step="0"
                    placeholder="Ingresa la cantidad..."
                    className="w-full focus:outline-none"
                    onChange={(e) =>
                      setModificable((prev) => ({
                        ...prev,
                        presentations: prev.presentations.map((pres) => {
                          if (pres.id === presentation.id)
                            return {
                              ...pres,
                              quantity: Number(e.target.value),
                            };
                          return pres;
                        }),
                      }))
                    }
                  />
                </label>
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={handleAddToCart}
          aria-label="Añadir este producto al carrito"
          title="Añadir al carro"
          type="button"
          className="px-4 py-2 rounded-md bg-brand-1 w-full text-white cursor-pointer"
        >
          AÑADIR
        </button>
      </form>
    </dialog>
  );
}
