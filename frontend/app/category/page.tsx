"use client";

import React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ProductsType } from "../types/Types";
import ProductsCard from "../components/ProductsCard";
import Link from "next/link";

const page = () => {
  const [products, setProducts] = useState<ProductsType[]>();

  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  useEffect(() => {
    get_products_byCategory();
  }, []);

  const get_products_byCategory = async () => {
    try {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products?search=${category}`,
        {
          method: "GET",
        },
      );

      const response = await result.json();

      setProducts(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
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
        <Link className="text-base hover:translate-0 transition-all" href={"/"}>
          Regresar
        </Link>
      </div>

      <div className="w-full h-screen grid grid-cols-3 justify-center items-center p-4">
        {products?.map((p) => (
          <ProductsCard id={p.id} key={p.id} p={p} />
        ))}
      </div>
    </div>
  );
};

export default page;
