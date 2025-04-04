"use client";
import Image from "next/image";
import searchSvg from "@/public/search.svg";
import { useProducts } from "@/app/stores/products";
import type { ChangeEvent } from "react";

export default function Filters() {
  const { filterProductsByName, filterProductsByCategory } = useProducts();

  const handleNameFilter = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;

    filterProductsByName(name);
  };

  const handleCategoryFilter = (e: ChangeEvent<HTMLInputElement>) => {
    const category = e.target.value;

    filterProductsByCategory(category);
  };
  return (
    <div className="flex md:flex-row flex-col gap-3 p-2 rounded bg-black/5">
      <label
        htmlFor="search-name"
        className="w-full flex justify-between p-1 rounded outline-2 outline-brand-1/60"
      >
        <input
          type="text"
          placeholder="Filtra los productos por nombre"
          id="search-name"
          aria-label="Barra de búsqueda por nombre"
          className="w-full focus:outline-none"
          onChange={handleNameFilter}
        />

        <Image src={searchSvg} alt="Icono para el campo de filtrado." />
      </label>

      <label
        htmlFor="search-category"
        className="w-full flex justify-between p-1 rounded outline-2 outline-brand-1/60"
      >
        <input
          type="text"
          placeholder="Filtra los productos por categoría"
          id="search-category"
          aria-label="Barra de búsqueda por categoría"
          className="w-full focus:outline-none"
          onChange={handleCategoryFilter}
        />
        <Image src={searchSvg} alt="Icono para el campo de filtrado." />
      </label>
    </div>
  );
}
