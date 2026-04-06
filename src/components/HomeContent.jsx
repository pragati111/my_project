import WorkspaceBranding from "./WorkspaceBranding";
import TradeShows from "./TradeShows";
import MarketingSection from "./MarketingSection";
import CategoryBanner from "./CategoryBanner";
import EcoBackdropBanner from "./EcoBackdropBanner";
import OrderProcess from "./OrderProcess";
import Testimonials from "./Testimonials";
import PremiumFooter from "./PremiumFooter";
import { Star, ShieldCheck, Headphones, Truck, Clock, Award } from "lucide-react";
const features = [
  {
    title: "1217+ Reviews",
    subtitle: "4.7 ★★★★★",
    icon: <Star size={18} />,
    color: "bg-yellow-500",
  },
  {
    title: "25+ Years Expertise",
    subtitle: "Print Perfected",
    icon: <Award size={18} />,
    color: "bg-purple-500",
  },
  {
    title: "Expert Support",
    subtitle: "Chat, Email, Call",
    icon: <Headphones size={18} />,
    color: "bg-blue-500",
  },
  {
    title: "Secure Payment",
    subtitle: "100% Safe",
    icon: <ShieldCheck size={18} />,
    color: "bg-green-500",
  },
  {
    title: "Quick Turnaround",
    subtitle: "Rapid Production",
    icon: <Clock size={18} />,
    color: "bg-orange-500",
  },
  {
    title: "Venue Delivery",
    subtitle: "Flexible Drop-off",
    icon: <Truck size={18} />,
    color: "bg-pink-500",
  },
];

export default function HomeContent() {
  return (
    <div className="space-y-6">

      {/* 🔶 Hero Section */}
      <div className="px-4 md:px-8 lg:px-12">
        <div className="relative bg-gray-100 overflow-hidden">
          <img
            src="images/hero.jpg"
            alt="banner"
            className="w-full h-[220px] md:h-[350px] object-cover"
          />

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/80 px-4 md:px-8 py-3 md:py-6 shadow">
            <h2 className="text-lg md:text-2xl font-bold text-center">
              PRINT & MARKETING
            </h2>
          </div>
        </div>
      </div>

      {/* 🔶 Features */}
      <div className="px-4 md:px-8 lg:px-12 pb-6">
      
      <div className="bg-gray-100 p-4 md:p-5 grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 rounded-xl">
        
        {features.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-gray-200 
                       rounded-xl p-3 md:p-4 shadow-sm hover:shadow-md 
                       transition-all duration-300 hover:-translate-y-1"
          >
            {/* Icon */}
            <div className={`w-8 h-8 flex items-center justify-center rounded-lg text-white shrink-0 ${item.color}`}>
              {item.icon}
            </div>

            {/* Text */}
            <div>
              <h3 className="text-[9px] md:text-sm font-semibold text-gray-900 leading-tight">
                {item.title}
              </h3>
              <p className="text-[7px] md:text-xs text-gray-500">
                {item.subtitle}
              </p>
            </div>
          </div>
        ))}

      </div>
    </div>

      {/* 🔶 Workspace Branding */}
      <WorkspaceBranding />

      {/* 🔶 Trade Shows */}
      <TradeShows />

      {/* 🔶 Marketing Section */}
      <MarketingSection/>

      {/* 🔶 Category Banner */}
      <CategoryBanner />

      {/* 🔶 Backdrop  */}
      <EcoBackdropBanner />

      {/* 🔶 Order Process */}
      <OrderProcess />

      {/* 🔶 Testimonials */}
      <Testimonials />

      {/* 🔶 Premium Footer */}
      <PremiumFooter />

    </div>
  );
}

/* 🔹 Feature */
function Feature({ title, subtitle }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 md:w-10 md:h-10 bg-orange-100"></div>
      <div>
        <h4 className="font-semibold text-xs md:text-sm">{title}</h4>
        <p className="text-[10px] md:text-xs text-gray-500">{subtitle}</p>
      </div>
    </div>
  );
}