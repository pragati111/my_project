import { createContext, useContext, useState, useEffect } from "react";
import { store } from "../redux/store";
import { clearCart } from "../redux/cartActions";
import { clearWholesaleCart } from "../redux/wholesaleCartActions";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    const storedToken = localStorage.getItem("token") || localStorage.getItem("wholesalerToken");
    const user = JSON.parse(localStorage.getItem("user"));
    const role = localStorage.getItem("role");
    return { user, token: storedToken, role };
  });

  // ✅ login with real backend data
  const login = ({ user, token, role = "customer" }) => {
    setAuth({ user, token, role });

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("role", role);
  };

  const logout = () => {
    setAuth({ user: null, token: null, role: null });

    // Clear both customer and wholesale carts
    store.dispatch(clearCart());
    store.dispatch(clearWholesaleCart());

    localStorage.removeItem("token");
    localStorage.removeItem("wholesalerToken");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}