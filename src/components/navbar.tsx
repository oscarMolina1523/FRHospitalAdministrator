import React from "react";

const Navbar: React.FC = () => {
  return (
    <div className="h-20 w-screen flex flex-row bg-white">
      <div className="w-1/2 h-full flex items-center justify-start p-8 leading-7">
        <p className="text-[#0f172a] text-[1.25rem] font-semibold">
          Hospital Manager
        </p>
      </div>
      <div className="w-1/2 h-full flex flex-col items-end justify-end py-4 px-8 ">
        <p className="font-medium">Dr.Carlos Martinez</p>
        <p className="text-[#64748b]">CEO</p>
      </div>
    </div>
  );
};

export default Navbar;
