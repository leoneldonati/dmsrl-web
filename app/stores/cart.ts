import { create } from "zustand";

/* 
TODO:
 1 - setear el store en el localstorage para mantener el estado del carrito
 2 - Arreglar los tipos de la store
*/
interface CartStore {
  list: Array<object>;
  addToCart: (payload: object) => void;
}
export const useCartStore = create<CartStore>((set, get) => ({
  list: [],
  addToCart: (payload) => {
    const { list } = get();

    const newCartList = [...list, payload];

    set({ list: newCartList });
  },
}));
