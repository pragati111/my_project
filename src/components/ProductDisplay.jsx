import { useParams } from "react-router-dom";
import Sidebar from "./SideBar";
import TopHeader from "./TopHeader";
import BottomBar from "./BottomBar";
import { categories } from "../data/categories";
import { useEffect, useState, useRef } from "react";

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

  // ✅ MULTI CONFIG
  const [configs, setConfigs] = useState([{}]);

  const handleChange = (index, id, value) => {
    const updated = [...configs];
    updated[index][id] = value;
    setConfigs(updated);
  };

  const addConfig = () => setConfigs((prev) => [...prev, {}]);

  const removeConfig = (index) => {
    setConfigs((prev) => prev.filter((_, i) => i !== index));
  };

  const thumbnailRefs = useRef([]);

  // ✅ FIND PRODUCT
  const product = categories
    .flatMap((cat) => cat.children)
    .flatMap((sub) => sub.items)
    .find((item) => item.id === id);

  if (!product) return <div className="p-10">Product not found</div>;

  const media =
    product.media?.length > 0
      ? product.media
      : [{ type: "image", url: product.image }];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
    setConfigs([{}]);
  }, [id]);

  useEffect(() => {
    const currentThumb = thumbnailRefs.current[activeIndex];
    if (currentThumb) {
      currentThumb.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [activeIndex]);

  const activeMedia = media[activeIndex];

  const handleNext = () =>
    setActiveIndex((prev) => (prev + 1) % media.length);

  const handlePrev = () =>
    setActiveIndex((prev) =>
      prev === 0 ? media.length - 1 : prev - 1
    );

  return (
    <div>
      <TopHeader />

      <div className="flex">
        <Sidebar />

        <div className="w-full lg:w-[calc(100%-240px)] lg:ml-[240px] pt-[100px] px-6">
          <div className="flex gap-10">
            
            {/* LEFT */}
            <div className="sticky top-[120px] h-fit">
              <div className="relative w-[420px] h-[420px] bg-white border rounded flex items-center justify-center">
                
                <button onClick={handlePrev} className="absolute left-2 bg-white border rounded-full w-8 h-8 shadow">‹</button>

                {activeMedia?.type === "image" ? (
                  <img src={activeMedia.url} className="max-h-full object-contain" />
                ) : (
                  <video src={activeMedia.url} autoPlay muted loop controls className="max-h-full object-contain" />
                )}

                <button onClick={handleNext} className="absolute right-2 bg-white border rounded-full w-8 h-8 shadow">›</button>
              </div>

              {/* THUMBNAILS */}
              <div className="mt-4 w-[420px] overflow-x-auto no-scrollbar">
                <div className="flex gap-3">
                  {media.map((item, i) => (
                    <div
                      key={i}
                      ref={(el) => (thumbnailRefs.current[i] = el)}
                      onClick={() => setActiveIndex(i)}
                      className={`min-w-[70px] h-[70px] border rounded cursor-pointer flex items-center justify-center bg-white ${
                        activeIndex === i ? "border-black" : "border-gray-300"
                      }`}
                    >
                      {item.type === "image" ? (
                        <img src={item.url} className="max-h-full object-contain" />
                      ) : (
                        <video src={item.url} className="max-h-full object-contain" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex-1 space-y-5">
              <h1 className="text-2xl font-semibold">{product.name}</h1>

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
                  <>
                    <span className="line-through text-gray-400">
                      ₹{product.originalPrice}
                    </span>
                    <span className="text-green-600 text-sm font-medium">
                      {Math.round(
                        ((product.originalPrice - product.price) /
                          product.originalPrice) *
                          100
                      )}
                      % OFF
                    </span>
                  </>
                )}
              </div>

              <p className="text-gray-500 text-sm">
                Inclusive of all taxes
              </p>

              {/* OFFER BOX */}
              <div className="bg-green-50 p-4 rounded border border-green-200">
                🎉 Buy more & save more offers available
              </div>

              {/* DESCRIPTION */}
              <p className="text-gray-600 text-sm">
                High-quality premium product designed for durability and performance.
              </p>

              {/* 🔥 MULTI DESIGN CUSTOMIZATION */}
              <div className="space-y-8">
                <h2 className="text-lg font-semibold">Customize Your Product</h2>

                {configs.map((config, index) => (
                  <div key={index} className="border p-4 rounded space-y-4">
                    
                    <div className="flex justify-between">
                      <h3 className="font-medium">Design {index + 1}</h3>

                      {configs.length > 1 && (
                        <button onClick={() => removeConfig(index)} className="text-red-500 text-sm">
                          Remove
                        </button>
                      )}
                    </div>

                    {product.customizations?.map((field) => {
                      if (field.showIf) {
                        const selected = config[field.showIf.field];
                        if (selected !== field.showIf.value) return null;
                      }

                      return (
                        <div key={field.id} className="space-y-2">
                          <label className="text-sm font-medium">
                            {field.label}
                          </label>

                          {/* RADIO */}
                          {field.type === "radio" && (
                            <div className="flex gap-4 flex-wrap">
                              {field.options.map((opt) => (
                                <label key={opt} className="flex gap-1">
                                  <input
                                    type="radio"
                                    name={`${field.id}-${index}`}
                                    checked={config[field.id] === opt}
                                    onChange={() =>
                                      handleChange(index, field.id, opt)
                                    }
                                  />
                                  {opt}
                                </label>
                              ))}
                            </div>
                          )}

                          {/* CHECKBOX */}
                          {field.type === "checkbox" && (
                            <div className="flex gap-4 flex-wrap">
                              {field.options.map((opt) => {
                                const current = config[field.id] || [];
                                return (
                                  <label key={opt} className="flex gap-1">
                                    <input
                                      type="checkbox"
                                      checked={current.includes(opt)}
                                      onChange={(e) => {
                                        const updated = e.target.checked
                                          ? [...current, opt]
                                          : current.filter((v) => v !== opt);

                                        handleChange(index, field.id, updated);
                                      }}
                                    />
                                    {opt}
                                  </label>
                                );
                              })}
                            </div>
                          )}

                          {/* DROPDOWN */}
                          {field.type === "dropdown" && (
                            <select
                              value={config[field.id] || ""}
                              onChange={(e) =>
                                handleChange(index, field.id, e.target.value)
                              }
                              className="border p-2 rounded w-full"
                            >
                              <option value="">Select</option>
                              {field.options.map((opt) => (
                                <option key={opt}>{opt}</option>
                              ))}
                            </select>
                          )}

                          {/* TEXT */}
                          {field.type === "text" && (
                            <input
                              type="text"
                              value={config[field.id] || ""}
                              onChange={(e) =>
                                handleChange(index, field.id, e.target.value)
                              }
                              className="border p-2 rounded w-full"
                            />
                          )}

                          {/* TEXTAREA */}
                          {field.type === "textarea" && (
                            <textarea
                              value={config[field.id] || ""}
                              onChange={(e) =>
                                handleChange(index, field.id, e.target.value)
                              }
                              className="border p-2 rounded w-full"
                            />
                          )}

                          {/* FILE */}
                          {field.type === "file" && (
                            <input
                              type="file"
                              onChange={(e) =>
                                handleChange(
                                  index,
                                  field.id,
                                  e.target.files[0]
                                )
                              }
                            />
                          )}
                        </div>
                      );
                    })}

                    {/* QUANTITY */}
                    <div>
                      <label className="text-sm">Quantity</label>
                      <input
                        type="number"
                        className="border p-2 rounded w-full"
                        value={config.quantity || ""}
                        onChange={(e) =>
                          handleChange(index, "quantity", e.target.value)
                        }
                      />
                    </div>
                  </div>
                ))}

                <button
                  onClick={addConfig}
                  className="bg-gray-200 px-4 py-2 rounded"
                >
                  + Add Another Design
                </button>
              </div>

              {/* OFFERS */}
              <div className="space-y-3">
                <p className="text-sm font-semibold">Active Offers</p>

                <div className="flex gap-4 flex-wrap">
                  {offers.map((offer, i) => (
                    <div key={i} className="relative w-[200px] bg-green-50 border border-green-300 rounded-lg p-3 text-center hover:shadow transition">
                      <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] px-2 py-[2px] rounded">
                        {offer.tag}
                      </span>

                      <p className="text-sm font-semibold mt-2">{offer.title}</p>

                      <div className="border-t my-2"></div>

                      <p className="text-green-600 text-xs font-medium">
                        {offer.discount}
                      </p>

                      <p className="text-[11px] text-gray-600 mt-1">
                        Code: <span className="font-semibold">{offer.code}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* BUTTONS */}
              <div className="flex gap-4 pt-6">
                <button
                  onClick={() => console.log(configs)}
                  className="bg-black text-white px-6 py-3 rounded w-[200px]"
                >
                  Add to Cart
                </button>

                <button className="bg-green-500 text-white px-6 py-3 rounded w-[200px]">
                  Buy Now
                </button>
              </div>

              <div className="h-[800px]"></div>
            </div>
          </div>
        </div>
      </div>

      <BottomBar />
    </div>
  );
}