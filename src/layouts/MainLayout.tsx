import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import React from "react";
import { Outlet } from "react-router-dom";

export const MainLayout: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col gap-2">
      <Navbar />
      <div className="w-full flex flex-row h-full">
        <div className="w-1/4 p-2">
          <Sidebar />
        </div>
        <div className="bg-red-400"><Outlet /></div>
      </div>
    </div>
  );
};

export default MainLayout;
