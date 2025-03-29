import Image from "next/image";

import baggioBrand from "@/public/brands/baggio.png";
import costaDelSolBrand from "@/public/brands/costa-del-sol.png";
import cremacBrand from "@/public/brands/cremac.png";
import dobleABrand from "@/public/brands/doble-a.png";
import markBrand from "@/public/brands/mark.png";
import marvavicBrand from "@/public/brands/marvavic.png";
import milkautBrand from "@/public/brands/milkaut.png";
import solDeCampoBrand from "@/public/brands/sol-de-campo.png";
import srPanBrand from "@/public/brands/sr-pan.png";
import tacuralBrand from "@/public/brands/tacura.png";
export default function Footer() {
  const brands = [
    baggioBrand,
    costaDelSolBrand,
    cremacBrand,
    dobleABrand,
    markBrand,
    marvavicBrand,
    milkautBrand,
    solDeCampoBrand,
    srPanBrand,
    tacuralBrand,
  ];
  return (
    <footer className="bg-black text-white flex flex-col gap-2 p-4 ">
      <p className="text-xl font-bold">
        Trabajamos con marcas top en el mercado.
      </p>

      <ul className="grid grid-cols-5 gap-4 items-center">
        {brands.map((brand, index) => (
          <Image
            src={brand}
            alt="Imagen del brand"
            key={index}
            className="aspect-square object-contain object-center"
          />
        ))}
      </ul>

      <div className="w-full outline outline-white/50 my-2"></div>
      <p className="text-xl font-bold">Seguinos en nuestras redes:</p>

      <ul className="flex flex-row gap-2">
        <li>
          <a
            href="https://www.instagram.com/marklocal.sanlorenzo/"
            rel="noreferrer noopener"
            target="_blank"
            title="Visita nuestro Instagram!"
            className="transition-colors hover:bg-accent p-1 rounded-full flex"
          ></a>
        </li>
      </ul>
    </footer>
  );
}
