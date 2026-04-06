import WorkspaceBranding from "./WorkspaceBranding";
import TradeShows from "./TradeShows";
import MarketingSection from "./MarketingSection";
import CategoryBanner from "./CategoryBanner";
import EcoBackdropBanner from "./EcoBackdropBanner";
import OrderProcess from "./OrderProcess";
import Testimonials from "./Testimonials";
import PremiumFooter from "./PremiumFooter";
import CardCluster from "./CardCluster";
import PremiumShowcase from "./PremiumShowcase";
import InfographicTimeline from "./InfographicTimeline";
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

{/* 🔶 Premium Hero Section */}
<div className="px-4 md:px-8 lg:px-12 m-0 p-0">
  <div className="relative overflow-hidden w-full h-[220px] md:h-[350px] bg-[#080808] border border-white/5 shadow-2xl rounded-sm">
    
    {/* Sophisticated Linear Gradient Background */}
    <div className="absolute inset-0 bg-[linear-gradient(110deg,#0a0a0a_0%,#1a1a1a_50%,#0a0a0a_100%)] opacity-60" />

    {/* Content Container */}
    <div className="relative z-10 h-full w-full flex items-center justify-between px-6 md:px-16">
      
      {/* Left Side: Premium Text */}
      <div className="flex-shrink-0">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse" />
          <span className="text-[9px] md:text-[10px] tracking-[0.4em] text-white/40 uppercase font-bold">
            Next-Gen Print
          </span>
        </div>
        
        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-none italic">
          ULTRA <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-purple-400 not-italic">
            MARKETING.
          </span>
        </h1>
        
        <p className="mt-3 text-[10px] md:text-[11px] text-gray-500 uppercase tracking-[0.2em] font-medium hidden sm:block">
          Precision in every pixel. Quality in every print.
        </p>
      </div>

      {/* Right Side: Floating Image Cluster */}
      <div className="relative w-[180px] md:w-[320px] h-full flex items-center justify-center">
        
        

        {/* Main Center Square (The Anchor) */}
        <div className="absolute z-20 w-24 h-24 md:w-36 md:h-36 rounded-xl overflow-hidden border border-white/10 shadow-2xl transition-transform hover:scale-110 duration-500">
          <img src="images/1.jpg" alt="Work 1" className="w-full h-full object-cover" />
        </div>

        {/* Top Right Offset Square */}
        <div className="absolute top-6 md:top-10 right-0 md:right-4 z-10 w-16 h-16 md:w-24 md:h-24 rounded-lg overflow-hidden border border-white/5 opacity-40 rotate-12 hover:rotate-0 hover:opacity-100 transition-all duration-500">
          <img src="images/2.jpg" alt="Work 2" className="w-full h-full object-cover grayscale hover:grayscale-0" />
        </div>

        {/* Bottom Right Offset Square */}
        <div className="absolute bottom-6 md:bottom-10 right-0 md:right-4 z-10 w-14 h-14 md:w-20 md:h-20 rounded-lg overflow-hidden border border-white/5 opacity-30 rotate-6 hover:rotate-0 hover:opacity-100 transition-all duration-500 delay-100">
          <img src="images/3.jpg" alt="Work 4" className="w-full h-full object-cover grayscale hover:grayscale-0" />
        </div>

        {/* Bottom Left Offset Square */}
        <div className="absolute bottom-6 md:bottom-10 left-0 md:left-4 z-10 w-14 h-14 md:w-20 md:h-20 rounded-lg overflow-hidden border border-white/5 opacity-30 -rotate-12 hover:rotate-0 hover:opacity-100 transition-all duration-500">
          <img src="images/4.jpg" alt="Work 3" className="w-full h-full object-cover" />
        </div>

        {/* Floating Glass/Accent Square */}
        <div className="absolute top-12 left-6 md:left-12 z-30 w-10 h-10 md:w-12 md:h-12 rounded-md overflow-hidden border border-white/20 bg-white/5 backdrop-blur-md hidden sm:block hover:rotate-0 hover:opacity-100 transition-all duration-500">
          <img src="images/5.jpg" alt="Work 5" className="w-full h-full object-cover opacity-60" />
        </div>

        {/* Background Aura (for the "Awe" effect) */}
        <div className="absolute inset-0 bg-purple-500/5 blur-[60px] rounded-full scale-150" />
      </div>
    </div>

    {/* Detail: Subtle border glow at the top */}
    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
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

      {/* 🔶 Card Cluster */}
      <CardCluster />


      {/* 🔶 Premium Showcase */}
      <PremiumShowcase />


      {/* 🔶 Infographic Timeline */}
      <InfographicTimeline />

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