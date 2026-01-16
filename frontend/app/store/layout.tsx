import React from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";


const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main>
      <div className="">

          <Navbar />
          {children}
     
      </div>
    </main>
  );
};

export default layout;
