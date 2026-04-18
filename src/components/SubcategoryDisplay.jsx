import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TopHeader from "./TopHeader";
import BottomBar from "./BottomBar";
import PremiumFooter from "./PremiumFooter";
import Sidebar from "./SideBar";

export default function SubcategoryDisplay() {
  const { subCategoryName } = useParams();
  const decodedName = decodeURIComponent(subCategoryName);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://my-project-backend-ee4t.onrender.com/api/product")
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) return;

        const filtered = data.data.filter(
          (p) =>
            p?.subCategory?.name?.trim().toLowerCase() ===
            decodedName?.trim().toLowerCase(),
        );

        setProducts(filtered);
      })
      .catch((err) => console.error(err));
  }, [decodedName]);

  const getImage = (product) => {
    const mediaImg = product.media?.find((m) => m.type === "image" && m.url);

    if (mediaImg) return mediaImg.url;
    if (product.images && product.images.length > 0) return product.images[0];

    return "/placeholder.jpg";
  };

  return (
    <div className="font-sans">
      {/* 🔥 TOP HEADER */}
      <TopHeader />

      <div className="flex">
        {/* 🔥 SIDEBAR */}
        <Sidebar />

        {/* 🔥 MAIN CONTENT */}
        <div className="w-full lg:w-[calc(100%-240px)] lg:ml-[240px] pt-[120px]">
          <div className="px-4 md:px-8 lg:px-12 pb-10">
            {/* TITLE */}
            <h1 className="text-2xl md:text-3xl font-semibold mb-6">
              {decodedName}
            </h1>

            {/* EMPTY STATE */}
            {products.length === 0 && (
              <p className="text-gray-500">No products found.</p>
            )}

            {/* 🔥 PREMIUM PRODUCT GRID */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
              {products.map((product) => (
                <div
  key={product._id}
  className="bg-white rounded-xl overflow-hidden shadow-md shadow-black/10 hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-gray-100"
>
  {/* IMAGE */}
  <div className="w-full aspect-[1/1] sm:aspect-[4/3] bg-gray-100 overflow-hidden">
    <img
      src={getImage(product)}
      alt={product.productName}
      className="w-full h-full object-cover"
    />
  </div>

  {/* CONTENT */}
  <div className="p-2.5 sm:p-3 md:p-4 flex flex-col gap-1.5">
    
    {/* TITLE */}
    <h2 className="text-[12px] sm:text-sm md:text-base font-semibold text-gray-800 leading-tight line-clamp-1">
      {product.productName}
    </h2>

    {/* DESCRIPTION (only on >= sm) */}
    <p className="hidden sm:block text-xs text-gray-500 line-clamp-2">
      {product.description?.slice(0, 70)}...
    </p>

    {/* RATING + TAG */}
    <div className="flex items-center gap-1 text-[9px] sm:text-[10px] overflow-x-auto whitespace-nowrap no-scrollbar">
      
      <div className="bg-gray-100 px-1.5 py-[2px] rounded-full shrink-0">
        ⭐ {product.rating || 4.5}
      </div>

      {product.tags && product.tags.length > 0 ? (
        product.tags.slice(0, 1).map((tag, i) => (
          <div
            key={i}
            className="bg-gray-100 px-1.5 py-[2px] rounded-full capitalize shrink-0"
          >
            {tag}
          </div>
        ))
      ) : (
        <div className="bg-gray-100 px-1.5 py-[2px] rounded-full shrink-0">
          General
        </div>
      )}
    </div>

    {/* BUTTON */}
    <button className="mt-1 w-full bg-black text-white text-[10px] sm:text-xs py-1 rounded-md font-medium hover:bg-gray-800 transition">
      View
    </button>
  </div>
</div>
              ))}
            </div>
          </div>

          {/* 🔥 FOOTERS (ALIGNED CORRECTLY) */}
          <PremiumFooter />
          <BottomBar />
        </div>
      </div>
    </div>
  );
}
