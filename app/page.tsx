import ProductsFeed from "./components/ui/products-feed";
import CarouselAuto from "./components/ui/carousel-auto";
import Filters from "./components/ui/shared/filters";
import CartPage from "./components/ui/shared/cart";
import { hasCookies } from "./services/cookies";
import AddProductButton from "./components/add-product-button";
import { getProducts } from "./services/products";
import { Suspense } from "react";
import ProductsSkelleton from "./components/skelletons/product-skelleton";
export default async function Home() {
  const products = getProducts();
  const isAdmin = await hasCookies();
  return (
    <section className="min-h-screen  p-2 flex flex-col gap-3 relative">
      {isAdmin && (
        <p className="py-2 px-4 rounded bg-brand-2 text-black w-fit mx-auto sticky top-1 z-50">
          MODO ADMINISTRADOR
        </p>
      )}
      <CarouselAuto />
      <Filters />
      {isAdmin && <AddProductButton />}

      <CartPage />

      <Suspense fallback={<ProductsSkelleton />}>
        <ProductsFeed isAdmin={isAdmin} productsPromise={products} />
      </Suspense>
    </section>
  );
}
