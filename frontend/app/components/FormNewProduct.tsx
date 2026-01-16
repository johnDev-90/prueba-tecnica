"use client";

import { useState } from "react";
import { showToast } from "nextjs-toast-notify";

const FormNewProduct = () => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "Electronics",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
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
        `${process.env.NEXT_PUBLIC_API_URL}/products`,
        {
          method: "POST",
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

      showToast.success("¡Producto creado con éxito!", {
        duration: 4000,
        progress: true,
        position: "top-center",
        transition: "bounceIn",
        icon: "",
        sound: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card  bg-base-100 shadow-xl p-8 w-full max-w-lg mx-auto space-y-6"
    >
      <h2 className="text-2xl font-bold">Crear Producto</h2>

      <div className="grid grid-cols-4 items-center gap-4">
        <label className="text-sm font-medium">Nombre</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="input input-bordered col-span-3"
          placeholder="Reloj de pared"
          required
        />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <label className="text-sm font-medium">Precio</label>
        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          className="input input-bordered col-span-3"
          required
        />
      </div>

      <div className="grid grid-cols-4 gap-4">
        <label className="text-sm font-medium pt-2">Descripción</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="textarea textarea-bordered col-span-3"
          required
        />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <label className="text-sm font-medium">Categoría</label>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="select select-bordered col-span-3"
        >
          <option>Electronics</option>
          <option>Clothing</option>
          <option>Home</option>
          <option>Accessories</option>
          <option>Sport</option>
        </select>
      </div>

      <button className="btn btn-primary w-full mt-4">Guardar Producto</button>
    </form>
  );
};

export default FormNewProduct;
