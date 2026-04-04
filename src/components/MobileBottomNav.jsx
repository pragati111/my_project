import { Link, useLocation } from "react-router-dom";

export default function MobileBottomNav() {
  const location = useLocation();

  const active = (path) =>
    location.pathname === path ? "text-blue-500" : "";

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-3 md:hidden z-50">
      <Link to="/" className={active("/")}>
        Home
      </Link>

      <Link to="/categories" className={active("/categories")}>
        Categories
      </Link>

      <Link to="/cart" className={active("/cart")}>
        Cart
      </Link>
    </div>
  );
}