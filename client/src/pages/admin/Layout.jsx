import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Brain } from "lucide-react";
import Sidebar from "../../components/admin/Sidebar";
import useUserStore from "../../store/userStore";

export default function Layout() {
  const navigate = useNavigate();
  const clearUser = useUserStore((state) => state.clearUser);

  const logout = () => {
    navigate("/");
    clearUser();
    localStorage.removeItem("token");
    useUserStore.persist.clearStorage();
  };

  return (
    <div className="">
      {/* Header */}
      <div className="flex justify-between items-center py-2 h-[70px] border-b px-4 sm:px-12 border-gray-200">
        {/* Logo as Brain component like Navbar */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="p-1.5 bg-gradient-to-br from-primary to-indigo-600 rounded-lg group-hover:scale-105 transition-transform duration-300">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm sm:text-base font-bold bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">
              AI Dementia
            </span>
            <span className="text-[8px] sm:text-[10px] text-gray-500 font-medium -mt-0.5">
              Care Platform
            </span>
          </div>
        </div>

        {/* Logout button */}
        <button
          onClick={logout}
          className="px-4 py-1 sm:px-8 sm:py-2 text-sm bg-primary text-white rounded-full cursor-pointer"
        >
          Logout
        </button>
      </div>

      {/* Main Layout */}
      <div className="flex h-[calc(100vh-70px)]">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
}
