import { Link, useLocation } from "react-router-dom";
import { Home, Package, ShoppingCart } from "lucide-react";

export default function MobileBottomNav() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const baseStyle =
    "flex flex-col items-center justify-center text-[10px] transition-all duration-200";

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 flex justify-around py-2 md:hidden z-50">
      
      {/* HOME */}
      <Link to="/" className={baseStyle}>
        <Home
          size={18}
          className={`mb-[2px] transition-all ${
            isActive("/") ? "text-[#1e3a8a]" : "text-gray-600"
          }`}
          fill={isActive("/") ? "currentColor" : "none"}
        />
        <span className={isActive("/") ? "text-[#1e3a8a]" : "text-gray-600"}>
          Home
        </span>
      </Link>

      {/* CATEGORIES */}
      <Link to="/categories" className={baseStyle}>
        <Package
          size={18}
          className={`mb-[2px] transition-all ${
            isActive("/categories") ? "text-[#1e3a8a]" : "text-gray-600"
          }`}
          fill={isActive("/categories") ? "currentColor" : "none"}
        />
        <span className={isActive("/categories") ? "text-[#1e3a8a]" : "text-gray-600"}>
          Products
        </span>
      </Link>

      {/* CART */}
      <Link to="/cart" className={baseStyle}>
        <ShoppingCart
          size={18}
          className={`mb-[2px] transition-all ${
            isActive("/cart") ? "text-[#1e3a8a]" : "text-gray-600"
          }`}
          fill={isActive("/cart") ? "currentColor" : "none"}
        />
        <span className={isActive("/cart") ? "text-[#1e3a8a]" : "text-gray-600"}>
          Cart
        </span>
      </Link>
    </div>
  );
}