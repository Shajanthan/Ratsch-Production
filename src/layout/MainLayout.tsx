import Navbar from "@/components/Navbar";
import React from "react";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main className="">{children}</main>
      
    </div>
  );
};

export default MainLayout;
