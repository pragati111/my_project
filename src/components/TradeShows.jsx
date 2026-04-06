export default function TradeShows() {
  const items = [
    { title: "Booklets", img: "images/1.jpg" },
    { title: "Table Cloth", img: "images/2.jpg" },
    { title: "Vinyl Pop Up", img: "images/3.jpg" },
    { title: "L Shape Flags", img: "images/4.jpg" },
    { title: "Business Cards", img: "images/5.jpg" },
    { title: "Lanyards", img: "images/6.jpg" },
    { title: "Tote Bags", img: "images/7.jpg" },
    { title: "Rollup Banner", img: "images/1.jpg" },
  ];

  return (
    <div className="px-4 md:px-8 lg:px-12 pb-10">
      {/* Heading */}
      <div className="mb-4">
        <h2 className="text-xl md:text-2xl font-semibold">
          Trade Shows
        </h2>
        <div className="w-10 h-[3px] bg-orange-500 mt-1"></div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {items.map((item, index) => (
          <div key={index} className="group cursor-pointer">
            
            {/* Card Container */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                  <span className="text-white text-sm font-medium border border-white px-3 py-1 rounded">
                    View More →
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-3">
                <h3 className="text-sm md:text-base font-medium">
                  {item.title}
                </h3>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}