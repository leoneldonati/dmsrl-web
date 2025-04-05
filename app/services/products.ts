"use server";

import { productsModel } from "../db";
import { productSchema } from "../libs/zod";
import { convertFile } from "../libs/sharp";
import { uploadFile } from "../libs/cld";

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
export const addProduct = async (formState: unknown, formData: FormData) => {
  const { name, asset, category, price, discount } =
    Object.fromEntries(formData);

  const file = asset as File;
  const arrayBuffer = await file.arrayBuffer();

  // VALIDAR LOS CAMPOS
  try {
    productSchema.parse({
      name,
      category,
      price: Number(price.toString()),
      discount: Number(discount.toString()),
    });
  } catch (e) {
    if (e instanceof Error) {
      const issues = JSON.parse(e.message);

      return {
        error: true,
        message: "Error en la validación de los campos.",
        issues,
      };
    }
  }
  if (arrayBuffer.byteLength === 0)
    return {
      error: true,
      message: "Debes seleccionar una fotoproducto",
    };
  // OPTIMIZAR Y SUBIR ARCHIVOS
  const { buffer: convertedBuffer } = await convertFile(arrayBuffer, {
    format: "avif",
  });

  if (!convertedBuffer)
    return {
      error: true,
      message: "Error al intentar optimizar el archivo",
    };
  const { uploadedAsset } = await uploadFile(convertedBuffer, file.type);

  if (!uploadedAsset)
    return {
      error: true,
      message: "Error al intentar subir el archivo optimizado",
    };

  const newProduct: ProductWithoutId = {
    name: name.toString(),
    category: category.toString(),
    asset: uploadedAsset,
    createdAt: new Date(),
    discount: Number(discount.toString()),
    price: Number(price.toString()),
  };

  const { insertedId } = await productsModel.insertOne(newProduct);

  return {
    error: false,
    message: `¡${name} añadido!`,
    insertedProduct: {
      ...newProduct,
      _id: insertedId.toString(),
    } as Product,
  };
};
