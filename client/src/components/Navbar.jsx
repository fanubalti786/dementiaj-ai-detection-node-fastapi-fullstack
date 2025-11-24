import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Brain, Menu, X } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="z-50 ">
      <div className="flex justify-between items-center mx-4 sm:mx-8 lg:mx-20 xl:mx-32 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 cursor-pointer group">
          <div className="p-1.5 bg-gradient-to-br from-primary to-indigo-600 rounded-lg group-hover:scale-105 transition-transform duration-300">
            <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm sm:text-base font-bold bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">
              AI Dementia
            </span>
            <span className="text-[8px] sm:text-[10px] text-gray-500 font-medium -mt-0.5">
              Care Platform
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-semibold transition-all duration-200 relative group ${
                isActive(item.path)
                  ? "text-primary"
                  : "text-gray-600 hover:text-primary"
              }`}
            >
              {item.name}
              {isActive(item.path) && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full" />
              )}
              {!isActive(item.path) && (
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary rounded-full group-hover:w-full transition-all duration-300" />
              )}
            </Link>
          ))}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => navigate("/login")}
            className="text-xs font-semibold text-gray-700 hover:text-primary px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-all duration-200"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="text-xs font-semibold bg-primary hover:bg-primary/90 text-white px-4 py-1.5 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
          >
            Sign Up
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5 text-gray-700" />
          ) : (
            <Menu className="w-5 h-5 text-gray-700" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="mx-4 py-3 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                  isActive(item.path)
                    ? "bg-primary/10 text-primary"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-2 border-t border-gray-100 space-y-2">
              <button
                onClick={() => {
                  navigate("/login");
                  setMobileMenuOpen(false);
                }}
                className="w-full text-xs font-semibold text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 transition-all text-left"
              >
                Login
              </button>
              <button
                onClick={() => {
                  navigate("/signup");
                  setMobileMenuOpen(false);
                }}
                className="w-full text-xs font-semibold bg-primary text-white px-3 py-2 rounded-lg hover:bg-primary/90 transition-all"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}