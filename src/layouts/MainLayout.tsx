import Navbar from "@/components/navbar";
import React from "react";

export const MainLayout: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-between">
      <Navbar/>
      <div>end</div>
    </div>
  );
};

export default MainLayout;
