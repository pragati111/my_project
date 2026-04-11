import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { Star } from 'lucide-react';

// Required Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const testimonialData = [
  { 
    id: 1, 
    name: "Meenal Karani", 
    role: "Marketing Manager",
    image: "https://i.pravatar.cc/150?u=meenal", // Placeholder images
    date: "01/01/2023",
    text: "Deluxe was efficient with my last minute urgent order for a market for flag and table cover. Farhan delivered my order on time! Very impressed with their quick response.Deluxe was efficient with my last minute urgent order for a market for flag and table cover. Farhan delivered my order on time! Very impressed with their quick response.Deluxe was efficient with my last minute urgent order for a market for flag and table cover. Farhan delivered my order on time! Very impressed with their quick response.Deluxe was efficient with my last minute urgent order for a market for flag and table cover. Farhan delivered my order on time! Very impressed with their quick response.Deluxe was efficient with my last minute urgent order for a market for flag and table cover. Farhan delivered my order on time! Very impressed with their quick response.", 
    rating: 5 
  },
  { 
    id: 2, 
    name: "Hind Alzarouni", 
    role: "Creative Director",
    image: "https://i.pravatar.cc/150?u=hind",
    date: "12/12/2022",
    text: "Deluxe Printing are a flexible printing company who complete tasks quickly. They have always provided top quality items.", 
    rating: 5 
  },
  { 
    id: 3, 
    name: "Hind Alzarouni", 
    role: "Creative Director",
    image: "https://i.pravatar.cc/150?u=hind",
    date: "12/12/2022",
    text: "Deluxe Printing are a flexible printing company who complete tasks quickly. They have always provided top quality items.", 
    rating: 5 
  },
  { 
    id: 4, 
    name: "Hind Alzarouni", 
    role: "Creative Director",
    image: "https://i.pravatar.cc/150?u=hind",
    date: "12/12/2022",
    text: "Deluxe Printing are a flexible printing company who complete tasks quickly. They have always provided top quality items.", 
    rating: 5 
  },
  { 
    id: 5, 
    name: "Hind Alzarouni", 
    role: "Creative Director",
    image: "https://i.pravatar.cc/150?u=hind",
    date: "12/12/2022",
    text: "Deluxe Printing are a flexible printing company who complete tasks quickly. They have always provided top quality items.", 
    rating: 5 
  },
  { 
    id: 6, 
    name: "Hind Alzarouni", 
    role: "Creative Director",
    image: "https://i.pravatar.cc/150?u=hind",
    date: "12/12/2022",
    text: "Deluxe Printing are a flexible printing company who complete tasks quickly. They have always provided top quality items.", 
    rating: 5 
  },
  { 
    id: 7, 
    name: "Hind Alzarouni", 
    role: "Creative Director",
    image: "https://i.pravatar.cc/150?u=hind",
    date: "12/12/2022",
    text: "Deluxe Printing are a flexible printing company who complete tasks quickly. They have always provided top quality items.", 
    rating: 5 
  },
  { 
    id: 8, 
    name: "Hind Alzarouni", 
    role: "Creative Director",
    image: "https://i.pravatar.cc/150?u=hind",
    date: "12/12/2022",
    text: "Deluxe Printing are a flexible printing company who complete tasks quickly. They have always provided top quality items.", 
    rating: 5 
  },
  { 
    id: 9, 
    name: "Hind Alzarouni", 
    role: "Creative Director",
    image: "https://i.pravatar.cc/150?u=hind",
    date: "12/12/2022",
    text: "Deluxe Printing are a flexible printing company who complete tasks quickly. They have always provided top quality items.", 
    rating: 5 
  },
  // ... rest of your data (add role, image, and date to each)
  { 
    id: 10, 
    name: "John Doe", 
    role: "Marketing Manager",
    image: "https://i.pravatar.cc/150?u=john",
    date: "01/01/2023",
    text: "Reliable and professional. The quality of the business cards was outstanding. The team really went above and beyond.", 
    rating: 5 
  }
];

const Testimonials = () => {
  return (
    <section className="relative w-full py-12 bg-gradient-to-tr from-slate-50 via-white to-blue-50">
      <div className="max-w-[1200px] mx-auto px-6">
        
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Testimonials</h2>
          <p className="text-gray-500 text-xs max-w-md mx-auto">
            Real feedback from our valued clients across the globe.
          </p>
        </div>

        <Swiper
          modules={[Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 }, // 4 slides makes the cards smaller/tighter
          }}
          className="pb-12"
        >
          {testimonialData.map((item) => (
            <SwiperSlide key={item.id} className="h-auto">
              {/* COMPACT CARD DESIGN */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col h-[260px] transition-transform hover:-translate-y-1">
                
                {/* Header: Smaller Avatar + Info */}
                <div className="flex items-center gap-3 mb-3">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-12 h-12 rounded-full object-cover grayscale brightness-95 border border-gray-100"
                  />
                  <div className="overflow-hidden">
                    <h4 className="font-bold text-gray-800 text-sm truncate">{item.name}</h4>
                    <p className="text-gray-400 text-[11px] leading-none">{item.role}</p>
                  </div>
                </div>

                {/* Content: Smaller Text + SCROLLBAR */}
                <div className="flex-grow overflow-y-auto mb-4 custom-card-scroll pr-1">
                  <p className="text-gray-600 text-[12px] leading-relaxed">
                    {item.text}
                  </p>
                </div>

                {/* Footer: Stars + Date */}
                <div className="flex justify-between items-center pt-3 border-t border-gray-50">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={12} 
                        className={i < item.rating ? "text-yellow-400" : "text-gray-200"} 
                        fill={i < item.rating ? "currentColor" : "none"} 
                      />
                    ))}
                  </div>
                  <span className="text-[9px] font-semibold text-gray-400 uppercase tracking-tighter">
                    {item.date}
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx global>{`
        /* Swiper Pagination Styling */
        .swiper-pagination-bullet {
          width: 6px;
          height: 6px;
          background: #cbd5e1 !important;
          opacity: 1 !important;
        }
        .swiper-pagination-bullet-active {
          background: #94a3b8 !important;
          transform: scale(1.2);
        }

        /* Subtle Scrollbar for the review text */
        .custom-card-scroll::-webkit-scrollbar {
          width: 3px;
        }
        .custom-card-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-card-scroll::-webkit-scrollbar-thumb {
          background: #f1f5f9;
          border-radius: 10px;
        }
        .custom-card-scroll:hover::-webkit-scrollbar-thumb {
          background: #e2e8f0;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;