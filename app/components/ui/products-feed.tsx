"use client";
import { useProducts } from "@/app/stores/products";
import { use, useEffect } from "react";

interface Props {
  productsPromise: Promise<Product[]>;
}
export default function ProductsFeed({ productsPromise }: Props) {
  const obtainedProducts = use(productsPromise);
  const { products, addProducts } = useProducts();

  useEffect(() => {
    addProducts(obtainedProducts);
  }, []);
  return (
    <section>
      {products.map((product) => (
        <article key={product._id.toString()}>
          <p>{product.name}</p>
        </article>
      ))}
    </section>
  );
}
