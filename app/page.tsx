import Image from "next/image";
import { getProducts } from "./services/products";
import searchSvg from "@/public/search.svg";
import { Suspense } from "react";
import ProductsFeed from "./components/ui/products-feed";
import CarouselAuto from "./components/ui/carousel-auto";
export default async function Home() {
  // const products = getProducts();
  return (
    <section className="min-h-screen">
      <CarouselAuto />
      <label
        htmlFor="search-name"
        className="flex justify-between p-1 rounded outline-2 outline-brand-1/60"
      >
        <input
          type="text"
          placeholder="Filtra los productos por nombre"
          id="search-name"
          aria-label="Barra de búsqueda por nombre"
          className="w-full focus:outline-none"
        />

        <Image src={searchSvg} alt="Icono para el campo de filtrado." />
      </label>

      <Suspense fallback={<strong>CARGANDO PRODUCTOS...</strong>}>
        {/* <ProductsFeed productsPromise={products} /> */}
      </Suspense>
    </section>
  );
}
