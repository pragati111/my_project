import React from "react";

export default function TradeShows() {
  const items = [
    {
      title: "Booklets",
      images: ["images/booklets/1.jpg", "images/booklets/2.jpg", "images/booklets/3.jpg", "images/booklets/4.jpg"],
    },
    {
      title: "Table Cloth",
      images: ["images/table-cloth/1.jpg", "images/table-cloth/2.jpg", "images/table-cloth/3.jpg", "images/table-cloth/4.jpg"],
    },
    {
      title: "Vinyl Pop Up",
      images: ["images/vinyl-pop-up/1.jpg", "images/vinyl-pop-up/2.jpg", "images/vinyl-pop-up/3.jpg", "images/vinyl-pop-up/4.jpg"],
    },
    {
      title: "L Shape Flags",
      images: ["images/l-shape-flags/1.jpg", "images/l-shape-flags/2.jpg", "images/l-shape-flags/3.jpg", "images/l-shape-flags/4.jpg"],
    },
    {
      title: "Business Cards",
      images: ["images/business-cards/1.jpg", "images/business-cards/2.jpg", "images/business-cards/3.jpg", "images/business-cards/4.jpg"],
    },
    {
      title: "Lanyards",
      images: ["images/lanyards/1.jpg", "images/lanyards/2.jpg", "images/lanyards/3.jpg", "images/lanyards/4.jpg"],
    },
    {
      title: "Tote Bags",
      images: ["images/tote-bags/1.jpg", "images/tote-bags/2.jpg", "images/tote-bags/3.jpg", "images/tote-bags/4.jpg"],
    },
    {
      title: "Rollup Banner",
      images: ["images/rollup-banner/1.jpg", "images/rollup-banner/2.jpg", "images/rollup-banner/3.jpg", "images/rollup-banner/4.jpg"],
    },
  ];

  return (
    <div className="px-4 md:px-8 lg:px-12 pb-10">
      {/* Heading */}
      <div className="mb-4">
        <h2 className="text-xl md:text-2xl font-semibold">
          Trade Shows
        </h2>
        <div className="w-10 h-[2px] bg-orange-500 mt-1"></div>
      </div>

      {/* GRID OF CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {items.map((item, index) => (
          <div key={index} className="group cursor-pointer relative">

            {/* Card */}
            <div className="bg-white border border-gray-300 shadow-sm overflow-hidden p-2 transition duration-300 group-hover:shadow-lg group-hover:border-gray-300">

              {/* CUSTOM MOSAIC */}
              <div className="grid grid-cols-2 gap-2 aspect-square sm:aspect-auto sm:h-[190px] md:h-[210px] overflow-hidden">
                
                {/* LEFT COLUMN */}
                <div className="flex flex-col gap-2 h-full">
                  
                  {/* Top Left (BIG) */}
                  <div className="flex-[1.4] min-h-[45%] overflow-hidden">
                    <img
                      src={item.images?.[0]}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>


                </div>

                {/* RIGHT COLUMN */}
                <div className="flex flex-col gap-2 h-full">
                  
                  {/* Top Right (SMALL) */}
                  <div className="flex-1 overflow-hidden">
                    <img
                      src={item.images?.[1]}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>

                  {/* Bottom Right (BIG) */}
                  <div className="flex-[1.4] overflow-hidden">
                    <img
                      src={item.images?.[3]}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>

                </div>

              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                <span className="text-white text-sm border border-gray-200 px-3 py-1">
                  View More →
                </span>
              </div>

              {/* Title */}
              <div className="pt-3 pb-1 text-center">
                <p className="text-sm font-medium">
                  {item.title}
                </p>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}