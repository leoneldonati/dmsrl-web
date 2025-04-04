import { create } from "zustand";

interface FilterOptions {
  category: string;
  name: string;
}
interface ProductsStore {
  products: Readonly<Array<Product>>;
  inmutableCopy: Readonly<Array<Product>>;
  addOneProduct: (product: Product) => void;
  addProducts: (products: Product[]) => void;
  filterProductsByCategory: (category: string) => void;
  filterProductsByName: (name: string) => void;
  filterBy: ({ category, name }: FilterOptions) => void;
}
export const useProducts = create<ProductsStore>((set, get) => ({
  products: [],
  inmutableCopy: [],
  addOneProduct: (prod) => {
    const { products } = get();

    const newListOfProducts = [...products, prod];

    set({ products: newListOfProducts });
  },
  addProducts: (products) => {
    set({ products, inmutableCopy: products });
  },
  filterProductsByCategory: (category) => {
    const { products, inmutableCopy } = get();

    const filteredList = products.filter((prod) =>
      prod.category.toLowerCase().includes(category.toLowerCase())
    );

    set({ products: category.trim() === "" ? inmutableCopy : filteredList });
  },
  filterProductsByName: (name) => {
    const { products, inmutableCopy } = get();

    const filteredList = products.filter((prod) =>
      prod.name.toLowerCase().includes(name.toLowerCase())
    );

    set({ products: name.trim() === "" ? inmutableCopy : filteredList });
  },
  filterBy: ({ category, name }) => {
    const { products } = get();

    const filteredList = products.filter(
      (prod) =>
        prod.name.toLowerCase().includes(name.toLowerCase()) &&
        prod.category.toLowerCase().includes(category.toLowerCase())
    );

    set({ products: filteredList });
  },
}));
