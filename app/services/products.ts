"use server";

import { productsModel } from "../db";

export const getProducts: () => Promise<Product[]> = async () => {
  const products = await productsModel.find({}).toArray();

  const mapped = products.map((product) => ({
    ...product,
    _id: product._id.toString(),
  })) as Product[];

  return mapped;
};
export const getProductsByCategory = async (category: string) => {
  try {
    const products = await productsModel.find({ category }).toArray();

    return products.map((prod) => ({
      ...prod,
      _id: prod._id.toString(),
    })) as unknown as Product[];
  } catch {
    return [];
  }
};
export const addProduct: (
  payload: ProductWithoutId
) => Promise<unknown> = async () => {};
