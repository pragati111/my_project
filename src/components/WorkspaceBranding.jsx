import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const items = [
  {
    name: "Office Signage",
    images: [
      "/images/signages/1.jpg",
      "/images/signages/2.jpg",
      "/images/signages/3.jpg",
      "/images/signages/4.jpg",
      "/images/signages/5.jpg",
      "/images/signages/6.jpg",
    ],
  },
  {
    name: "Wall Branding",
    images: [
      "/images/wall_branding/2.jpg",
      "/images/wall_branding/3.jpg",
      "/images/wall_branding/4.jpg",
      "/images/wall_branding/5.jpg",
      "/images/wall_branding/6.jpg",
      "/images/wall_branding/1.jpg",
    ],
  },
  {
    name: "Glass Branding",
    images: [
      "/images/glass_branding/3.jpg",
      "/images/glass_branding/4.jpg",
      "/images/glass_branding/5.jpg",
      "/images/glass_branding/6.jpg",
      "/images/glass_branding/1.jpg",
      "/images/glass_branding/2.jpg",
    ],
  },
  {
    name: "Reception Branding",
    images: [
      "/images/reception_branding/4.jpg",
      "/images/reception_branding/5.jpg",
      "/images/reception_branding/6.jpg",
      "/images/reception_branding/1.jpg",
      "/images/reception_branding/2.jpg",
      "/images/reception_branding/3.jpg",
    ],
  },
  {
    name: "Workspace Posters",
    images: [
      "/images/5.jpg",
      "/images/6.jpg",
      "/images/1.jpg",
      "/images/2.jpg",
      "/images/3.jpg",
      "/images/4.jpg",
    ],
  },
  {
    name: "Floor Graphics",
    images: [
      "/images/6.jpg",
      "/images/1.jpg",
      "/images/2.jpg",
      "/images/3.jpg",
      "/images/4.jpg",
      "/images/5.jpg",
    ],
  },
  {
    name: "LED Displays",
    images: [
      "/images/1.jpg",
      "/images/3.jpg",
      "/images/5.jpg",
      "/images/2.jpg",
      "/images/4.jpg",
      "/images/6.jpg",
    ],
  },
];

export default function WorkspaceBranding() {
  const [index, setIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(4);

  // ✅ Responsive handling
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleItems(1);
      } else if (window.innerWidth < 1024) {
        setVisibleItems(2);
      } else {
        setVisibleItems(4);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      {/* HEADER */}
      <div className="px-4 md:px-8 lg:px-12">
        <div className="mb-4">
          <h2 className="text-xl md:text-2xl font-semibold">
            Workspace Branding
          </h2>
          <div className="w-10 h-[3px] bg-orange-500 mt-1"></div>
        </div>
      </div>

      {/* SLIDER */}
      <div className="relative">
        <div className="px-4 md:px-8 lg:px-12">
          <div className="flex gap-4 overflow-hidden">
            {items
              .slice(index, index + visibleItems)
              .map((item, i) => (
                <div
                  key={i}
                  className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)] flex-shrink-0 bg-white border border-[#e6d3b8] p-3  shadow-md hover:shadow-lg transition duration-300"
                >
                  {/* TILE GRID */}
                  <div className="grid grid-cols-3 grid-rows-3 gap-1.5 h-[220px] sm:h-[240px]">
                    
                    {/* BIG */}
                    <img
                      src={item.images[0]}
                      className="col-span-2 row-span-2 w-full h-full object-cover  "
                    />

                    {/* RIGHT TOP */}
                    <img
                      src={item.images[1]}
                      className="w-full h-full object-cover "
                    />

                    {/* RIGHT MID */}
                    <img
                      src={item.images[2]}
                      className="w-full h-full object-cover "
                    />

                    {/* BOTTOM 3 */}
                    <img
                      src={item.images[3]}
                      className="w-full h-full object-cover "
                    />
                    <img
                      src={item.images[4]}
                      className="w-full h-full object-cover "
                    />
                    <img
                      src={item.images[5]}
                      className="w-full h-full object-cover "
                    />
                  </div>

                  {/* TITLE */}
                  <p className="text-sm mt-2 text-center font-medium">
                    {item.name}
                  </p>
                </div>
              ))}
          </div>

          {/* PREV */}
          {index > 0 && (
            <button
              onClick={prev}
              className="absolute left-2 md:-left-4 top-1/2 -translate-y-1/2 bg-white border p-2 shadow rounded-full"
            >
              <ChevronLeft size={18} />
            </button>
          )}

          {/* NEXT */}
          {index + visibleItems < items.length && (
            <button
              onClick={next}
              className="absolute right-2 md:-right-4 top-1/2 -translate-y-1/2 bg-white border p-2 shadow rounded-full"
            >
              <ChevronRight size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}