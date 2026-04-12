import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "./CartContext";

export default function TopHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const { getTotalQuantity } = useCart();

  const isAuthPage = location.pathname === "/auth";

  return (
    <div className="fixed top-0 w-full h-16 md:h-20 bg-white flex justify-between items-center px-4 md:px-8 border-b z-50">
      
      <div onClick={() => navigate("/")} className="cursor-pointer">
        LOGO
      </div>

      

      {!isAuthPage && (
  <div className="flex items-center gap-4">

    {/* 🛒 CART ICON (ALWAYS VISIBLE) */}
    <div
      onClick={() => navigate("/cart")}
      className="relative cursor-pointer hover:scale-110 transition"
    >
      <ShoppingCart size={22} />

      {getTotalQuantity() > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] px-1.5 rounded-full">
          {getTotalQuantity()}
        </span>
      )}
    </div>

    {/* 👤 USER / LOGIN */}
    {!user ? (
      <button
        onClick={() => navigate("/auth")}
        className="border px-3 py-1 rounded-full text-xs md:text-sm"
      >
        Login / Register
      </button>
    ) : (
      <div className="relative">
        <div
          onClick={() => setOpen(!open)}
          className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center cursor-pointer"
        >
          {user.name[0]}
        </div>

        {open && (
          <div className="absolute right-0 mt-2 bg-white border rounded shadow w-40">
            <div
              onClick={() => navigate("/account")}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              My Account
            </div>
            <div
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="p-2 hover:bg-gray-100 cursor-pointer text-red-500"
            >
              Logout
            </div>
          </div>
        )}
      </div>
    )}

  </div>
)}
    </div>
  );
}