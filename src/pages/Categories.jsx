import { categories } from "../data/categories";
import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import TopHeader from "../components/TopHeader";
import { motion } from "framer-motion";

export default function Categories() {
  const navigate = useNavigate();
  const categoryRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

  const scrollToCategory = (index) => {
    categoryRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setActiveIndex(index);
  };

  useEffect(() => {
    const container = containerRef.current;

    const handleScroll = () => {
      categoryRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          const containerTop = container.getBoundingClientRect().top;

          if (
            rect.top - containerTop <= 120 &&
            rect.bottom - containerTop >= 120
          ) {
            setActiveIndex(index);
          }
        }
      });
    };

    container.addEventListener("scroll", handleScroll);

    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <TopHeader />

      <div className="mt-16 flex h-[calc(100vh-64px)] bg-gradient-to-br from-white via-gray-50 to-gray-100">
        {/* LEFT SIDEBAR */}
        <div className="w-[22%] min-w-[120px] max-w-[220px] flex-shrink-0 p-3 overflow-y-auto backdrop-blur-xl bg-white/70 border-r border-gray-200 shadow-xl z-10">
          <h1 className="text-sm font-semibold mb-4 tracking-wide text-gray-700">
            Categories
          </h1>

          {categories.map((cat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              onClick={() => scrollToCategory(index)}
              className={`relative mb-3 px-1 py-2 cursor-pointer transition-all duration-300 flex flex-col items-center justify-center gap-1 w-full ${
  activeIndex === index
    ? "bg-white shadow-md text-black"
    : "text-gray-600 hover:bg-white/80"
}`}
            >
              {/* Active Indicator */}
              {activeIndex === index && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute left-0 top-0 h-full w-[3px] bg-gray-800 rounded-full"
                />
              )}

              {/* ICON */}
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100">
                <img
                  src={cat.children?.[0]?.items?.[0]?.image}
                  alt="icon"
                  className="w-5 h-5 object-contain"
                />
              </div>

              {/* NAME */}
              <span className="text-[10px] font-medium text-center leading-tight break-words w-full">
                {cat.name}
              </span>
            </motion.div>
          ))}
        </div>

        {/* RIGHT CONTENT */}
        <div
          ref={containerRef}
          className="w-[78%] overflow-y-auto p-6 space-y-50"
        >
          {categories.map((cat, i) => (
            <div
              key={i}
              ref={(el) => (categoryRefs.current[i] = el)}
              className="scroll-mt-24"
            >
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-xl font-medium mb-6 text-gray-700 tracking-wide"
              >
                {cat.name}
              </motion.h2>

              {cat.children.map((sub, idx) => (
                <div key={idx} className="mb-8">
                  <p className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">
                    {sub.name}
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {sub.items.map((item, id) => (
                      <motion.div
                        key={id}
                        whileHover={{ y: -4 }}
                        transition={{ type: "spring", stiffness: 200 }}
                        onClick={() => navigate(`/product/${item.id}`)}
                        className="group bg-white  shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-100"
                      >
                        {/* IMAGE (no extra vertical space) */}
                        <div className="w-full">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-auto object-contain"
                          />
                        </div>

                        {/* NAME (full, no truncation) */}
                        <div className="px-2 py-2">
                          <p className="text-[10px] text-gray-800 text-center leading-tight break-words">
                            {item.name}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
