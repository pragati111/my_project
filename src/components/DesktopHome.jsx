import { Search, Phone, Mail } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { categories } from "../data/categories";
import HomeContent from "./HomeContent";
import TopHeader from "./TopHeader";
import BottomBar from "./BottomBar";

export default function DesktopHome() {
  const [active, setActive] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);

  const menuRef = useRef();

  // 🔥 Close menu on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActive(null);
        setHoveredItem(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="font-sans">
      {/* 🔶 Top Header */}
      <TopHeader />

      {/* 🔶 Navbar */}
      <div
        ref={menuRef}
        className="fixed top-[72px] left-0 w-full z-40 bg-gray-50 border-b flex justify-center gap-8 px-8 py-3 text-sm"
      >
        {/* Home */}
        <span className="cursor-pointer hover:text-orange-500">Home</span>

        {/* Categories */}
        {categories.map((cat, i) => (
          <span
            key={i}
            onClick={() => {
              setActive(active === i ? null : i);
              setHoveredItem(null);
            }}
            className={`cursor-pointer hover:text-orange-500 ${
              active === i ? "text-orange-500 font-semibold" : ""
            }`}
          >
            {cat.name}
          </span>
        ))}

        {/* 🔥 SINGLE MEGA MENU (CENTERED) */}
        {active !== null && categories[active]?.children?.length > 0 && (
          <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 bg-white shadow-xl p-6 grid grid-cols-5 gap-8 w-[1100px] z-50 rounded-lg">
            {/* LEFT SIDE */}
            <div className="col-span-3 grid grid-cols-3 gap-6">
              {categories[active].children.map((sub, idx) => (
                <div key={idx}>
                  <h4 className="font-semibold mb-2 text-gray-800">
                    {sub.name}
                  </h4>

                  <ul className="text-sm text-gray-600 space-y-1">
                    {sub.items.map((item, id) => (
                      <li
                        key={id}
                        onMouseEnter={() => setHoveredItem(item)}
                        className={`cursor-pointer hover:text-orange-500 ${
                          hoveredItem?.name === item.name
                            ? "text-orange-500 font-semibold"
                            : ""
                        }`}
                      >
                        {item.name}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* RIGHT SIDE */}
            <div className="col-span-2">
              {/* Preview */}
              <div className="bg-white border rounded-lg p-4 mb-4 flex flex-col items-center">
                <div className="w-[180px] h-[120px] flex items-center justify-center bg-white rounded-md overflow-hidden">
                  <img
                    src={
                      hoveredItem?.image ||
                      categories[active]?.children?.[0]?.items?.[0]?.image ||
                      "https://via.placeholder.com/150"
                    }
                    alt="preview"
                    className="max-w-full max-h-full object-contain"
                  />
                </div>

                <p className="text-center mt-3 text-sm font-medium text-gray-700">
                  {hoveredItem?.name || "Select Item"}
                </p>
              </div>

              {/* Most Popular */}
              <h4 className="font-semibold mb-2">Most Popular</h4>

              <div className="grid grid-cols-3 gap-3">
                {categories[active].children
                  .flatMap((sub) => sub.items)
                  .filter((item) => item.popular)
                  .slice(0, 3)
                  .map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white border rounded-lg p-2 text-center"
                    >
                      <div className="w-full h-[70px] flex items-center justify-center overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>

                      <p className="text-xs mt-2 text-gray-700">{item.name}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 🔶 Hero Section */}
      {/* 🔥 CONTENT WRAPPER */}
<div className="pt-[150px] pb-[100px]">
        <HomeContent />
      </div>

      {/* 🔶 Bottom Bar */}
        <BottomBar />
    </div>
  );
}

/* 🔹 Feature Component */
function Feature({ title, subtitle }) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 bg-orange-100 rounded-lg"></div>
      <div>
        <h4 className="font-semibold text-sm">{title}</h4>
        <p className="text-xs text-gray-500">{subtitle}</p>
      </div>
    </div>
  );
}
