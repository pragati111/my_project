import { Link, useLocation } from "react-router-dom";
import { Home, Package, ShoppingCart } from "lucide-react";

export default function MobileBottomNav() {
  const location = useLocation();

  const active = (path) =>
    location.pathname === path ? "text-blue-500" : "";

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-3 md:hidden z-50">
      <Link to="/" className={`flex flex-col items-center ${active("/")}`}>
        <Home size={20} fill="black" className="mb-1" />
        Home
      </Link>

      <Link to="/categories" className={`flex flex-col items-center ${active("/categories")}`}>
        <Package size={20} fill="black" className="mb-1" />
        Our Products
      </Link>

      <Link to="/cart" className={`flex flex-col items-center ${active("/cart")}`}>
        <ShoppingCart size={20} fill="black" className="mb-1" />
        Cart
      </Link>
    </div>
  );
}