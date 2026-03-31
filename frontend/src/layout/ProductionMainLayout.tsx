import Navbar from "@/components/Navbar";
import React from "react";

interface ProductionMainLayoutProps {
  children: React.ReactNode;
}

const ProductionMainLayout: React.FC<ProductionMainLayoutProps> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main className="">{children}</main>
      
    </div>
  );
};

export default ProductionMainLayout;
