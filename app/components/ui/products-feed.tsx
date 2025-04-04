"use client";
import { useProducts } from "@/app/stores/products";
import { use, useEffect, useMemo } from "react";
import CardProduct from "./card-product";

interface Props {
  productsPromise: Promise<Product[]>;
}
export default function ProductsFeed({ productsPromise }: Props) {
  const obtainedProducts = use(productsPromise);
  const { products, addProducts } = useProducts();

  const groupedByCategoryArray = useMemo(() => {
    const groupedByCategory = Object.groupBy(products, (prod) => prod.category);

    const groupedByCategoryArray = Object.entries(groupedByCategory).map(
      ([category, products]) => ({ category, products })
    );
    return groupedByCategoryArray;
  }, [products]);

  useEffect(() => {
    addProducts(obtainedProducts);
  }, []);
  return groupedByCategoryArray.map(({ category, products }) => (
    <section
      className="overflow-x-scroll relative "
      key={category + products?.length}
    >
      <h2 className="w-full sticky left-0 bg-gradient-to-r font-bold  from-brand-2/80 to-brand-1 p-2 text-2xl rounded-md">
        {category}
      </h2>
      <div className="flex flex-row gap-3 ">
        {products?.map((product) => (
          <CardProduct product={product} key={product._id.toString()} />
        ))}
      </div>
    </section>
  ));
}
