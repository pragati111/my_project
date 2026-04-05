export default function TradeShows() {
  const items = [
    {
      title: "Booklets",
      img: "images/1.jpg",
    },
    {
      title: "Table Cloth",
      img: "images/2.jpg",
    },
    {
      title: "Vinyl Pop Up",
      img: "images/3.jpg",
    },
    {
      title: "L Shape Flags",
      img: "images/4.jpg",
    },
    {
      title: "Business Cards",
      img: "images/5.jpg",
    },
    {
      title: "Lanyards",
      img: "images/6.jpg",
    },
    {
      title: "Tote Bags",
      img: "images/7.jpg",
    },
    {
      title: "Rollup Banner",
      img: "images/1.jpg",
    },
  ];

  return (
    <div className="px-4 md:px-16 pb-10">
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
          <div key={index} className="group">
            
            {/* Image */}
            <div className="bg-gray-100 overflow-hidden aspect-[4/3]">
  <img
    src={item.img}
    alt={item.title}
    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
  />
</div>

            {/* Content */}
            <div className="mt-2">
              <h3 className="text-sm md:text-base font-medium">
                {item.title}
              </h3>

              <p className="text-orange-500 text-xs md:text-sm mt-1 cursor-pointer hover:underline">
                View more
              </p>

              {/* Divider line */}
              <div className="mt-2 border-b border-gray-200"></div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}