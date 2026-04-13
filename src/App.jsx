import DesktopHome from "./components/DesktopHome";
import ProductDisplay from "./components/ProductDisplay";
import MobileBottomNav from "./components/MobileBottomNav";

import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Categories from "./pages/Categories";
import Cart from "./pages/Cart";
import AuthPage from "./components/AuthPage"; // ✅ added
import AccountPage from "./components/AccountPage"; // ✅ add this
import ManageAddressPage from "./components/ManageAddressPage";

function App() {
  return (
    <>
      {/* ✅ DESKTOP ROUTES */}
      <div className="hidden md:block">
        <Routes>
          <Route path="/" element={<DesktopHome />} />
          <Route path="/product/:id" element={<ProductDisplay />} />
          <Route path="/auth" element={<AuthPage />} /> {/* ✅ added */}
          <Route path="/account" element={<AccountPage />} />
          <Route path="/manage-address" element={<ManageAddressPage />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>

      {/* ✅ MOBILE ROUTES */}
      <div className="block md:hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductDisplay />} />
          <Route path="/auth" element={<AuthPage />} /> {/* ✅ added */}
          <Route path="/account" element={<AccountPage />} />
          <Route path="/manage-address" element={<ManageAddressPage />} />
        </Routes>

        <MobileBottomNav />
      </div>
    </>
  );
}

export default App;