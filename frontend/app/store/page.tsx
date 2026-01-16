import React from "react";
import { get_products } from "./lib/api";
import ProductsCard from "../components/ProductsCard";
import { ProductsType } from "../types/Types";

const page = async () => {
  const products: ProductsType[] = await get_products();

  if (!products.length) {
    return (
      <p className="text-3xl text-center flex justify-center">
        No hay productos para mostrar..
      </p>
    );
  }

  return (
    <div className="w-full">
      <div className="w-full h-screen md:grid md:grid-cols-2 lg:grid-cols-4 p-4">
        {products.map((p) => (
          <ProductsCard id={p.id} key={p.id} p={p} />
        ))}
      </div>
    </div>
  );
};

export default page;
