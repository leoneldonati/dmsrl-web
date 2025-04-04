import { create } from "zustand";
import { persist } from "zustand/middleware";
/* 
TODO:
 1 - setear el store en el localstorage para mantener el estado del carrito
 2 - Arreglar los tipos de la store
*/
interface CartStore {
  list: Array<ProductInCart>;
  opened: boolean;
  toggleOpened: () => void;
  addToCart: (payload: ProductInCart) => void;
  isInCart: (id: string) => boolean;
  deleteOne: (id: string) => void;
  deleteAllCart: () => void;
  getTotal: () => number;
}
export const useCartStore = create(
  persist<CartStore>(
    (set, get) => ({
      list: [],
      opened: false,
      toggleOpened: () => {
        const { opened, list } = get();
        if (list.length === 0) return set({ opened: false });
        set({ opened: !opened });
      },
      addToCart: (payload) => {
        const { list, isInCart } = get();
        if (isInCart(payload._id)) {
          const mapped = list.map((prod) => {
            if (prod._id === payload._id)
              return { ...prod, quantity: prod.quantity + 1 };
            return prod;
          });

          set({ list: mapped });

          return;
        }
        const newCartList = [...list, payload];

        set({ list: newCartList, opened: true });
      },
      isInCart: (id) => {
        const { list } = get();

        return list.find((prod) => prod._id === id) !== undefined;
      },
      deleteOne: (id) => {
        const { list } = get();

        const filtered = list.filter((prod) => prod._id !== id);

        set({ list: filtered, opened: filtered.length !== 0 });
      },
      deleteAllCart: () => {
        set({ list: [] });
      },
      getTotal: () => {
        const { list } = get();

        return list.reduce(
          (acc, value) => acc + value.price * value.quantity,
          0
        );
      },
    }),
    { name: "cart-dmsrl" }
  )
);
