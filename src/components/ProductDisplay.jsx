import { useParams } from "react-router-dom";
import Sidebar from "./SideBar";
import TopHeader from "./TopHeader";
import BottomBar from "./BottomBar";
import { useEffect, useState, useRef } from "react";
import { useCart } from "../redux/useCart";

export default function ProductDisplay() {
  const { addToCart } = useCart();
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [configs, setConfigs] = useState([{}]);

  const thumbnailRefs = useRef([]);
  const rightRef = useRef(null);
  const getPreviewSrc = (value) =>
    typeof value === "string" ? value : URL.createObjectURL(value);

  // FETCH PRODUCT
  useEffect(() => {
    fetch(`https://my-project-backend-ee4t.onrender.com/api/product`)
      .then((res) => res.json())
      .then((res) => {
        const found = res.data.find((p) => p._id === id);
        setProduct(found || null);
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

  if (!product) return <div className="p-10">Loading...</div>;

  const media =
    product.media?.length > 0
      ? product.media
      : product.images?.map((img) => ({ type: "image", url: img })) || [];

  const activeMedia = media[activeIndex];

  // HANDLERS
  const handleChange = (index, id, value) => {
    const updated = [...configs];
    updated[index][id] = value;
    setConfigs(updated);
  };

  const handleFileChange = (index, id, file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => handleChange(index, id, e.target.result);
    reader.readAsDataURL(file);
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

                {activeMedia?.type === "image" ? (
                  <img
                    src={activeMedia.url}
                    className="max-h-full object-contain"
                  />
                ) : (
                  <video src={activeMedia.url} autoPlay muted loop controls />
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
                                handleChange(index, field.id, e.target.value)
                              }
                            />
                          )}

                          {/* TEXTAREA */}
                          {field.type === "textarea" && (
                            <textarea
                              className="border p-2 w-full"
                              onChange={(e) =>
                                handleChange(index, field.id, e.target.value)
                              }
                            />
                          )}

                          {/* RADIO */}
                          {field.type === "radio" &&
                            field.options?.map((opt) => (
                              <label key={opt} className="block">
                                <input
                                  type="radio"
                                  name={`${field.id}-${index}`}
                                  onChange={() =>
                                    handleChange(index, field.id, opt)
                                  }
                                />{" "}
                                {opt}
                              </label>
                            ))}

                          {/* CHECKBOX */}
                          {field.type === "checkbox" &&
                            field.options?.map((opt) => (
                              <label key={opt} className="block">
                                <input
                                  type="checkbox"
                                  onChange={(e) => {
                                    const prev = config[field.id] || [];
                                    const updated = e.target.checked
                                      ? [...prev, opt]
                                      : prev.filter((o) => o !== opt);
                                    handleChange(index, field.id, updated);
                                  }}
                                />{" "}
                                {opt}
                              </label>
                            ))}

                          {/* DROPDOWN */}
                          {field.type === "dropdown" && (
                            <select
                              className="border p-2 w-full"
                              onChange={(e) =>
                                handleChange(index, field.id, e.target.value)
                              }
                            >
                              <option>Select</option>
                              {field.options?.map((opt) => (
                                <option key={opt}>{opt}</option>
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
                                const value = config[field.id];

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
                                        handleFileChange(
                                          index,
                                          field.id,
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
                                const frontKey = `${field.id}_front`;
                                const backKey = `${field.id}_back`;

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
                                          handleFileChange(
                                            index,
                                            frontKey,
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
                                          handleFileChange(
                                            index,
                                            backKey,
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
                                    handleFileChange(
                                      index,
                                      field.id,
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
                    addToCart(product, formattedConfigs);
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
                config: c,
                quantity: c.quantity || 1,
              }));
              addToCart(product, formattedConfigs);
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
    </div>
  );
}
