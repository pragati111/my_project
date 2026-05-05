import { useParams } from "react-router-dom";
import Sidebar from "./SideBar";
import TopHeader from "./TopHeader";
import BottomBar from "./BottomBar";
import { useEffect, useState, useRef } from "react";
import { useCart } from "../redux/useCart";
import ProductShimmer from "./ProductShimmer";

export default function ProductDisplay() {
  const { addToCart } = useCart();
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [configs, setConfigs] = useState([{}]);
  const [showAllOffers, setShowAllOffers] = useState(false);

  

  const thumbnailRefs = useRef([]);
  const rightRef = useRef(null);



  const getPreviewSrc = (value) =>
    typeof value === "string" ? value : URL.createObjectURL(value);

  const getAdjustment = (config) => {
  let extra = 0;

  product.customizations?.forEach((field) => {
    const selected = config[field.label];

    if (!selected) return;

    // MULTI (checkbox)
    if (Array.isArray(selected)) {
      selected.forEach((val) => {
        const opt = field.options?.find((o) => o.label === val);
        extra += opt?.priceAdjustment || 0;
      });
    } 
    // SINGLE (dropdown/radio)
    else {
      const opt = field.options?.find((o) => o.label === selected);
      extra += opt?.priceAdjustment || 0;
    }
  });

  return extra;
};

const getTotalPrice = () => {
  if (!product) return 0;

  return configs.reduce((total, config) => {
    const base = product.discountedMRP;
    const adjustment = getAdjustment(config);
    const quantity = config.quantity || 1;

    return total + (base + adjustment) * quantity;
  }, 0);
};

  // FETCH PRODUCT
  useEffect(() => {
    fetch(`https://my-project-backend-ee4t.onrender.com/api/product/${id}`)
      .then((res) => res.json())
      .then((res) => {
        console.log("API:", res); // debug once
        setProduct(res.product || null); // ✅ FIX
      })
      .catch((err) => console.error(err));
  }, [id]);

  useEffect(() => {
    const attachScroll = () => {
      const left = document.querySelector("#left-section");

      if (!left || !rightRef.current) return;

      const handler = (e) => {
        const el = rightRef.current;

        const isScrollingDown = e.deltaY > 0;
        const isScrollingUp = e.deltaY < 0;

        const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 5;

        const atTop = el.scrollTop <= 5;

        if ((isScrollingDown && !atBottom) || (isScrollingUp && !atTop)) {
          e.preventDefault();
          el.scrollTop += e.deltaY;
        }
      };

      left.addEventListener("wheel", handler, { passive: false });

      return () => {
        left.removeEventListener("wheel", handler);
      };
    };

    // 🔥 IMPORTANT: delay until DOM + product render
    const timeout = setTimeout(attachScroll, 100);

    return () => clearTimeout(timeout);
  }, [product]); // 👈 THIS is the key

  // RESET
  useEffect(() => {
    setActiveIndex(0);
    setConfigs([{}]);
  }, [id]);

  // THUMB SCROLL
  useEffect(() => {
    const currentThumb = thumbnailRefs.current[activeIndex];
    currentThumb?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [activeIndex]);

  if (!product) return <ProductShimmer />;
  const activeOffers = product?.offers?.filter((o) => o.active) || [];

  const media =
    product.media?.length > 0
      ? product.media
      : product.images?.map((img) => ({ type: "image", url: img })) || [];

  const activeMedia = media[activeIndex];

  // HANDLERS
  const handleChange = (index, field, value) => {
    const updated = [...configs];

    // 👇 quantity should still work
    const key = typeof field === "string" ? field : field.label;

    updated[index][key] = value;

    setConfigs(updated);
  };

  const CLOUDINARY_UPLOAD_PRESET = "market_data";
  const CLOUDINARY_CLOUD_NAME = "drq4o4qix";

  const handleFileUpload = async (index, key, file) => {
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await res.json();

      // ✅ SAVE CLOUDINARY URL IN CONFIG
      handleChange(index, key, data.secure_url);
    } catch (err) {
      console.error("Upload failed", err);
    }
  };

  const addConfig = () => setConfigs((prev) => [...prev, {}]);

  const removeConfig = (index) => {
    if (configs.length === 1) return; // prevent deleting last
    setConfigs((prev) => prev.filter((_, i) => i !== index));
  };

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % media.length);

  const handlePrev = () =>
    setActiveIndex((prev) => (prev === 0 ? media.length - 1 : prev - 1));

  return (
    <div>
      <TopHeader />

      <div className="flex">
        {/* DESKTOP SIDEBAR */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        <div className="w-full lg:ml-[240px] pt-[100px] px-4 lg:px-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* LEFT */}
            <div id="left-section" className="w-full lg:w-[420px]">
              <div className="relative h-[320px] lg:h-[420px] bg-white border rounded flex items-center justify-center">
                <button
                  onClick={handlePrev}
                  className="absolute left-3 bg-white/90 hover:bg-white text-black w-8 h-8 flex items-center justify-center rounded-full shadow-md"
                >
                  ‹
                </button>

                {activeMedia ? (
                  activeMedia.type === "image" ? (
                    <img
                      src={activeMedia.url}
                      className="max-h-full object-contain"
                    />
                  ) : (
                    <video src={activeMedia.url} autoPlay muted loop controls />
                  )
                ) : (
                  <div className="text-gray-400">No media available</div>
                )}

                <button
                  onClick={handleNext}
                  className="absolute right-3 bg-white/90 hover:bg-white text-black w-8 h-8 flex items-center justify-center rounded-full shadow-md"
                >
                  ›
                </button>
              </div>

              {/* THUMB */}
              <div className="mt-4 flex gap-3 overflow-x-auto no-scrollbar">
                {media.map((item, i) => (
                  <div
                    key={i}
                    ref={(el) => (thumbnailRefs.current[i] = el)}
                    onClick={() => setActiveIndex(i)}
                    className={`w-[70px] h-[70px] flex-shrink-0 border cursor-pointer ${
                      activeIndex === i ? "border-black" : ""
                    }`}
                  >
                    <img
                      src={item.url}
                      className="object-cover h-full w-full"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT */}
            <div
              ref={rightRef}
              className="flex-1 space-y-6 overflow-y-auto max-h-[calc(100vh-120px)] pr-2 no-scrollbar"
            >
              <h1 className="text-xl lg:text-2xl font-semibold">
                {product.productName || product.name}
              </h1>

              <div className="flex items-center gap-3">
                {/* Discounted Price */}
                <p className="text-green-600 text-2xl lg:text-3xl font-bold">
                  ₹{product.discountedMRP}
                </p>
                <p className="text-lg font-semibold text-gray-800">
  Total Price: ₹{getTotalPrice()}
</p>

                {/* Original Price */}
                {product.originalPrice && (
                  <p className="text-gray-400 line-through text-sm lg:text-base">
                    ₹{product.originalPrice}
                  </p>
                )}

                {/* Discount */}
                {product.discount && (
                  <p className="text-green-600 text-sm lg:text-base font-semibold">
                    {product.discount}% OFF
                  </p>
                )}
              </div>

              <p className="text-gray-600 text-sm leading-relaxed break-all">
                {product.description}
              </p>

              {/* OFFERS SECTION */}
              <h3 className="text-lg  font-semibold">All Offers</h3>
              <div className="w-full overflow-x-auto no-scrollbar">
                <div className="flex gap-4 p-2">
                  {(activeOffers.length > 3
                    ? activeOffers.slice(0, 2)
                    : activeOffers
                  ).map((offer, i) => (
                    <div
                      key={offer._id}
                      className="relative flex-shrink-0 w-[220px] sm:w-[200px] rounded-2xl px-4 py-6 text-center bg-white/70 backdrop-blur-md border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(8,112,184,0.08)] transition-all duration-300 my-3 mx-2 first:ml-1"
                    >
                      {/* Subtle decorative gradient line at the top */}
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 via-indigo-500 to-teal-400 rounded-t-2xl"></div>

                      {/* TITLE */}
                      <p className="mt-3 text-gray-800 text-sm font-semibold tracking-tight truncate px-1">
                        {offer.title}
                      </p>

                      {/* DIVIDER */}
                      <div className="my-3 h-[1px] bg-gradient-to-r from-transparent via-indigo-300 to-transparent w-[80%] mx-auto opacity-60"></div>

                      {/* DISCOUNT */}
                      {offer.discountPercent > 0 && (
                        <p className="text-indigo-600 text-base font-black">
                          Get {offer.discountPercent}% Off
                        </p>
                      )}

                      {/* CODE & VALIDITY */}
                      <div className="mt-4 bg-indigo-50/40 border border-indigo-100/50 rounded-xl py-3 px-2">
                        <span className="block text-[10px] text-teal-600 font-extrabold tracking-widest uppercase">
                          Promo Code
                        </span>
                        <span className="block text-gray-800 font-black text-lg tracking-wide uppercase select-all mt-0.5">
                          {offer.code}
                        </span>

                        {offer.expiryDate && (
                          <span className="flex items-center justify-center gap-1 text-[10px] text-gray-400 mt-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={2}
                              stroke="currentColor"
                              className="w-3.5 h-3.5 text-indigo-500"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 12h.008v.008H9.75V12Zm0 2.25h.008v.008H9.75V14.25Zm0 2.25h.008v.008H9.75v-.008ZM7.5 12h.008v.008H7.5V12Zm0 2.25h.008v.008H7.5V14.25Z"
                              />
                            </svg>
                            Valid till--
                            {new Date(offer.expiryDate).toLocaleDateString(
                              "en-IN",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              },
                            )}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* ✅ VIEW MORE CARD */}
                  {activeOffers.length > 3 && (
                    <div
                      onClick={() => setShowAllOffers(true)}
                      className="flex-shrink-0 flex flex-col items-center justify-center cursor-pointer w-[220px] sm:w-[200px] rounded-2xl border-2 border-dashed border-indigo-300 bg-white/40 hover:bg-white/70 text-indigo-600 font-bold mx-2 my-3 px-4 py-6 text-center transition-all duration-300 hover:border-indigo-400"
                    >
                      <div className="w-10 h-10 mb-3 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500">
                        +
                      </div>
                      <span>View More →</span>
                    </div>
                  )}
                </div>
              </div>

              {/* CUSTOMIZATION */}
              <div>
                <h2 className="text-lg font-semibold mb-3">Customize</h2>

                <div className="space-y-4">
                  {configs.map((config, index) => (
                    <div
                      key={index}
                      className="border p-4 rounded space-y-3 relative"
                    >
                      {/* TITLE */}
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">Design {index + 1}</h3>

                        <button
                          onClick={() => removeConfig(index)}
                          className="text-red-500 text-lg"
                        >
                          ✕
                        </button>
                      </div>
                      <p className="text-sm text-gray-600">
  Price: ₹
  {(product.discountedMRP + getAdjustment(config)) *
    (config.quantity || 1)}
</p>

                      {product.customizations?.map((field) => (
                        <div key={field.id}>
                          <label className="block text-sm mb-1">
                            {field.label}
                          </label>

                          {/* TEXT */}
                          {field.type === "text" && (
                            <input
                              type="text"
                              className="border p-2 w-full"
                              onChange={(e) =>
                                handleChange(index, field, e.target.value)
                              }
                            />
                          )}

                          {/* TEXTAREA */}
                          {field.type === "textarea" && (
                            <textarea
                              className="border p-2 w-full"
                              onChange={(e) =>
                                handleChange(index, field, e.target.value)
                              }
                            />
                          )}

                          {/* RADIO */}
                          {field.type === "radio" &&
                            field.options?.map((opt) => (
                              <label key={opt.label} className="block">
                                <input
                                  type="radio"
                                  name={`${field.id}-${index}`}
                                  onChange={() =>
                                    handleChange(index, field, opt.label)
                                  }
                                />{" "}
                                {opt.label}
                              </label>
                            ))}

                          {/* CHECKBOX */}
                          {field.type === "checkbox" &&
                            field.options?.map((opt) => (
                              <label key={opt} className="block">
                                <input
                                  type="checkbox"
                                  onChange={(e) => {
                                    const prev = config[field.label] || [];
                                    const updated = e.target.checked
                                      ? [...prev, opt.label]
                                      : prev.filter((o) => o !== opt.label);
                                    handleChange(index, field, updated);
                                  }}
                                />{" "}
                                {opt.label}
                              </label>
                            ))}

                          {/* DROPDOWN */}
                          {field.type === "dropdown" && (
                            <select
                              className="border p-2 w-full"
                              onChange={(e) =>
                                handleChange(index, field, e.target.value)
                              }
                            >
                              <option>Select</option>
                              {field.options?.map((opt) => (
                                <option key={opt.label} value={opt.label}>
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                          )}

                          {/* FILE */}
                          {field.type === "file" &&
                            (() => {
                              // find radio selection (Double / Single)
                              const selectedOption = Object.values(config).find(
                                (val) =>
                                  val === "Double Sided" ||
                                  val === "Single Sided",
                              );

                              // SINGLE SIDED
                              if (selectedOption === "Single Sided") {
                                const value = config[field.label];

                                return (
                                  <div className="space-y-2">
                                    <label className="text-sm">Design</label>

                                    {value && (
                                      <img
                                        src={getPreviewSrc(value)}
                                        className="w-16 h-16 object-cover border"
                                      />
                                    )}

                                    <input
                                      type="file"
                                      onChange={(e) =>
                                        handleFileUpload(
                                          index,
                                          field.label,
                                          e.target.files[0],
                                        )
                                      }
                                    />

                                    <p className="text-xs text-gray-500">
                                      {value ? "Change" : "Upload"}
                                    </p>
                                  </div>
                                );
                              }

                              // DOUBLE SIDED
                              if (selectedOption === "Double Sided") {
                                const frontKey = `${field.label}_front`;
                                const backKey = `${field.label}_back`;

                                return (
                                  <div className="space-y-3">
                                    {/* FRONT */}
                                    <div>
                                      <label className="text-sm">
                                        Front Design
                                      </label>

                                      {config[frontKey] && (
                                        <img
                                          src={getPreviewSrc(config[frontKey])}
                                          className="w-16 h-16 object-cover border"
                                        />
                                      )}

                                      <input
                                        type="file"
                                        onChange={(e) =>
                                          handleFileUpload(
                                            index,
                                            `${field.label}_front`,
                                            e.target.files[0],
                                          )
                                        }
                                      />

                                      <p className="text-xs text-gray-500">
                                        {config[frontKey] ? "Change" : "Upload"}
                                      </p>
                                    </div>

                                    {/* BACK */}
                                    <div>
                                      <label className="text-sm">
                                        Back Design
                                      </label>

                                      {config[backKey] && (
                                        <img
                                          src={getPreviewSrc(config[backKey])}
                                          className="w-16 h-16 object-cover border"
                                        />
                                      )}

                                      <input
                                        type="file"
                                        onChange={(e) =>
                                          handleFileUpload(
                                            index,
                                            `${field.label}_back`,
                                            e.target.files[0],
                                          )
                                        }
                                      />

                                      <p className="text-xs text-gray-500">
                                        {config[backKey] ? "Change" : "Upload"}
                                      </p>
                                    </div>
                                  </div>
                                );
                              }

                              // DEFAULT (if nothing selected yet)
                              return (
                                <input
                                  type="file"
                                  onChange={(e) =>
                                    handleFileUpload(
                                      index,
                                      field.label,
                                      e.target.files[0],
                                    )
                                  }
                                />
                              );
                            })()}
                        </div>
                      ))}

                      {/* QUANTITY */}
                      <div>
                        <label className="text-sm">Quantity</label>
                        <input
                          type="number"
                          min="1"
                          value={config.quantity || 1}
                          className="border p-2 w-full"
                          onChange={(e) =>
                            handleChange(index, "quantity", +e.target.value)
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <button onClick={addConfig} className="mt-3 text-blue-600">
                  + Add Design
                </button>
              </div>

              {/* DESKTOP STICKY BUTTONS */}
              <div className="hidden lg:flex gap-4 pt-4">
                <button
                  onClick={() => {
                    const formattedConfigs = configs.map((c) => ({
                      config: c,
                      quantity: c.quantity || 1,
                    }));
                    console.log("ADDING TO CART:", {
                      ...product,
                      image: media[0]?.url,
                    });
                    addToCart(
                      {
                        ...product,
                        image: media[0]?.url || "", // ✅ ADD THIS
                      },
                      formattedConfigs,
                    );
                  }}
                  className="bg-black text-white px-6 py-3 w-full"
                >
                  Add to Cart
                </button>

                <button className="bg-green-500 text-white px-6 py-3 w-full">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
          {/* PRODUCT SPECIFICATIONS */}
          <div className="mt-8 bg-gray-50 border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              Product <span className="font-bold">Specifications</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              {/* LEFT COLUMN */}
              <div className="space-y-3">
                <div>
                  <p className="text-gray-500">Name</p>
                  <p className="font-medium">
                    {product.productName || product.name}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">Net Content</p>
                  <p>1 UNIT</p>
                </div>

                <div>
                  <p className="text-gray-500">Marketed By</p>
                  <p>Creative Studio, Jaipur</p>
                </div>

                <div>
                  <p className="text-gray-500">Category</p>
                  <p className="font-medium">
                    {product.category?.name || "Printing Products"}
                  </p>
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div className="space-y-3">
                <div>
                  <p className="text-gray-500">Price</p>
                  <p>₹{product.price}</p>
                </div>

                <div>
                  <p className="text-gray-500">Country of Origin</p>
                  <p>India</p>
                </div>

                <div>
                  <p className="text-gray-500">Type</p>
                  <p>Custom Printed Product</p>
                </div>

                <div>
                  <p className="text-gray-500">Brand</p>
                  <p>Your Brand</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* MOBILE FIXED BUTTONS */}
      <div className=" lg:hidden fixed bottom-[64px] left-0 right-0 bg-white border-t p-3 z-50">
        <div className="flex gap-3">
          <button
            onClick={() => {
              const formattedConfigs = configs.map((c) => ({
                config: {
                  ...c,
                  __productImage: media[0]?.url, // 🔥 backup storage
                },
                quantity: c.quantity || 1,
              }));
              console.log("ADDING TO CART:", {
                ...product,
                image: media[0]?.url,
              });
              addToCart(
  {
    ...product,
    price: product.discountedMRP, // 🔥 FIX
    image: media[0]?.url || "",
    customizations: product.customizations // 🔥 IMPORTANT
  },
  formattedConfigs
);
            }}
            className="bg-black text-white py-3 flex-1 rounded"
          >
            Add to Cart
          </button>

          <button className="bg-green-500 text-white py-3 flex-1 rounded">
            Buy Now
          </button>
        </div>
      </div>
      {showAllOffers && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-end lg:items-center justify-center">
          {/* MODAL CONTAINER */}
          <div
            className="
  bg-white w-full 
  max-h-[calc(100vh-80px)] flex flex-col lg:h-auto 
  lg:max-w-3xl 
  rounded-t-2xl lg:rounded-xl 
  p-5 relative 
  overflow-visible
"
          >
            {/* DRAG HANDLE (mobile premium feel) */}
            <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-3 lg:hidden"></div>

            {/* CLOSE BUTTON */}
            <button
              onClick={() => setShowAllOffers(false)}
              className="absolute top-3 right-3 text-lg font-bold"
            >
              ✕
            </button>

            <h2 className="text-lg font-semibold mb-4 text-center lg:text-left">
              All Offers
            </h2>

            <div className="overflow-y-auto h-[75vh] lg:h-auto pr-1 pb-8 no-scrollbar flex justify-center lg:block">
              <div className="flex flex-col items-center gap-3 sm:flex-row sm:overflow-x-auto sm:justify-start lg:grid lg:grid-cols-3 no-scrollbar w-full max-w-lg lg:max-w-none px-2 pb-4">
                {activeOffers.map((offer, i) => (
                  <div
                    key={offer._id}
                    className="relative flex-shrink-0 w-[220px] sm:w-[200px] rounded-2xl px-4 py-6 text-center bg-white/70 backdrop-blur-md border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(8,112,184,0.08)] transition-all duration-300 my-3 mx-2"
                  >
                    {/* Subtle decorative gradient line at the top */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 via-indigo-500 to-teal-400 rounded-t-2xl"></div>

                    {/* TITLE */}
                    <p className="mt-3 text-gray-800 text-sm font-semibold tracking-tight truncate px-1">
                      {offer.title}
                    </p>

                    {/* DIVIDER */}
                    <div className="my-3 h-[1px] bg-gradient-to-r from-transparent via-indigo-300 to-transparent w-[80%] mx-auto opacity-60"></div>

                    {/* DISCOUNT */}
                    {offer.discountPercent > 0 && (
                      <p className="text-indigo-600 text-base font-black">
                        Get {offer.discountPercent}% Off
                      </p>
                    )}

                    {/* CODE & VALIDITY CONTAINER */}
                    <div className="mt-4 bg-indigo-50/40 border border-indigo-100/50 rounded-xl py-3 px-2 mb-10">
                      <span className="block text-[10px] text-teal-600 font-extrabold tracking-widest uppercase">
                        Promo Code
                      </span>

                      <span className="block text-gray-800 font-black text-lg tracking-wide uppercase select-all mt-0.5">
                        {offer.code}
                      </span>

                      {offer.expiryDate && (
                        <span className="flex items-center justify-center gap-1 text-[10px] text-gray-400 mt-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-3.5 h-3.5 text-indigo-500"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 12h.008v.008H9.75V12Zm0 2.25h.008v.008H9.75V14.25Zm0 2.25h.008v.008H9.75v-.008ZM7.5 12h.008v.008H7.5V12Zm0 2.25h.008v.008H7.5V14.25Z"
                            />
                          </svg>
                          Valid till--
                          {new Date(offer.expiryDate).toLocaleDateString(
                            "en-IN",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            },
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
