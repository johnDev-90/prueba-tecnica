import React from "react";
import Link from "next/link";

import { ProductsType } from "../types/Types";

type PropsType = {
  id: number;
  p: ProductsType;
};

const ProductsCard = ({ p }: PropsType) => {
  return (
    <div className="card bg-base-100 w-[20rem] p-4 shadow-sm ">
      <figure>
        <img src={p.image} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{p.name}</h2>
        <p>{p.description}</p>
        <span className="text-2xl text-indigo-700 font-bold">${p.price}</span>
        <div className="card-actions justify-end">
          <Link href={`/products?id=${p.id}`} className="btn btn-primary">
            Ver detalles
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductsCard;
