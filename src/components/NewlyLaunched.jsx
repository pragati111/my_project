// NewlyLaunched.jsx

import React, { useEffect, useState } from "react";
import TopHeader from "./TopHeader";
import BottomBar from "./BottomBar";
import PremiumFooter from "./PremiumFooter";
import Sidebar from "./SideBar";
import { useNavigate } from "react-router-dom";

export default function NewlyLaunched() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "https://my-project-backend-ee4t.onrender.com/api/product",
        );

        const data = await res.json();

        if (!data.success) return;

        // ✅ only products having "new" tag
        const newProducts = data.data.filter(
          (product) =>
            product.tags &&
            product.tags.some((tag) => tag.toLowerCase() === "new"),
        );

        setProducts(newProducts);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  const getImage = (product) => {
    const mediaImage = product.media?.find((m) => m.type === "image" && m.url);

    if (mediaImage) return mediaImage.url;

    if (product.images?.length) return product.images[0];

    if (product.image) return product.image;

    return "https://via.placeholder.com/400";
  };
  return (
    <div className="font-sans">
      <TopHeader />

      <div className="flex">
        <Sidebar />

        <div className="w-full lg:w-[calc(100%-240px)] lg:ml-[240px] pt-[90px] md:pt-[110px]">
          <div className="px-4 md:px-8 lg:px-12 pb-10">
            {/* TITLE */}
            <div className="mb-6">
              <h1
                className="text-2xl md:text-4xl font-semibold leading-tight tracking-wide 
                bg-gradient-to-r from-[#d4af37] via-[#f5d27a] to-[#c89b3c] 
                bg-clip-text text-transparent 
                drop-shadow-[0_2px_6px_rgba(212,175,55,0.4)]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Newly Launched
              </h1>

              <p className="mt-2 text-gray-500 text-sm md:text-base">
                Premium Prints • Timeless Designs • Personalized Touch
              </p>
            </div>

            {/* SHIMMER */}
            {loading && (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100"
                  >
                    <div className="w-full aspect-[4/3] bg-gray-200 animate-pulse"></div>

                    <div className="p-4">
                      <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>

                      <div className="h-3 w-20 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* PRODUCTS */}
            {!loading && (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
                {products.map((product) => (
                  <div
                    key={product._id}
                    onClick={() => navigate(`/product/${product._id}`)}
                    className="bg-white rounded-xl overflow-hidden shadow-md shadow-black/10 hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-gray-100"
                  >
                    {/* IMAGE */}
                    <div className="w-full aspect-[4/3] bg-gray-100 overflow-hidden">
                      <img
                        src={getImage(product)}
                        alt={product.productName}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* CONTENT */}
                    <div className="p-2.5 sm:p-3 md:p-4 flex flex-col gap-1.5">
                      <h2 className="text-[12px] sm:text-sm md:text-base font-semibold text-gray-800">
                        {product.productName}
                      </h2>

                      <div className="flex items-center gap-1 text-[9px] sm:text-[10px]">
                        <div className="bg-gray-100 px-1.5 py-[2px] rounded-full">
                          ⭐ {product.rating}
                        </div>

                        <div className="bg-gray-100 px-1.5 py-[2px] rounded-full capitalize">
                          {product.tags[1]}
                        </div>
                      </div>

                      <p
                        className="hidden sm:block text-xs text-gray-500 overflow-hidden"
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {product.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <PremiumFooter />
          <BottomBar />
        </div>
      </div>
    </div>
  );
}
