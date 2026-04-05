import WorkspaceBranding from "./WorkspaceBranding";
import TradeShows from "./TradeShows";
import MarketingSection from "./MarketingSection";
import CategoryBanner from "./CategoryBanner";
export default function HomeContent() {
  return (
    <div className="space-y-6">

      {/* 🔶 Hero Section */}
      <div className="px-4 md:px-16">
        <div className="relative bg-gray-100 overflow-hidden">
          <img
            src="https://via.placeholder.com/1200x400"
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
      <div className="px-4 md:px-16 pb-6">
        <div className="bg-gray-100 p-4 md:p-6 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          
          <Feature title="1217+ Reviews" subtitle="4.7 ★★★★★" />
          <Feature title="25+ Years Expertise" subtitle="Print Perfected" />
          <Feature title="Expert Support" subtitle="Chat, Email, Call" />
          <Feature title="Secure Payment" subtitle="100% Safe" />
          <Feature title="Quick Turnaround" subtitle="Rapid Production" />
          <Feature title="Venue Delivery" subtitle="Flexible Drop-off" />

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