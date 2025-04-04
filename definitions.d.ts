interface Asset {
  secureUrl: string;
  publicId: string;
  width: number;
  height: number;
}
interface Product {
  _id: Readonly<string>;
  name: Readonly<string>;
  category: Readonly<string>;
  createdAt: Readonly<Date>;
  asset: Readonly<Asset>;
  price: Readonly<number>;
  discount: Readonly<number>;
}
interface ProductInCart extends Product {
  quantity: Readonly<number>;
}
