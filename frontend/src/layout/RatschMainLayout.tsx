import RatschMainNavBar from "@/components/RatschMainNavBar";
import React from "react";

interface RatschMainLayoutProps {
  children: React.ReactNode;
}

const RatschMainLayout: React.FC<RatschMainLayoutProps> = ({ children }) => {
  return (
    <div>
      <RatschMainNavBar />
      <main className="pt-20">{children}</main>
      
    </div>
  );
};

export default RatschMainLayout;
