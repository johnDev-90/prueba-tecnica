"use client";

import { useState, useEffect } from "react";
import { showToast } from "nextjs-toast-notify";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ProductsType } from "../types/Types";
import { useRouter } from "next/navigation";

const FormNewProduct = () => {
  const router = useRouter();
  const [product, setProduct] = useState<ProductsType>();
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
  });

  const searchparams = useSearchParams();
  const id = searchparams.get("id");

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        price: String(product.price),
        description: product.description,
        category: product.category,
      });
    }
  }, [product]);

  useEffect(() => {
    if (id) {
      get_product(id);
    }
  }, [id]);

  const get_product = async (id: string) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name: form.name,
      price: Number(form.price),
      description: form.description,
      category: form.category,
    };

    console.log(payload);

    try {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      const response = await result.json();

      if (!result.ok) {
        showToast.error("¡Algo Salio mal. Intentalo de nuevo!", {
          duration: 4000,
          progress: true,
          position: "bottom-center",
          transition: "bounceIn",
          icon: "",
          sound: true,
        });
      }

      showToast.success("¡Producto Actualizado con correctamente!", {
        duration: 4000,
        progress: true,
        position: "top-center",
        transition: "bounceIn",
        icon: "",
        sound: true,
      });

      setTimeout(() => {
        router.push("/store");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card bg-base-100 shadow-xl p-8 w-full max-w-lg mx-auto space-y-6"
    >
      <h2 className="text-2xl font-bold">Editar Producto</h2>

      <div className="grid grid-cols-4 items-center gap-4">
        <label className="text-sm font-medium">Nombre</label>
        <input
          name="name"
          value={form.name}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, name: e.target.value }))
          }
          className="input input-bordered col-span-3"
          placeholder="Reloj de pared"
        />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <label className="text-sm font-medium">Precio</label>
        <input
          name="price"
          type="number"
          value={form.price}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, price: e.target.value }))
          }
          className="input input-bordered col-span-3"
        />
      </div>

      <div className="grid grid-cols-4 gap-4">
        <label className="text-sm font-medium pt-2">Descripción</label>
        <textarea
          name="description"
          value={form.description}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, description: e.target.value }))
          }
          className="textarea textarea-bordered col-span-3"
        />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <label className="text-sm font-medium">Categoría</label>
        <select
          name="category"
          value={form.category}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, category: e.target.value }))
          }
          className="select select-bordered col-span-3"
        >
          <option>Electronics</option>
          <option>Clothing</option>
          <option>Home</option>
          <option>Accessories</option>
          <option>Sport</option>
        </select>
      </div>

      <button className="btn btn-primary w-full mt-4">Guardar Cambios</button>
      <Link className="btn btn-error w-full mt-4" href={"/store"}>
        Cancelar
      </Link>
    </form>
  );
};

export default FormNewProduct;
