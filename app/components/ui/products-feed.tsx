"use client";
import { use, useEffect, useMemo } from "react";
import CardProduct from "./card-product";
import { useProducts } from "@/app/stores/products";

interface Props {
  productsPromise: Promise<Product[]>;
  isAdmin: boolean;
}
export default function ProductsFeed({ isAdmin, productsPromise }: Props) {
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
      className="overflow-x-auto relative "
      key={category + products?.length}
    >
      <h2 className="w-full sticky left-0  font-bold underline underline-offset-2  rounded-md">
        {category}
      </h2>
      <div className="flex flex-row gap-3  py-4 px-2">
        {products?.map((product) => (
          <CardProduct
            product={product}
            key={product._id.toString()}
            isAdmin={isAdmin}
          />
        ))}
      </div>
    </section>
  ));
}
