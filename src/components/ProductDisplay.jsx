import { useParams } from "react-router-dom";
import Sidebar from "./SideBar";
import TopHeader from "./TopHeader";
import BottomBar from "./BottomBar";
import { useEffect, useState, useRef } from "react";
import { useCart } from "../redux/useCart";

export default function ProductDisplay() {
  const { addToCart } = useCart();
  const { id } = useParams();

  // ✅ STATES (correct order)
  const [product, setProduct] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [configs, setConfigs] = useState([{}]);

  const thumbnailRefs = useRef([]);
  const rightRef = useRef(null);

  // ✅ FETCH PRODUCT
  useEffect(() => {
    fetch(`https://my-project-backend-ee4t.onrender.com/api/product`)
      .then((res) => res.json())
      .then((res) => {
        const found = res.data.find((p) => p._id === id);
        setProduct(found || null);
      })
      .catch((err) => console.error(err));
  }, [id]);

  // ✅ RESET ON ID CHANGE
  useEffect(() => {
    setActiveIndex(0);
    setConfigs([{}]);
  }, [id]);

  // ✅ THUMB SCROLL
  useEffect(() => {
    const currentThumb = thumbnailRefs.current[activeIndex];
    if (currentThumb) {
      currentThumb.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [activeIndex]);

  // ✅ SCROLL SYNC
  useEffect(() => {
    const left = document.querySelector("#left-section");

    const handler = (e) => {
      if (!rightRef.current) return;

      const el = rightRef.current;

      const isScrollingDown = e.deltaY > 0;
      const isScrollingUp = e.deltaY < 0;

      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
      const atTop = el.scrollTop <= 0;

      if ((isScrollingDown && !atBottom) || (isScrollingUp && !atTop)) {
        e.preventDefault();
        el.scrollTop += e.deltaY;
      }
    };

    left?.addEventListener("wheel", handler, { passive: false });

    return () => {
      left?.removeEventListener("wheel", handler);
    };
  }, []);

  // ✅ LOADING STATE
  if (!product) return <div className="p-10">Loading...</div>;

  // ✅ MEDIA FIX
  const media =
    product.media?.length > 0
      ? product.media
      : product.images?.length > 0
      ? product.images.map((img) => ({
          type: "image",
          url: img,
        }))
      : [{ type: "image", url: "" }];

  const activeMedia = media[activeIndex];

  // ✅ CONFIG HANDLERS
  const handleChange = (index, id, value) => {
    const updated = [...configs];
    updated[index][id] = value;
    setConfigs(updated);
  };

  const handleFileChange = (index, id, file) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      handleChange(index, id, event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const getPreviewSrc = (value) =>
    typeof value === "string" ? value : URL.createObjectURL(value);

  const addConfig = () => setConfigs((prev) => [...prev, {}]);

  const removeConfig = (index) => {
    setConfigs((prev) => prev.filter((_, i) => i !== index));
  };

  const handleNext = () =>
    setActiveIndex((prev) => (prev + 1) % media.length);

  const handlePrev = () =>
    setActiveIndex((prev) =>
      prev === 0 ? media.length - 1 : prev - 1
    );

  const offers = [
    { tag: "MOST POPULAR", title: "Buy 2+", discount: "6% Off", code: "PRINT6" },
    { tag: "BEST VALUE", title: "Buy 5+", discount: "8% Off", code: "PRINT8" },
    { tag: "MOST SAVINGS", title: "Buy 10+", discount: "10% Off", code: "PRINT10" },
  ];

  return (
    <div>
      <div className="hidden md:block">
        <TopHeader />

        <div className="flex">
          <Sidebar />

          <div className="w-full lg:w-[calc(100%-240px)] lg:ml-[240px] pt-[100px] px-6">
            <div className="flex gap-10 h-[calc(100vh-120px)] overflow-hidden">

              {/* LEFT */}
              <div id="left-section" className="w-[420px] flex-shrink-0">
                <div className="relative w-[420px] h-[420px] bg-white border rounded flex items-center justify-center">

                  <button onClick={handlePrev} className="absolute left-2">‹</button>

                  {activeMedia?.type === "image" ? (
                    <img src={activeMedia.url} className="max-h-full object-contain" />
                  ) : (
                    <video src={activeMedia.url} autoPlay muted loop controls />
                  )}

                  <button onClick={handleNext} className="absolute right-2">›</button>
                </div>

                {/* THUMBNAILS */}
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
                      <img src={item.url} />
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT */}
              <div ref={rightRef} className="flex-1 space-y-5 overflow-y-auto">

                <h1 className="text-2xl font-semibold">
                  {product.productName || product.name}
                </h1>

                <p className="text-green-600 text-xl font-bold">
                  ₹{product.price}
                </p>

                {/* CUSTOMIZATION */}
                <div>
                  <h2 className="text-lg font-semibold">Customize</h2>

                  {configs.map((config, index) => (
                    <div key={index} className="border p-4 space-y-3">

                      {product.customizations?.map((field) => (
                        <div key={field.id}>
                          <label>{field.label}</label>

                          {field.type === "text" && (
                            <input
                              type="text"
                              onChange={(e) =>
                                handleChange(index, field.id, e.target.value)
                              }
                            />
                          )}

                          {field.type === "file" && (
                            <input
                              type="file"
                              onChange={(e) =>
                                handleFileChange(index, field.id, e.target.files[0])
                              }
                            />
                          )}
                        </div>
                      ))}

                      <input
                        type="number"
                        value={config.quantity || 1}
                        min="1"
                        onChange={(e) =>
                          handleChange(index, "quantity", +e.target.value)
                        }
                      />
                    </div>
                  ))}

                  <button onClick={addConfig}>+ Add Design</button>
                </div>

                {/* BUTTONS */}
                <button
                  onClick={() => {
                    const formattedConfigs = configs.map((c) => ({
                      config: c,
                      quantity: c.quantity || 1,
                    }));
                    addToCart(product, formattedConfigs);
                  }}
                  className="bg-black text-white px-6 py-3"
                >
                  Add to Cart
                </button>

              </div>
            </div>
          </div>
        </div>

        <BottomBar />
      </div>
    </div>
  );
}