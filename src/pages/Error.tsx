import React from "react";

const ErrorPage: React.FC = () => {
  return <div className="flex flex-col min-h-screen min-w-screen items-center justify-center">
    <p className="text-[3rem] text-[#0f172a]">Page Not Found</p>
    <p className="text-[1.25rem] text-[#0f172a]">return to login or register</p>
  </div>;
};

export default ErrorPage;
