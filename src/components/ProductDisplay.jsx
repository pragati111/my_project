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
            <div className="w-full lg:w-[420px]">
              <div className="relative h-[320px] lg:h-[420px] bg-white border rounded flex items-center justify-center">
                <button onClick={handlePrev} className="absolute left-2">
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

                <button onClick={handleNext} className="absolute right-2">
                  ›
                </button>
              </div>

              {/* THUMB */}
              <div className="mt-4 flex gap-3 overflow-x-auto">
                {media.map((item, i) => (
                  <div
                    key={i}
                    ref={(el) => (thumbnailRefs.current[i] = el)}
                    onClick={() => setActiveIndex(i)}
                    className={`w-[70px] h-[70px] border cursor-pointer ${
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
            <div ref={rightRef} className="flex-1 space-y-6">
              <h1 className="text-xl lg:text-2xl font-semibold">
                {product.productName || product.name}
              </h1>

              <p className="text-green-600 text-lg font-bold">
                ₹{product.price}
              </p>

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
                          {field.type === "file" && (
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
                          )}
                        </div>
                      ))}

                      {/* QUANTITY */}
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
                  ))}
                </div>

                <button onClick={addConfig} className="mt-3 text-blue-600">
                  + Add Design
                </button>
              </div>

              {/* ADD TO CART */}
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

              {/* REVIEWS SECTION */}
              <div className="pt-6 border-t">
                <h2 className="font-semibold text-lg mb-2">Reviews</h2>
                <p className="text-sm text-gray-500">No reviews yet.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomBar />
    </div>
  );
}
