import React from "react";
import Link from "next/link";

type CardProps = {
  id: number;
  p: string;
};

const CardCategory = ({ id, p }: CardProps) => {
  return (
    <Link
      href={`/category?category=${p}`}
      className="card bg-base-100 image-full w-96 shadow-sm "
    >
      <div className="card-body hover:translate-0.5 hover:bg-black transition-all cursor-pointer">
        <p className="card-title text-2xl flex justify-center text-center w-full">
          {p}
        </p>
      </div>
    </Link>
  );
};

export default CardCategory;
