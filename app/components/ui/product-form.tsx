"use client";

import { addProduct } from "@/app/services/products";
import Image from "next/image";
import { type ChangeEvent, useActionState, useEffect, useState } from "react";
import { toast } from "react-toastify";
import PngSvg from "@/public/png.svg";
import { useProducts } from "@/app/stores/products";
import LoadSvg from "@/public/spiral.svg";

export default function ProductForm() {
  const [state, action, pending] = useActionState(addProduct, undefined);
  const [temporalAssetUrl, setTemporalAssetUrl] = useState("");
  const { addOneProduct } = useProducts();
  const handleAssetChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (!files) return;

    const file = files.item(0);
    if (!file) return;

    const temporal = URL.createObjectURL(file);

    setTemporalAssetUrl(temporal);
  };
  useEffect(() => {
    if (state && state.error) {
      toast.error(state.message);
      URL.revokeObjectURL(temporalAssetUrl);
      setTemporalAssetUrl("");
    }

    if (state && !state.error && state.insertedProduct) {
      toast.success(state.message);
      URL.revokeObjectURL(temporalAssetUrl);
      setTemporalAssetUrl("");
      addOneProduct(state.insertedProduct);
    }
  }, [state]);
  return (
    <form
      action={action}
      className="max-w-[250px] w-full mx-auto flex flex-col gap-2 items-center border-2 border-brand-2/60 p-2 rounded-md"
    >
      <label
        htmlFor="asset"
        className="aspect-square border-2 border-brand-2 rounded-md grid place-items-center overflow-hidden"
      >
        <input
          onChange={handleAssetChange}
          hidden
          type="file"
          accept="image/*"
          id="asset"
          name="asset"
        />

        {temporalAssetUrl ? (
          <Image
            src={temporalAssetUrl}
            alt={temporalAssetUrl}
            width={200}
            height={52}
            className="w-full aspect-square object-contain"
          />
        ) : (
          <Image src={PngSvg} alt="" className="animate-pulse" />
        )}
      </label>
      <label htmlFor="name">
        <input
          type="name"
          id="name"
          name="name"
          placeholder="Nombre del producto"
          className="w-full focus:outline-none p-2"
        />
      </label>
      <label htmlFor="category">
        <input
          type="text"
          id="category"
          name="category"
          placeholder="Categoría"
          className="w-full focus:outline-none p-2"
        />
      </label>
      <label htmlFor="price">
        <input
          type="number"
          id="price"
          name="price"
          min={0}
          placeholder="Precio ej: 20750"
          className="w-full focus:outline-none p-2"
        />
      </label>
      <label htmlFor="discount">
        <input
          type="number"
          id="discount"
          name="discount"
          min={0}
          placeholder="Descuento ej: 20"
          className="w-full focus:outline-none p-2"
        />
      </label>

      <button
        disabled={pending}
        className="bg-brand-2 px-4 py-2 rounded-md flex items-center gap-2"
      >
        {pending && (
          <Image
            src={LoadSvg}
            alt="Loading spin"
            className="animate-spin bg-amber-600 rounded-full"
          />
        )}
        {pending ? "Guardando producto..." : "Guardar producto"}
      </button>
    </form>
  );
}
