import { getProducts } from "./services/products";
import { Suspense } from "react";
import ProductsFeed from "./components/ui/products-feed";
import CarouselAuto from "./components/ui/carousel-auto";
import Filters from "./components/ui/shared/filters";
import ProductsSkelleton from "./components/skelletons/product-skelleton";
import ToastClientContainer from "./components/ui/shared/toast-container";
export default function Home() {
  const products = getProducts();
  return (
    <section className="min-h-screen  overflow-hidden p-2 flex flex-col gap-3">
      <CarouselAuto />
      <Filters />

      <Suspense fallback={<ProductsSkelleton />}>
        <ProductsFeed productsPromise={products} />
      </Suspense>

      <ToastClientContainer />
    </section>
  );
}
