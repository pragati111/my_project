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
  const isManualScroll = useRef(false);

  const scrollToCategory = (index) => {
  const container = containerRef.current;
  const target = categoryRefs.current[index];

  if (container && target) {
    isManualScroll.current = true;

    const containerTop = container.getBoundingClientRect().top;
    const targetTop = target.getBoundingClientRect().top;

    const scrollOffset = targetTop - containerTop;

    container.scrollTo({
      top: container.scrollTop + scrollOffset,
      behavior: "smooth",
    });

    setActiveIndex(index);

    setTimeout(() => {
      isManualScroll.current = false;
    }, 400);
  }
};

 useEffect(() => {
  const container = containerRef.current;

  const observer = new IntersectionObserver(
    (entries) => {
      if (isManualScroll.current) return; // 🚨 ignore during click scroll

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.dataset.index);
          setActiveIndex(index);
        }
      });
    },
    {
      root: container,
      rootMargin: "-30% 0px -50% 0px",
      threshold: 0.1,
    }
  );

  categoryRefs.current.forEach((ref) => {
    if (ref) observer.observe(ref);
  });

  return () => observer.disconnect();
}, []);

  return (
    <>
      <TopHeader />

      <div className="mt-16 flex h-[calc(100vh-64px)] bg-gray-50">
        
        {/* ================= LEFT SIDEBAR ================= */}
        <div className="w-[20%] min-w-[85px] max-w-[110px] flex-shrink-0 overflow-y-auto bg-white border-r border-gray-200">
          

          {categories.map((cat, index) => (
            <motion.div
              key={index}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToCategory(index)}
              className={`relative px-1 py-2 cursor-pointer flex flex-col items-center justify-center ${
                activeIndex === index
                  ? "bg-gray-100 text-black"
                  : "text-gray-600"
              }`}
            >
              {/* Active indicator */}
              {activeIndex === index && (
                <div className="absolute left-0 top-0 h-full w-[3px] bg-black rounded-full" />
              )}

              {/* Icon */}
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100">
                <img
                  src={cat.children?.[0]?.items?.[0]?.image}
                  alt="icon"
                  className="w-6 h-6 object-contain"
                />
              </div>

              {/* Name */}
              <span className="text-[11px] text-center leading-tight line-clamp-2 mt-1">
                {cat.name}
              </span>
            </motion.div>
          ))}
        </div>

        {/* ================= RIGHT CONTENT ================= */}
        <div
          ref={containerRef}
          className="w-[80%] overflow-y-auto p-3 space-y-8 pb-40"
        >
          {categories.map((cat, i) => (
            <div
  key={i}
  data-index={i}
  ref={(el) => (categoryRefs.current[i] = el)}
  className="scroll-mt-24"
>
              {/* Category Title */}
              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-lg font-semibold mb-4 text-gray-800"
              >
                {cat.name}
              </motion.h2>

              {/* Subcategories */}
              {cat.children.map((sub, idx) => (
                <div key={idx} className="mb-5">
                  
                  <p className="text-xs font-semibold text-gray-500 mb-3 uppercase">
                    {sub.name}
                  </p>

                  {/* GRID */}
                  <div className="grid grid-cols-3 gap-3">
                    {sub.items.map((item, id) => (
                      <motion.div
  key={id}
  whileTap={{ scale: 0.95 }}
  onClick={() => navigate(`/product/${item.id}`)}
  className="flex flex-col items-center justify-start"
>
  {/* IMAGE */}
  <div className="flex items-center justify-center">
  <div className="w-12 h-12 min-w-[48px] min-h-[48px] rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
    <img
      src={item.image}
      alt={item.name}
      className="w-full h-full object-cover"
    />
  </div>
</div>

  {/* NAME */}
  <p className="text-[11px] text-gray-700 text-center mt-1 leading-tight line-clamp-2 px-1">
    {item.name}
  </p>
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