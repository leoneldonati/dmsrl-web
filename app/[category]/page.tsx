import CardProduct from "../components/ui/card-product";
import mock from "@/public/mock.json";
export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  const products = mock.filter(
    (prod) => prod.category === decodeURIComponent(category)
  ) as unknown as Product[];
  return (
    <section className="w-full flex flex-col gap-3 py-2">
      <div className="flex items-center justify-center gap-2">
        <h2 className="underline underline-offset-4 text-2xl">
          {decodeURIComponent(category)}
        </h2>
        <span>{products.length} productos.</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 place-items-center gap-1 max-w-[700px] mx-auto">
        {products.map((prod) => (
          <CardProduct product={prod} key={prod._id} />
        ))}
      </div>
    </section>
  );
}
