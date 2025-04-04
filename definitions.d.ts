interface Presentation {
  id: Readonly<string>;
  presentation: Readonly<string>;
  price: Readonly<number>;
  quantity: number;
}
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
  presentations: Presentation[];
  asset: Readonly<Asset>;
}
