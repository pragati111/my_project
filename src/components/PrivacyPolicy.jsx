import React, { useEffect } from "react";
import TopHeader from "../components/TopHeader";
import Sidebar from "../components/SideBar";
import BottomBar from "../components/BottomBar";
import PremiumFooter from "../components/PremiumFooter";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
// 👉 Add this import at the top of your global CSS or index.html for premium font:
// <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">

export default function PrivacyPolicy() {
  const navigate = useNavigate();
  useEffect(() => {
  window.scrollTo(0, 0);
}, []);
  return (
    
    <>
    <TopHeader />
    <div className="w-full lg:w-[calc(100%-240px)] lg:ml-[240px] pt-[60px] bg-gradient-to-br from-[#f8fafc] via-[#eef2ff] to-[#fdf2f8] min-h-screen font-[Inter]">
      {/* Sidebar */}
      <Sidebar />
      

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        

        <main className="px-6 md:px-12 py-10 max-w-6xl mx-auto w-full">
          {/* Header */}
          <div className="mb-10">
            <div className="flex justify-start relative z-10 mb-5">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition font-medium"
              >
                <ChevronLeft size={20} />
                Back
              </button>
            </div>

            <h1 className="text-3xl md:text-5xl font-semibold text-gray-900 tracking-tight font-[Playfair_Display]">
              Privacy Policy
            </h1>
            <p className="text-gray-500 mt-2 text-sm">
              Last Updated: November 2025
            </p>
          </div>

          {/* Card Container */}
          <div className="bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl p-6 md:p-10 shadow-lg space-y-10">

            {/* Intro */}
            <section className="text-base md:text-lg leading-relaxed text-gray-700">
              <p>
                Your privacy is important to us. We are committed to protecting your
                personal information and ensuring transparency in how we collect,
                use, and safeguard your data.
              </p>
            </section>

            {/* Info Collection */}
            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4 font-[Playfair_Display]">
                Information We Collect
              </h2>

              <div className="space-y-4 text-gray-700 text-sm md:text-base leading-relaxed">
                <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-sm">
                  <p className="font-medium text-gray-900 mb-1">
                    Personal Information
                  </p>
                  <p>
                    Includes your name, email, phone number, and any details you
                    provide while placing orders or contacting us.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-sm">
                  <p className="font-medium text-gray-900 mb-1">Usage Data</p>
                  <p>
                    Includes pages visited, time spent, interactions, and browsing
                    behavior to improve our platform experience.
                  </p>
                </div>
              </div>
            </section>

            {/* Usage */}
            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4 font-[Playfair_Display]">
                How We Use Your Information
              </h2>

              <ul className="space-y-3 text-gray-700 text-sm md:text-base list-disc pl-5">
                <li>To provide and maintain our services</li>
                <li>To improve user experience and personalization</li>
                <li>To communicate updates, offers, and support</li>
                <li>To ensure security and prevent fraud</li>
              </ul>
            </section>

            {/* Security */}
            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4 font-[Playfair_Display]">
                Data Security
              </h2>
              <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                We implement industry-standard security measures to protect your
                data. However, no system is completely secure, and we encourage
                users to take precautions when sharing sensitive information.
              </p>
            </section>

            {/* Rights */}
            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4 font-[Playfair_Display]">
                Your Rights
              </h2>
              <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                You have the right to access, update, or delete your personal
                information. You can contact us anytime for such requests.
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4 font-[Playfair_Display]">
                Contact Us
              </h2>
              <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                If you have any questions regarding this Privacy Policy, feel free
                to reach out to us via email or phone.
              </p>
            </section>
          </div>
        </main>

        <PremiumFooter />
        <BottomBar />
      </div>
    </div>
    </>
  );
}
