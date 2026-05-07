import TopHeader from "../components/TopHeader";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import axios from "axios";

export default function AuthPage() {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  const [wholesalerPhone, setWholesalerPhone] = useState("");
  const [wholesalerPin, setWholesalerPin] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSendOtp = async () => {
    if (mobile.length !== 10) return;

    try {
      const payload = {
        phoneNumber: `+91${mobile}`,
      };

      await axios.post(
        "https://my-project-backend-ee4t.onrender.com/api/auth/send-otp",
        payload,
      );

      setShowOtp(true);
    } catch (err) {
      console.error(err);
      alert("Failed to send OTP");
    }
  };

  const handleWholesalerLogin = async () => {
    try {
      const res = await axios.post(
        "https://my-project-backend-ee4t.onrender.com/api/wholesaler/login",
        {
          phoneNumber: wholesalerPhone,
          pin: wholesalerPin,
        },
      );

      // store token
      localStorage.setItem("wholesalerToken", res.data.token);

      // store wholesaler
      localStorage.setItem("wholesaler", JSON.stringify(res.data.wholesaler));

      // update auth context
      login({
        user: res.data.wholesaler,
        token: res.data.token,
        role: "wholesaler",
      });

      navigate("/account");
    } catch (err) {
      console.error(err);
      alert("Invalid phone number or PIN");
    }
  };

  const handleLogin = async () => {
    if (otp.length !== 6) {
      alert("Enter valid 6-digit OTP");
      return;
    }

    try {
      const payload = {
        phoneNumber: `+91${mobile}`,
        otp: otp,
      };

      const res = await axios.post(
        "https://my-project-backend-ee4t.onrender.com/api/auth/verify-otp",
        payload,
      );

      if (res.data && res.data.token) {
        // ✅ store token
        localStorage.setItem("token", res.data.token);

        // ✅ update your auth context
        login({
          user: res.data.user,
          token: res.data.token,
        });

        // ✅ redirect
        navigate("/account");
      } else {
        alert("Invalid OTP");
      }
    } catch (err) {
      console.error(err);
      alert("OTP verification failed");
    }
  };

  return (
    <>
      <TopHeader />

      <div className="pt-[90px] md:pt-[110px] min-h-screen bg-gray-100 px-4">
        {!selectedRole && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
            <div className="bg-white rounded-3xl p-6 md:p-8 w-full max-w-md shadow-2xl">
              <h2 className="text-2xl font-semibold text-center text-gray-800">
                Welcome
              </h2>

              <p className="text-sm text-gray-500 text-center mt-2">
                Please select how you want to continue
              </p>

              <div className="mt-8 space-y-4">
                <button
                  onClick={() => setSelectedRole("customer")}
                  className="w-full py-4 rounded-2xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                >
                  Continue as Customer
                </button>

                <button
                  onClick={() => setSelectedRole("wholesaler")}
                  className="w-full py-4 rounded-2xl border border-gray-300 font-medium hover:bg-gray-100 transition"
                >
                  Continue as Wholesaler
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Login Box */}
        {selectedRole === "customer" && (
          <div className="flex justify-center pt-30">
            <div className="w-full max-w-md bg-[#d9e4e6] border border-teal-500 rounded-2xl p-6 md:p-8">
              <h2 className="text-center text-lg md:text-xl font-medium text-gray-700">
                {showOtp ? "LOGIN" : "LOGIN/REGISTER"}
              </h2>

              <div className="border-t border-gray-400 my-4"></div>

              <label className="text-sm font-medium text-gray-700">
                Mobile Number <span className="text-red-500">*</span>
              </label>

              <div className="flex items-center mt-2 border rounded-md overflow-hidden bg-white">
                <div className="px-3 py-2 border-r text-sm bg-gray-100">
                  +91
                </div>
                <input
                  type="text"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="enter your mobile number"
                  className="flex-1 px-3 py-2 outline-none text-sm"
                />

                {/* Change button after OTP */}
                {showOtp && (
                  <button
                    onClick={() => setShowOtp(false)}
                    className="px-3 text-sm"
                  >
                    Change
                  </button>
                )}
              </div>

              {/* OTP SECTION */}
              {showOtp && (
                <>
                  <label className="text-sm font-medium text-gray-700 mt-4 block">
                    OTP <span className="text-red-500">*</span>
                  </label>

                  <div className="flex items-center mt-2 border rounded-md overflow-hidden bg-white">
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="enter otp"
                      className="flex-1 px-3 py-2 outline-none text-sm"
                    />

                    <button
                      onClick={async () => {
                        try {
                          await axios.post(
                            "https://my-project-backend-ee4t.onrender.com/api/auth/resend-otp",
                            { phoneNumber: `+91${mobile}` },
                          );
                          alert("OTP resent");
                        } catch (err) {
                          alert("Failed to resend OTP");
                        }
                      }}
                      className="px-3 text-sm text-gray-500 md:text-xs"
                    >
                      Resend
                    </button>
                  </div>

                  <div className="mt-3 flex items-center gap-2 text-sm">
                    <input type="checkbox" defaultChecked />
                    <span>
                      I would like to receive Order Updates on WhatsApp, RCS and
                      SMS
                    </span>
                  </div>
                </>
              )}

              <button
                onClick={showOtp ? handleLogin : handleSendOtp}
                className="w-full mt-5 bg-blue-600 text-white py-2 md:py-3 rounded-md text-sm md:text-base font-medium hover:bg-blue-700 transition"
              >
                {showOtp ? "LOGIN" : "SEND OTP"}
              </button>
            </div>
          </div>
        )}
        {selectedRole === "wholesaler" && (
          <div className="flex justify-center pt-2 md:pt-12">
            <div className="w-full max-w-md bg-white border border-gray-200 rounded-3xl p-6 md:p-8 shadow-xl">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-gray-800">
                  Wholesaler Login
                </h2>

                <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                  To receive your wholesaler PIN, contact us on
                </p>

                <p className="text-lg font-semibold text-blue-600 mt-1">
                  +91 9456676569
                </p>
              </div>

              <div className="mt-8">
                <label className="text-sm font-medium text-gray-700">
                  Phone Number
                </label>

                <div className="mt-2 flex items-center border rounded-xl overflow-hidden">
                  <div className="px-4 py-3 bg-gray-100 border-r text-sm">
                    +91
                  </div>

                  <input
                    type="text"
                    value={wholesalerPhone}
                    onChange={(e) => setWholesalerPhone(e.target.value)}
                    placeholder="Enter phone number"
                    className="flex-1 px-4 py-3 outline-none"
                  />
                </div>
              </div>

              <div className="mt-5">
                <label className="text-sm font-medium text-gray-700">PIN</label>

                <input
                  type="password"
                  value={wholesalerPin}
                  onChange={(e) => setWholesalerPin(e.target.value)}
                  placeholder="Enter PIN"
                  className="w-full mt-2 border rounded-xl px-4 py-3 outline-none"
                />
              </div>

              <button
                onClick={handleWholesalerLogin}
                className="w-full mt-8 bg-black text-white py-3 rounded-xl hover:opacity-90 transition"
              >
                Login as Wholesaler
              </button>

              <button
                onClick={() => setSelectedRole(null)}
                className="w-full mt-4 text-sm text-gray-500 hover:text-black"
              >
                ← Back
              </button>
            </div>
          </div>
        )}

        {/* Accordions Section (UNCHANGED) */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div>
            <h3 className="text-center mb-3 font-medium">
              We've Got You Covered
            </h3>
            <div className="border rounded-lg divide-y bg-white">
              <div className="p-3">Free Shipping</div>
              <div className="p-3">100% Satisfaction Guarantee</div>
            </div>
          </div>

          <div>
            <h3 className="text-center mb-3 font-medium">
              We're The Best in Everything
            </h3>
            <div className="border rounded-lg divide-y bg-white">
              <div className="p-3">Best Price</div>
              <div className="p-3">Best Print Quality</div>
              <div className="p-3">Best Customer Service</div>
              <div className="p-3">Best Material</div>
            </div>
          </div>

          <div>
            <h3 className="text-center mb-3 font-medium">Our Milestones</h3>
            <div className="border rounded-lg divide-y bg-white pb-20">
              <div className="p-3">58 Lakh+ Products Delivered</div>
              <div className="p-3">57321+ Google Reviews</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
