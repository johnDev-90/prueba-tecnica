"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { ProductsType } from "../types/Types";
import SingleProductCard from "../components/SingleProductCard";
import Link from "next/link";

const page = () => {
  const [product, setProduct] = useState<ProductsType | null>(null);

  console.log(product);

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    if (id) {
      get_productsById(id);
    }
  }, [id]);

  const get_productsById = async (id: string) => {
    try {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`,
        {
          method: "GET",
        },
      );

      const response = await result.json();

      setProduct(response);
    } catch (error) {
      console.log(error);
    }
  };

  if (!product) {
    return <p>Cargando producto...</p>;
  }

  return (
    <div className="w-full mx-auto">
      <div className="flex flex-row items-center gap-2 p-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
          />
        </svg>
        <Link
          className="text-base hover:translate-0 transition-all"
          href={"/store"}
        >
          Regresar
        </Link>
      </div>

      <SingleProductCard product={product} />
    </div>
  );
};

export default page;
