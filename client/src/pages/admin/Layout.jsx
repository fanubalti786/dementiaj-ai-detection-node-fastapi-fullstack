import React from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import Sidebar from "../../components/admin/Sidebar";
export default function Layout() {
  const navigate = useNavigate();
  const logout = () => {
    navigate("/");
  };
  return (
    <div className="">
      <div
        className="flex justify-between items-center py-2 h-[70px] border-b px-4 sm:px-12 
    border-gray-200 "
      >
        <img
          onClick={() => navigate("/")}
          src={assets.logo}
          alt=""
          className="w-32 sm:w-40 cursor-pointer"
        />
        <button
          onClick={logout}
          className="px-4 py-1 sm:px-8 sm:py-2  text-sm bg-primary text-white rounded-full cursor-pointer"
        >
          Logout
        </button>
      </div>


      <div className="flex h-[calc(100vh-70px)] ">

        <div className=""><Sidebar/></div>
        < Outlet/>
        
        
       </div>
    </div>
  );
}
