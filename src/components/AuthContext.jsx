import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(
  JSON.parse(localStorage.getItem("user")) || null
);

const login = (mobile) => {
  const newUser = { name: "Pragati Agarwal", mobile };
  setUser(newUser);
  localStorage.setItem("user", JSON.stringify(newUser));
};

const logout = () => {
  setUser(null);
  localStorage.removeItem("user");
};

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}