import TopHeader from "../components/TopHeader";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  MapPin,
  Gift,
  Bookmark,
  Headphones,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import FAQPage from "./FAQPage";

export default function AccountPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showFAQ, setShowFAQ] = useState(false);
  
  if (showFAQ) {
    return <FAQPage onBack={() => setShowFAQ(false)} />;
  }

  return (
    <>
      <TopHeader />

      <div className="pt-20 mt-8 px-4 md:px-10 bg-gray-100 min-h-screen">

        {/* PROFILE CARD */}
        <div className="bg-white rounded-2xl shadow-sm p-6 flex items-center gap-4">
          
          <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white flex items-center justify-center text-lg font-semibold shadow">
            {user?.name?.[0]}
          </div>

          <div>
            <h3 className="font-semibold text-lg">{user?.name}</h3>
            <p className="text-sm text-gray-500">+91 {user?.mobile}</p>
          </div>

        </div>

        {/* QUICK ACTIONS */}
        <div className="mt-6 bg-white rounded-2xl shadow-sm p-5">

          <h3 className="text-sm text-gray-500 mb-4">QUICK ACTIONS</h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">

            <div className="group cursor-pointer">
              <div className="mx-auto w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition">
                <ShoppingBag size={22} />
              </div>
              <p className="mt-2 text-sm">My Orders</p>
            </div>

            <div className="group cursor-pointer">
              <div className="mx-auto w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center group-hover:bg-green-100 transition">
                <MapPin size={22} />
              </div>
              <p className="mt-2 text-sm">Edit Address</p>
            </div>

            <div className="group cursor-pointer">
              <div className="mx-auto w-12 h-12 rounded-xl bg-pink-50 flex items-center justify-center group-hover:bg-pink-100 transition">
                <Gift size={22} />
              </div>
              <p className="mt-2 text-sm">Refer & Earn</p>
            </div>

            <div className="group cursor-pointer">
              <div className="mx-auto w-12 h-12 rounded-xl bg-yellow-50 flex items-center justify-center group-hover:bg-yellow-100 transition">
                <Bookmark size={22} />
              </div>
              <p className="mt-2 text-sm">Saved Cart</p>
            </div>

          </div>
        </div>


        {/* SUPPORT SECTION */}
        <div className="mt-6 bg-white rounded-2xl shadow-sm p-5">

          <h3 className="text-sm text-gray-500 mb-4">SUPPORT</h3>

          <div className="space-y-3">

            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition">
              <div className="flex items-center gap-3">
                <Headphones size={20} />
                <span className="text-sm">Contact Us / Register Complaint</span>
              </div>
              <span>{">"}</span>
            </div>

            <div 
    onClick={() => setShowFAQ(true)}
    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition"
  >
     <div className="flex items-center gap-3">
       <HelpCircle size={20} />
       <span className="text-sm">FAQs</span>
     </div>
     <span>{">"}</span>
  </div>

          </div>
        </div>

        {/* LOGOUT */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="flex items-center gap-2 text-red-500 border border-red-200 px-6 py-2 rounded-xl hover:bg-red-50 transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

      </div>
    </>
  );
}