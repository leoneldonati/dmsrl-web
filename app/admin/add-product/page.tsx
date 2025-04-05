import ProductForm from "@/app/components/ui/product-form";
import { hasCookies } from "@/app/services/cookies";
import { redirect } from "next/navigation";

export default async function AddProductPage() {
  const isAdmin = await hasCookies();
  if (!isAdmin) return redirect("/");

  return (
    <section className="w-full py-4">
      {isAdmin && (
        <p className="py-2 px-4 rounded bg-brand-2 text-black w-fit mx-auto sticky top-1 z-50">
          MODO ADMINISTRADOR
        </p>
      )}
      <h2 className="text-center text-2xl my-4">Rellena los campos</h2>
      <ProductForm />
    </section>
  );
}
