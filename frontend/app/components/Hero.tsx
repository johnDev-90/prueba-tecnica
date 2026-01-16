import React from "react";
import "aos/dist/aos.css";
import Link from "next/link";
import { get_products } from "../store/lib/api";
import { ProductsType } from "../types/Types";
import CardCategory from "./CardCategory";

const Hero = async () => {
  const products: ProductsType[] = await get_products();

  const categories = products.reduce<string[]>((acc, item) => {
    if (!acc.includes(item.category)) {
      acc.push(item.category);
    }

    return acc;
  }, []);

  if (!categories.length) {
    return <p>Cargando la pagina...</p>;
  }

  return (
    <div>
      <div className="hero-content flex flex-row lg:flex-row-reverse w-full mt-8">
        <div className="  h-full w-full lg:w-[80%] flex flex-col items-center">
          <h1 className="text-3xl lg:text-5xl font-bold">
            Todo lo que necesitas, en un solo lugar!
          </h1>
          <p className="py-7 text-center text-xl font-light">
            Descubre una tienda donde la tecnología y el estilo se unen.
            Ofrecemos productos variados que se adaptan a tu día a día, con
            calidad, innovación y comodidad.
          </p>
          <Link
            href={"/store"}
            className="btn btn-primary w-full lg:w-[25rem] hover:bg-indigo-700 transition-all p-7 rounded-4xl text-lg "
          >
            Ver nuestros productos
          </Link>
        </div>
      </div>

      <h2 className="text-3xl text-center font-light py-8 h-full">
        Categorias Destacadas
      </h2>

      <div className="w-full flex flex-col gap-4 md:grid grid-cols-2 lg:grid-cols-3 ">
        {categories.length ? (
          categories.map((p, index) => (
            <CardCategory key={index} id={index} p={p} />
          ))
        ) : (
          <h1>No hay nada que mostrar</h1>
        )}
      </div>
    </div>
  );
};

export default Hero;
