import React from 'react';
import { Star } from 'lucide-react';

const CategoryStack = ({ title, subtitle, items }) => {
  return (
    /* The outer container maintains a consistent height for the whole 'Stack' */
    <div className="flex flex-col w-full h-[580px] bg-gray-100 border border-white/10 rounded-2xl p-4 md:p-6 shadow-2xl transition-all hover:border-amber-500/30 group">
      
      {/* Header Section: Fixed Height */}
      <div className="mb-4 md:mb-6 border-b border-gray-200/50 pb-4 flex-shrink-0">
        <h2 className="text-xl md:text-2xl font-serif tracking-wide text-black uppercase italic">
          {title}
        </h2>
        <p className="text-[10px] uppercase tracking-[0.2em] text-amber-600 font-semibold mt-1">
          {subtitle}
        </p>
      </div>

      {/* Scrollable Grid Container */}
      {/* 1. flex-grow: Fills the remaining space in the 600px parent.
          2. overflow-y-auto: Enables the scroll.
          3. scrollbar-thin: Premium thin scrollbar style.
      */}
      <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 pb-4">
          {items.map((item, idx) => (
            <div 
              key={idx} 
              className="group/card relative bg-gray-200 p-[1px] rounded-xl overflow-hidden cursor-pointer h-fit"
            >
              <div className="bg-white p-2 md:p-3 rounded-xl flex flex-row md:flex-col items-center md:items-start transition-colors group-hover/card:bg-gray-50">
                <div className="relative w-20 h-14 md:w-full md:h-auto md:aspect-square flex-shrink-0 md:mb-3 overflow-hidden rounded-lg bg-gray-50">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110 opacity-95"
                  />
                </div>

                <div className="ml-3 md:ml-0 flex-grow">
                  <div className="flex gap-0.5 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={8} 
                        fill={i < Math.floor(item.rating) ? "#d4af37" : "none"} 
                        className={i < Math.floor(item.rating) ? "text-amber-500" : "text-gray-300"}
                      />
                    ))}
                  </div>
                  <h3 className="text-xs font-semibold text-gray-900 truncate">{item.name}</h3>
                  <p className="text-[9px] text-gray-500 mt-0.5 italic">{item.tagline}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Global CSS for the Premium Scrollbar */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d1d5db; /* Light gray thumb */
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #b45309; /* Amber/Gold on hover */
        }
      `}</style>
    </div>
  );
};

const PremiumShowcase = () => {
  // You can now add 10+ items per category and the heights will stay perfectly aligned.
  const collections = [
    {
      title: "Lifestyle",
      subtitle: "Luxury Selections",
      items: [
        { name: "Scarf", rating: 4.5, tagline: "Curated Textures", image: "images/1.jpg" },
        { name: "Pillows", rating: 5, tagline: "Velvet Comfort", image: "images/2.jpg" },
        { name: "High-end Pen", rating: 5, tagline: "Precision Writing", image: "images/3.jpg" },
        { name: "Bespoke Tray", rating: 4, tagline: "Leather Finish", image: "images/4.jpg" },
        { name: "Scarf", rating: 4.5, tagline: "Curated Textures", image: "images/1.jpg" },
        { name: "Pillows", rating: 5, tagline: "Velvet Comfort", image: "images/2.jpg" },
        { name: "High-end Pen", rating: 5, tagline: "Precision Writing", image: "images/3.jpg" },
        { name: "Bespoke Tray", rating: 4, tagline: "Leather Finish", image: "images/4.jpg" },
      ]
    },
    {
      title: "Just for You",
      subtitle: "Artisan Discoveries",
      items: [
        { name: "Notebook", rating: 5, tagline: "Crafted for Ideas", image: "images/5.jpg" },
        { name: "Wax Seal", rating: 4.5, tagline: "Signature Touch", image: "images/6.jpg" },
        { name: "Folio", rating: 5, tagline: "Smart Leather", image: "images/7.jpg" },
        { name: "Whiskey Glass", rating: 5, tagline: "Premium Cut", image: "images/1.jpg" },
        { name: "Notebook", rating: 5, tagline: "Crafted for Ideas", image: "images/5.jpg" },
        { name: "Wax Seal", rating: 4.5, tagline: "Signature Touch", image: "images/6.jpg" },
        { name: "Folio", rating: 5, tagline: "Smart Leather", image: "images/7.jpg" },
        { name: "Whiskey Glass", rating: 5, tagline: "Premium Cut", image: "images/1.jpg" },
      ]
    },
    {
      title: "Décor",
      subtitle: "Interior Touches",
      items: [
        { name: "Name Plate", rating: 4.5, tagline: "Modern Brass", image: "images/2.jpg" },
        { name: "Wallpaper", rating: 5, tagline: "Original Prints", image: "images/3.jpg" },
        { name: "Centerpiece", rating: 5, tagline: "Sculptural Form", image: "images/4.jpg" },
        { name: "Area Rug", rating: 4, tagline: "Wool Blend", image: "images/5.jpg" },
        { name: "Name Plate", rating: 4.5, tagline: "Modern Brass", image: "images/2.jpg" },
        { name: "Wallpaper", rating: 5, tagline: "Original Prints", image: "images/3.jpg" },
        { name: "Centerpiece", rating: 5, tagline: "Sculptural Form", image: "images/4.jpg" },
        { name: "Area Rug", rating: 4, tagline: "Wool Blend", image: "images/5.jpg" },
      ]
    }
  ];

  return (
    <div className="bg-white min-h-screen py-10 px-4 md:px-8 flex items-center justify-center">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start">
        {collections.map((col, index) => (
          <CategoryStack key={index} {...col} />
        ))}
      </div>
    </div>
  );
};

export default PremiumShowcase;