import DesktopHome from "./components/DesktopHome";
import MobileBottomNav from "./components/MobileBottomNav";

import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Categories from "./pages/Categories";
import Cart from "./pages/Cart";

function App() {
  return (
    <>
      {/* ✅ Desktop View */}
      <div className="hidden md:block">
        <DesktopHome />
      </div>

      {/* ✅ Mobile View */}
      <div className="block md:hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>

        <MobileBottomNav />
      </div>
    </>
  );
}

export default App;