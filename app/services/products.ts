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
