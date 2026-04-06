import { useState } from "react";
import { categories } from "../data/categories";
import TopHeader from "./TopHeader";
import BottomBar from "./BottomBar";
import { ChevronDown } from "lucide-react";
import HomeContent from "./HomeContent";

export default function DesktopHome() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="font-sans">
      <TopHeader />

      <div className="flex">
        {/* 🔥 ULTRA COMPACT SIDEBAR */}
        <div className="hidden lg:block w-[240px] fixed top-[72px] left-0 h-[calc(100vh-72px)] bg-gray-100 border-r overflow-y-auto text-xs">
          {/* Home */}
          <div className="px-3 py-2 border-b font-medium bg-white">🏠 Home</div>

          {/* Categories */}
          {categories.map((cat, i) => (
            <div key={i} className="border-b">
              {/* Category */}
              <div
                onClick={() => setActiveIndex(i)}
                className={`px-3 py-2 cursor-pointer flex justify-between items-center
                  ${
                    activeIndex === i
                      ? "bg-white text-orange-500 font-semibold"
                      : "hover:bg-gray-200"
                  }`}
              >
                <span className="truncate">{cat.name}</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-300 ${
                    activeIndex === i ? "rotate-180" : ""
                  }`}
                />
              </div>

              {/* 🔥 EXPANDED CONTENT INSIDE SAME SIDEBAR */}
              {activeIndex === i && (
                <div className="px-2 py-2 space-y-3 bg-white max-h-[300px] overflow-y-auto">
                  {cat.children.map((sub, idx) => (
                    <div key={idx}>
                      {/* Subcategory Title */}
                      <p className="font-semibold text-[11px] mb-1 text-gray-700 truncate">
                        {sub.name}
                      </p>

                      {/* Items */}
                      <div className="grid grid-cols-2 gap-2">
                        {sub.items.map((item, id) => (
                          <div
                            key={id}
                            className="bg-gray-50 p-2 rounded-md text-center hover:bg-white hover:shadow cursor-pointer"
                          >
                            {/* Image */}
                            <div className="h-[45px] flex items-center justify-center mb-1">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="max-h-full object-contain"
                              />
                            </div>

                            {/* Name */}
                            <p className="text-[10px] leading-tight text-gray-600 truncate">
                              {item.name}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 🔥 MAIN CONTENT (FULL WIDTH NOW) */}
        <div className="w-full lg:w-[calc(100%-240px)] lg:ml-[240px] pt-[120px]">
          <HomeContent/>
        </div>
      </div>

      <BottomBar />
    </div>
  );
}
