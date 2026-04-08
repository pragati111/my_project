import TopHeader from "../components/TopHeader";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export default function AccountPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <TopHeader />

      <div className="pt-20 px-4 md:px-8">

        {/* Heading */}
        <h2 className="text-xl font-bold text-center">MY ACCOUNT</h2>

        {/* Profile */}
        <div className="mt-6 flex flex-col items-center">
          <div className="w-14 h-14 rounded-full border flex items-center justify-center text-lg font-semibold">
            {user?.name[0]}
          </div>

          <h3 className="mt-2 font-semibold text-blue-600">
            {user?.name}
          </h3>

          <p className="text-sm text-gray-500">
            +91 - {user?.mobile}
          </p>
        </div>

        {/* Actions Grid */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">

          <div className="cursor-pointer">
            <div className="text-2xl">🛒</div>
            <p className="mt-2 text-sm">My Orders</p>
          </div>

          <div className="cursor-pointer">
            <div className="text-2xl">📍</div>
            <p className="mt-2 text-sm">Edit Address</p>
          </div>

          <div className="cursor-pointer">
            <div className="text-2xl">🎁</div>
            <p className="mt-2 text-sm">Refer & Earn</p>
          </div>

          <div className="cursor-pointer">
            <div className="text-2xl">💾</div>
            <p className="mt-2 text-sm">Saved Cart</p>
          </div>

        </div>

        {/* SUPPORT SECTION */}
        <div className="mt-12 text-center">
          <h3 className="text-blue-600 font-semibold">SUPPORT</h3>

          <div className="mt-6 grid grid-cols-2 gap-6">

            <div className="cursor-pointer">
              <div className="text-2xl">🎧</div>
              <p className="mt-2 text-sm">
                Contact Us / Register Complaint
              </p>
            </div>

            <div className="cursor-pointer">
              <div className="text-2xl">❓</div>
              <p className="mt-2 text-sm">FAQs</p>
            </div>

          </div>
        </div>

        {/* LOGOUT BUTTON */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="border px-6 py-2 rounded-lg text-red-500 hover:bg-red-50 transition"
          >
            Logout
          </button>
        </div>

      </div>
    </>
  );
}