import Link from "next/link";

export default function AddProductButton() {
  return (
    <Link
      href="/admin/add-product"
      className="px-4 py-2 rounded bg-brand-2 text-center"
    >
      Añadir producto
    </Link>
  );
}
