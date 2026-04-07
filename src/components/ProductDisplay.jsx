import { useParams } from "react-router-dom";
import Sidebar from "./SideBar";
import TopHeader from "./TopHeader";
import BottomBar from "./BottomBar";
import { categories } from "../data/categories";
import { useEffect, useState } from "react";

export default function ProductDisplay() {
  const { id } = useParams();

  const offers = [
    {
      tag: "MOST POPULAR",
      title: "Buy 2 or more",
      discount: "Get 6% Off",
      code: "PRINT6",
    },
    {
      tag: "BEST VALUE",
      title: "Buy 5 or more",
      discount: "Get 8% Off",
      code: "PRINT8",
    },
    {
      tag: "MOST SAVINGS",
      title: "Buy 10 or more",
      discount: "Get 10% Off",
      code: "PRINT10",
    },
  ];

  // ✅ Find product
  const product = categories
    .flatMap((cat) => cat.children)
    .flatMap((sub) => sub.items)
    .find((item) => item.id === id);

  if (!product) {
    return <div className="p-10">Product not found</div>;
  }

  // ✅ Media
  const media = product.media?.length
    ? product.media
    : [{ type: "image", url: product.image }];

  // ✅ State
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [id]);

  const activeMedia = media[activeIndex];

  // ✅ Navigation
  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % media.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) =>
      prev === 0 ? media.length - 1 : prev - 1
    );
  };

  return (
    <div>
      <TopHeader />

      <div className="flex">
        <Sidebar />

        {/* MAIN */}
        <div className="w-full lg:w-[calc(100%-240px)] lg:ml-[240px] pt-[100px] px-6">
          <div className="flex gap-10">

            {/* 🔥 LEFT SECTION */}
            <div className="flex gap-4 sticky top-[120px] h-fit">

              {/* ✅ THUMBNAILS (SCROLLABLE) */}
              <div className="h-[360px] overflow-y-auto pr-1">
                <div className="flex flex-col gap-3">
                  {media.map((item, i) => (
                    <div
                      key={i}
                      onClick={() => setActiveIndex(i)}
                      className={`w-[65px] h-[65px] border rounded cursor-pointer flex items-center justify-center bg-white
                        ${
                          activeIndex === i
                            ? "border-black"
                            : "border-gray-300"
                        }
                      `}
                    >
                      {item.type === "image" ? (
                        <img
                          src={item.url}
                          className="max-h-full object-contain"
                        />
                      ) : (
                        <video
                          src={item.url}
                          muted
                          autoPlay
                          loop
                          className="max-h-full object-contain"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* ✅ MAIN MEDIA */}
              <div className="relative w-[420px] h-[420px] bg-white border rounded flex items-center justify-center">

                {/* LEFT BUTTON */}
                <button
                  onClick={handlePrev}
                  className="absolute left-2 z-10 bg-white border rounded-full w-8 h-8 flex items-center justify-center shadow hover:bg-gray-100"
                >
                  ‹
                </button>

                {/* MEDIA */}
                {activeMedia?.type === "image" ? (
                  <img
                    src={activeMedia.url}
                    className="max-h-full object-contain"
                  />
                ) : (
                  <video
                    src={activeMedia.url}
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls
                    className="max-h-full object-contain"
                  />
                )}

                {/* RIGHT BUTTON */}
                <button
                  onClick={handleNext}
                  className="absolute right-2 z-10 bg-white border rounded-full w-8 h-8 flex items-center justify-center shadow hover:bg-gray-100"
                >
                  ›
                </button>

              </div>
            </div>

            {/* 🔥 RIGHT CONTENT */}
            <div className="flex-1 space-y-5">

              <h1 className="text-2xl font-semibold">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 text-sm">
                <span className="bg-green-600 text-white px-2 py-[2px] rounded text-xs">
                  {product.rating} ★
                </span>
                <span className="text-gray-500">
                  {product.reviews} Reviews
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-green-600">
                  ₹{product.price}
                </span>

                {product.originalPrice && (
                  <span className="line-through text-gray-400">
                    ₹{product.originalPrice}
                  </span>
                )}

                {product.originalPrice && (
                  <span className="text-green-600 text-sm font-medium">
                    {Math.round(
                      ((product.originalPrice - product.price) /
                        product.originalPrice) *
                        100
                    )}
                    % OFF
                  </span>
                )}
              </div>

              <p className="text-gray-500 text-sm">
                Inclusive of all taxes
              </p>

              {/* Offer Box */}
              <div className="bg-green-50 p-4 rounded border border-green-200">
                <p className="text-sm font-medium">
                  🎉 Buy more & save more offers available
                </p>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed">
                High-quality premium product designed for durability and
                performance. Perfect for both personal and professional use.
              </p>

              {/* Offers */}
              <div className="space-y-3">
                <p className="text-sm font-semibold">Active Offers</p>

                <div className="flex gap-4 flex-wrap">
                  {offers.map((offer, i) => (
                    <div
                      key={i}
                      className="relative w-[200px] bg-green-50 border border-green-300 rounded-lg p-3 text-center hover:shadow transition"
                    >
                      <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] px-2 py-[2px] rounded">
                        {offer.tag}
                      </span>

                      <p className="text-sm font-semibold mt-2">
                        {offer.title}
                      </p>

                      <div className="border-t my-2"></div>

                      <p className="text-green-600 text-xs font-medium">
                        {offer.discount}
                      </p>

                      <p className="text-[11px] text-gray-600 mt-1">
                        Code:{" "}
                        <span className="font-semibold">
                          {offer.code}
                        </span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-6">
                <button className="bg-black text-white px-6 py-3 rounded w-[200px] hover:opacity-90 transition">
                  Add to Cart
                </button>

                <button className="bg-green-500 text-white px-6 py-3 rounded w-[200px] hover:bg-green-600 transition">
                  Buy Now
                </button>
              </div>

              <div className="h-[1200px]"></div>
            </div>
          </div>
        </div>
      </div>

      <BottomBar />
    </div>
  );
}