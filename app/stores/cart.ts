import { create } from "zustand";
import { persist } from "zustand/middleware";
/* 
TODO:
 1 - setear el store en el localstorage para mantener el estado del carrito
 2 - Arreglar los tipos de la store
*/
interface CartStore {
  list: Array<Product>;
  addToCart: (payload: Product) => void;
  isInCart: (id: string) => boolean;
  deleteOne: (id: string) => void;
  deleteAllCart: () => void;
  getTotal: () => number;
}
export const useCartStore = create(
  persist<CartStore>(
    (set, get) => ({
      list: [],
      addToCart: (payload) => {
        const { list } = get();

        const newCartList = [...list, payload];

        set({ list: newCartList });
      },
      isInCart: (id) => {
        const { list } = get();

        return list.find((prod) => prod._id === id) !== undefined;
      },
      deleteOne: (id) => {
        const { list } = get();

        const filtered = list.filter((prod) => prod._id !== id);

        set({ list: filtered });
      },
      deleteAllCart: () => {
        set({ list: [] });
      },
      getTotal: () => {
        const { list } = get();

        return list.reduce(
          (acc, value) =>
            acc +
            value.presentations.reduce((a, v) => a + v.price * v.quantity, 0),
          0
        );
      },
    }),
    { name: "cart-dmsrl" }
  )
);
