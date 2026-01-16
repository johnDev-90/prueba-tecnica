"use client";
import React from "react";
import { ProductsType } from "../types/Types";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Link from "next/link";

type ProductTypeProps = {
  product: ProductsType;
};

const SingleProductCard = ({ product }: ProductTypeProps) => {
  const router = useRouter();

  function handleClick(id: number) {
    Swal.fire({
      title: "Estas seguro?",
      text: "No podras revertir esta accion!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const result = fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`,
          {
            method: "DELETE",
          },
        );

        Swal.fire({
          title: "Eliminado!",
          text: "Producto Eliminado correctamente.",
          icon: "success",
        }).then(() => {
          router.push("/store");
        });
      }
    });
  }

  return (
    <div className="w-full  h-full">
      <div className="card lg:card-side bg-base-100 shadow-sm md:w-[50%] mx-auto mt-[10rem]">
        <figure>
          <img src={product.image} alt="Album" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{product.name}</h2>
          <p>{product.description}</p>
          <div className="card-actions justify-end mt-4 ">
            <Link
              href={`updateProduct?id=${product.id}`}
              className="btn btn-primary"
            >
              Editar
            </Link>
            <button
              onClick={(e) => handleClick(product.id)}
              className="btn btn-error "
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductCard;
