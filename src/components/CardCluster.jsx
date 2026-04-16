import React from "react";

const CARD_ROUNDING = "rounded-3xl";

// 🎨 Gradient variants for containers
const gradients = [
  "bg-gradient-to-br from-[#f5efe6] to-[#e8dfcf]",
  "bg-gradient-to-br from-[#eef2f7] to-[#d9e2ec]",
  "bg-gradient-to-br from-[#f3e8ff] to-[#e9d5ff]",
  "bg-gradient-to-br from-[#e6f4f1] to-[#d1e7dd]",
  "bg-gradient-to-br from-[#fff4e6] to-[#fde2c4]",
];

// 🔥 Product Card
const ProductCard = ({ img, price, oldPrice }) => (
  <div className="bg-white/90 backdrop-blur rounded-2xl p-2 flex flex-col justify-between shadow-md hover:shadow-lg transition h-full">
    
    <div className="flex-1 flex items-center justify-center">
      <img src={img} alt="" className="h-16 md:h-20 object-contain" />
    </div>

    <div className="mt-1 flex items-center justify-between text-[10px] md:text-xs">
      <div>
        <p className="text-red-400 line-through">₹{oldPrice}</p>
        <p className="font-semibold text-gray-800">₹{price}</p>
      </div>

      <div className="flex gap-1 text-gray-500">
        <span>♡</span>
        <span>🛒</span>
      </div>
    </div>
  </div>
);

const CardContainer = ({ children, className = "", variant = 0, noGrid = false }) => (
  <div
    className={`${gradients[variant]} ${CARD_ROUNDING} p-3 md:p-4 
    border border-gray-300/70 
    shadow-[0_10px_30px_rgba(0,0,0,0.12)] 
    hover:shadow-[0_14px_40px_rgba(0,0,0,0.18)]
    transition-all duration-300 
    overflow-hidden ${className}`}
  >
    {noGrid ? (
      children
    ) : (
      <div className="grid grid-cols-2 auto-rows-fr gap-3 h-full">
        {children}
      </div>
    )}
  </div>
);

// 🚀 Layout
const CardCluster = () => {
  return (
    <div className="w-full bg-white p-4 md:p-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-4">

        {/* Column 1 */}
        <div className="md:col-span-3 flex flex-col gap-4">
          <CardContainer className="h-64 md:h-80" variant={0}>
            <ProductCard img="images/1.jpg" price="749" oldPrice="990" />
            <ProductCard img="images/2.jpg" price="599" oldPrice="899" />
            <ProductCard img="images/3.jpg" price="499" oldPrice="799" />
            <ProductCard img="images/4.jpg" price="899" oldPrice="1299" />
          </CardContainer>

          <CardContainer className="h-32 md:h-40" variant={1}>
            <ProductCard img="images/5.jpg" price="299" oldPrice="499" />
            <ProductCard img="images/6.jpg" price="399" oldPrice="699" />
          </CardContainer>
        </div>

        {/* Column 2 */}
        <div className="md:col-span-6 flex flex-col gap-4">
          <CardContainer
  className="h-64 md:h-80 flex items-center justify-center"
  variant={2}
  noGrid={true}
>
  <div className="bg-white/90 backdrop-blur-md rounded-full 
                  px-8 md:px-12 py-6 md:py-8 
                  shadow-[0_10px_30px_rgba(0,0,0,0.15)] 
                  border border-gray-100 
                  text-center max-w-lg w-full">
    
    <h2
      className="text-2xl md:text-4xl font-semibold leading-tight tracking-wide 
      bg-gradient-to-r from-[#d4af37] via-[#f5d27a] to-[#c89b3c] 
      bg-clip-text text-transparent 
      drop-shadow-[0_2px_6px_rgba(212,175,55,0.4)]"
      style={{ fontFamily: "'Playfair Display', serif" }}
    >
      Crafted with Elegance
    </h2>

    <p className="mt-4 text-gray-600 text-xs md:text-sm tracking-wide">
      Premium Prints • Timeless Designs • Personalized Touch
    </p>

  </div>
</CardContainer>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CardContainer className="h-32 md:h-40" variant={3}>
              <ProductCard img="images/6.jpg" price="299" oldPrice="499" />
              <ProductCard img="images/7.jpg" price="349" oldPrice="599" />
            </CardContainer>

            <CardContainer className="h-32 md:h-40" variant={4}>
              <ProductCard img="images/1.jpg" price="399" oldPrice="699" />
              <ProductCard img="images/2.jpg" price="459" oldPrice="799" />
            </CardContainer>
          </div>
        </div>

        {/* Column 3 */}
        <div className="md:col-span-3 flex flex-col gap-4">
          <CardContainer className="h-32 md:h-40" variant={1}>
            <ProductCard img="images/3.jpg" price="499" oldPrice="799" />
            <ProductCard img="images/4.jpg" price="599" oldPrice="899" />
          </CardContainer>

          <CardContainer className="h-64 md:h-80" variant={0}>
            <ProductCard img="images/5.jpg" price="699" oldPrice="999" />
            <ProductCard img="images/6.jpg" price="799" oldPrice="1199" />
            <ProductCard img="images/7.jpg" price="899" oldPrice="1299" />
            <ProductCard img="images/1.jpg" price="599" oldPrice="899" />
          </CardContainer>
        </div>

      </div>
    </div>
  );
};

export default CardCluster;