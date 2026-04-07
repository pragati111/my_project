import DesktopHome from "./components/DesktopHome";
import ProductDisplay from "./components/ProductDisplay";

import MobileBottomNav from "./components/MobileBottomNav";

import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Categories from "./pages/Categories";
import Cart from "./pages/Cart";

function App() {
  return (
    <>
      {/* ✅ DESKTOP ROUTES */}
      <div className="hidden md:block">
        <Routes>
          <Route path="/" element={<DesktopHome />} />
          <Route path="/product/:id" element={<ProductDisplay />} />
        </Routes>
      </div>

      {/* ✅ MOBILE ROUTES */}
      <div className="block md:hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/cart" element={<Cart />} />
          {/* (optional) product page for mobile later */}
        </Routes>

        <MobileBottomNav />
      </div>
    </>
  );
}

export default App;