import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { Quote, Star } from 'lucide-react';

// Required Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const testimonialData = [
  { id: 1, name: "Meenal Karani", text: "Deluxe was efficient with my last minute urgent order for a market for flag and table cover. Farhan delivered my order on time! Very impressed with their quick response.", rating: 5 },
  { id: 2, name: "Hind Alzarouni", text: "Deluxe Printing are a flexible printing company who complete tasks quickly. They have always provided top quality items and have listened to my requests.", rating: 5 },
  { id: 3, name: "Larson Dcosta", text: "A very professional organization with competitive rates. Did a really good job preparing a couple of company stamps on an urgent basis. Mr. Yunus was very helpful.", rating: 5 },
  { id: 4, name: "Jelena Pepic", text: "At first, I was skeptical after seeing so many positive reviews. However, I decided to give them a try because of their competitive pricing.", rating: 5 },
  { id: 5, name: "Sarah Khan", text: "Excellent service and high-quality prints. The team was very accommodating and delivered earlier than expected.", rating: 5 },
  { id: 6, name: "John Doe", text: "Reliable and professional. The quality of the business cards was outstanding.", rating: 5 }
];

const Testimonials = () => {
  return (
    <section className="relative w-screen left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] py-12 lg:py-20 overflow-hidden bg-[#fdfdfd]">
      
      {/* THE TEXTURE & FADE YOU LIKED */}
      <div className="absolute inset-0 z-0 opacity-[0.15]" 
           style={{ 
             backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill='%23000000'%3E%3Cpath d='M50 0l50 25v50l-50 25-50-25v-50z' fill-opacity='0.1'/%3E%3Cpath d='M50 5l45 22.5v45l-45 22.5-45-22.5v-45z' fill='none' stroke='%23000000' stroke-width='1'/%3E%3C/g%3E%3C/svg%3E")`,
             backgroundSize: '120px' 
           }}>
      </div>
      <div className="absolute inset-0 z-10 bg-[radial-gradient(circle,_transparent_30%,_rgba(220,220,220,0.5)_100%)]"></div>

      <div className="relative z-20 w-full max-w-[1400px] mx-auto px-4 lg:px-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#1a1a1a] mb-3">Testimonials</h2>
          <p className="text-gray-600 text-sm lg:text-base max-w-xl mx-auto">
            We have worked with many happy and satisfied clients. Here is what they have to say about us.
          </p>
        </div>

        <Swiper
          modules={[Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          /* Clickable dots are now active */
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          className="pb-16"
        >
          {testimonialData.map((item) => (
            <SwiperSlide key={item.id} className="h-auto">
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 flex flex-col justify-between h-full min-h-[300px]">
                <p className="text-gray-500 text-[13px] lg:text-sm leading-relaxed italic">
                  "{item.text}"
                </p>

                <div className="mt-8 flex justify-between items-end">
                  <Quote className="text-[#e65100] w-10 h-10 rotate-180 opacity-80" fill="currentColor" />
                  <div className="text-right">
                    <h4 className="font-bold text-[#1a1a1a] text-sm lg:text-base uppercase">{item.name}</h4>
                    <div className="flex justify-end gap-0.5 mt-1">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} size={12} className="text-orange-500" fill="currentColor" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* STYLING DOTS TO MATCH YOUR IMAGE */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: #ccc !important;
          opacity: 1 !important;
          cursor: pointer !important;
          margin: 0 5px !important;
        }
        .swiper-pagination-bullet-active {
          background: #7a7a7a !important;
          transform: scale(1.1);
        }
      `}</style>
    </section>
  );
};

export default Testimonials;