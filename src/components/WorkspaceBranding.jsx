import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const items = [
  {
    name: "Office Signage",
    image: "images/5.jpg",
  },
  {
    name: "Wall Branding",
    image: "images/6.jpg",
  },
  {
    name: "Glass Branding",
    image: "images/7.jpg",
  },
  {
    name: "Reception Branding",
    image: "images/1.jpg",
  },
  {
    name: "Workspace Posters",
    image: "images/2.jpg",
  },
  {
    name: "Floor Graphics",
    image: "images/3.jpg",
  },
  {
    name: "LED Displays",
    image: "images/4.jpg",
  },
];

export default function WorkspaceBranding() {
  const [index, setIndex] = useState(0);

  const visibleItems = window.innerWidth < 768 ? 1 : 3; // number of cards visible at once

  const next = () => {
    if (index + visibleItems < items.length) {
      setIndex(index + 1);
    }
  };

  const prev = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  return (
    <div className="py-8">
  
    <div className="px-4 md:px-16">
        <div className="mb-4">
          <h2 className="text-xl md:text-2xl font-semibold">
            Workspace Branding
          </h2>
          <div className="w-10 h-[3px] bg-orange-500 mt-1"></div>
        </div>
    </div>

    <div className="relative">
  
  {/* wrapper WITHOUT overflow hidden */}
  <div className="px-4 md:px-16">
    
    {/* inner wrapper WITH overflow hidden */}
    <div className="flex gap-4 overflow-hidden">
          {items.slice(index, index + visibleItems).map((item, i) => (
            <div
              key={i}
              className="min-w-full md:min-w-[30%] bg-gray-50 border p-3 shadow-sm"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-[180px] object-contain bg-gray-50"
              />
              <p className="text-sm mt-2 text-center font-medium">
                {item.name}
              </p>
            </div>
          ))}
        </div>

        {/* 🔹 Prev Button */}
        {index > 0 && (
          <button
            onClick={prev}
            className="absolute left-1 md:-left-4 top-1/2 -translate-y-1/2 bg-white border p-2 shadow"
          >
            <ChevronLeft size={18} />
          </button>
        )}

        {/* 🔹 Next Button */}
        {index + visibleItems < items.length && (
          <button
            onClick={next}
            className="absolute right-1 md:-right-4 top-1/2 -translate-y-1/2 bg-white border p-2 shadow"
          >
            <ChevronRight size={18} />
          </button>
        )}

      </div>
    </div>
    </div>
  );
}