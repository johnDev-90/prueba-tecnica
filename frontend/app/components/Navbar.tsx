"use client";
import React from "react";
import Link from "next/link";

const Navbar = () => {

  return (
    <nav className="w-full flex fixed absolute z-10">
      <ul className="menu bg-base-200 w-full text-lg flex flex-row p-4 gap-6">
        <li>
          <Link href={"/"}>Inicio</Link>
        </li>
        <li>
          <Link
            href={"/new"}
            className=" bg-blue-500 hover:bg-indigo-600 font-bold"
          >
            Crear nuevo producto
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
