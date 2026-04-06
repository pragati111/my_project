import React from 'react';

// Common rounded corners for all cards
const CARD_ROUNDING = "rounded-3xl";

// --- Sub-components ---

const ContentCard = ({ imageUrl, title, author, className = "" }) => (
  <div className={`relative ${CARD_ROUNDING} overflow-hidden group border border-gray-100 dark:border-gray-800 ${className}`}>
    <img src={imageUrl} alt={title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 md:p-6 flex flex-col justify-end">
      <h3 className="text-white text-base md:text-lg font-bold leading-tight mb-2 line-clamp-2">{title}</h3>
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-gray-400 border border-white/20"></div>
        <p className="text-gray-200 text-xs md:text-sm font-medium">{author}</p>
      </div>
    </div>
  </div>
);

const TextOnlyCard = ({ title, author, className = "" }) => (
  <div className={`bg-white dark:bg-zinc-900 p-4 md:p-6 flex flex-col justify-between ${CARD_ROUNDING} border border-gray-100 dark:border-zinc-800 ${className}`}>
    <h3 className="text-gray-900 dark:text-gray-100 text-base md:text-lg font-bold leading-tight">{title}</h3>
    <p className="text-gray-500 dark:text-zinc-400 text-xs md:text-sm font-medium">{author}</p>
  </div>
);

const BannerCard = ({ className = "" }) => (
  <div className={`bg-rose-600 p-4 md:p-6 ${CARD_ROUNDING} flex flex-col justify-center items-start ${className}`}>
    <p className="text-rose-100 text-sm md:text-base font-bold leading-none">Join the</p>
    <p className="text-white text-2xl md:text-3xl font-black leading-tight">Upside Down</p>
  </div>
);

// --- Main Layout Component ---

const CardCluster = () => {
  return (
    <div className="w-full bg-gray-50 dark:bg-white p-4 md:p-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-4">
        
        {/* Column 1: Left Stack */}
        <div className="md:col-span-3 flex flex-col gap-4">
          <ContentCard
            imageUrl="https://upload.wikimedia.org/wikipedia/en/2/21/Web_of_Spider-Man_Vol_1_129-1.png"
            title="Spiderman: Into the Spider-Verse"
            author="By Marvel Studios"
            className="h-64 md:h-80"
          />
          <TextOnlyCard
            title="The Future of Web Development"
            author="By Jane Doe"
            className="h-32 md:h-40"
          />
        </div>

        {/* Column 2: Center Stack (The one we shortened) */}
        <div className="md:col-span-6 flex flex-col gap-4">
          <ContentCard
            imageUrl="https://images.unsplash.com/photo-1512132411229-c30391241dd8?q=80&w=600&auto=format&fit=crop"
            title="The Art of Still Life Photography"
            author="By Michael Jordan"
            className="h-64 md:h-80" // REDUCED HEIGHT HERE
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <TextOnlyCard 
                title="Branding Strategy 101" 
                author="By Sarah Lee" 
                className="h-32 md:h-40"
             />
             <TextOnlyCard 
                title="Mastering Tailwind CSS" 
                author="By Leo Messi" 
                className="h-32 md:h-40"
             />
          </div>
        </div>

        {/* Column 3: Right Stack */}
        <div className="md:col-span-3 flex flex-col gap-4">
          <BannerCard className="h-32 md:h-40" />
          <ContentCard
            imageUrl="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=600&auto=format&fit=crop"
            title="Landscape Photography Essentials"
            author="By Alex Wong"
            className="h-64 md:h-80"
          />
        </div>

      </div>
    </div>
  );
};

export default CardCluster;