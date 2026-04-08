import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useState } from "react";

export default function TopHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const isAuthPage = location.pathname === "/auth";

  return (
    <div className="fixed top-0 w-full h-16 md:h-20 bg-white flex justify-between items-center px-4 md:px-8 border-b z-50">
      
      <div onClick={() => navigate("/")} className="cursor-pointer">
        LOGO
      </div>

      {!isAuthPage && (
        <>
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
        </>
      )}
    </div>
  );
}