import TopHeader from "../components/TopHeader";
import { useCart } from "../redux/useCart";
import { X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCart } from "../redux/cartActions";
import axios from "axios";

const ADDRESS_STORAGE_KEY = "user_addresses";
const API = "https://my-project-backend-ee4t.onrender.com";

export default function Cart() {
  const { cart, getTotalPrice, removeFromCart, updateQuantity } = useCart();
  const { user, token } = useAuth();
  const dispatch = useDispatch();
  const [addresses] = useState(() => {
    const stored = localStorage.getItem(ADDRESS_STORAGE_KEY);
    if (!stored) return [];

    try {
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.warn("Failed to load saved addresses", error);
      return [];
    }
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      if (!user?.id) return;

      try {
        const res = await axios.get(`${API}/api/cart?userId=${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Backend Cart:", res.data);

        // 🔥 IMPORTANT: map backend → your redux format
        const backendItems = res.data.items || [];

        const formatted = backendItems.map((item) => ({
          productId: item.productId.toString(),
          name: item.name,
          price: item.price,
          image: item.image,
          designs: (item.designs || []).map((d) => ({
            config: d.config || {},
            quantity: d.quantity || 1,
          })),
        }));

        dispatch(setCart(formatted));
      } catch (err) {
        console.error("Failed to fetch cart", err);
      }
    };

    fetchCart();
  }, [user, token]);

  return (
    <>
      <TopHeader />

      <div className="pt-24 px-4 md:px-10 bg-gray-100 min-h-screen">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6">
          {/* LEFT SIDE - CART ITEMS */}
          <div className="flex-1 bg-white p-6 rounded shadow">
            <h1 className="text-xl font-semibold mb-4">
              Your Shopping Cart (
              {cart.reduce((sum, product) => sum + product.designs.length, 0)}{" "}
              items)
            </h1>

            {/* HEADER */}
            <div className="hidden md:grid grid-cols-5 text-gray-500 text-sm border-b pb-2 mb-4">
              <span>Item</span>
              <span>Details</span>
              <span>Quantity</span>
              <span>Price</span>
              <span>Total</span>
            </div>

            {cart.map((product) =>
              product.designs.map((d, index) => (
                <div
                  key={`${product.productId}-${index}`}
                  className="grid grid-cols-1 md:grid-cols-5 items-center gap-4 border-b py-4"
                >
                  {/* IMAGE */}
                  <div>
                    <img
                      src={product.image}
                      className="w-20 h-20 object-contain"
                    />
                  </div>

                  {/* DETAILS */}
                  <div className="text-sm">
                    <p className="font-semibold">{product.name}</p>

                    {Object.entries(d.config).map(
                      ([key, val]) =>
                        key !== "quantity" &&
                        !key.includes("Design") && (
                          <p key={key} className="text-gray-500 text-xs">
                            {key}: {String(val)}
                          </p>
                        ),
                    )}

                    {/* UPLOADED DESIGNS */}
                    {Object.entries(d.config).some(
                      ([_, val]) =>
                        typeof val === "string" && val.startsWith("http"),
                    ) && (
                      <div className="mt-2">
                        <p className="text-xs font-medium text-gray-700">
                          Uploaded Designs:
                        </p>

                        <div className="flex gap-2 mt-1 overflow-x-auto">
                          {Object.entries(d.config).map(([key, val]) =>
                            typeof val === "string" &&
                            val.startsWith("http") ? (
                              <div
                                key={key}
                                className="flex-shrink-0 w-12 h-12 border rounded overflow-hidden"
                              >
                                <img
                                  src={val}
                                  alt="design"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ) : null,
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* QUANTITY CONTROL */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateQuantity(product.productId, index, d.quantity - 1)
                      }
                      disabled={d.quantity <= 1}
                      className="border px-2 disabled:opacity-50"
                    >
                      -
                    </button>

                    <span>{d.quantity}</span>

                    <button
                      onClick={() =>
                        updateQuantity(product.productId, index, d.quantity + 1)
                      }
                      className="border px-2"
                    >
                      +
                    </button>
                  </div>

                  {/* PRICE */}
                  <div>₹{product.price}</div>

                  {/* TOTAL + REMOVE */}
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">
                      ₹{product.price * d.quantity}
                    </span>

                    <button
                      onClick={() => removeFromCart(product.productId, index)}
                      className="text-red-500"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>
              )),
            )}
          </div>

          {/* RIGHT SIDE - SUMMARY */}
          <div className="w-full lg:w-[300px] bg-white p-6 rounded shadow h-fit">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

            {addresses.length > 0 ? (
              <div className="mb-4 bg-gray-50 p-4 rounded-sm">
                <p className="text-sm font-semibold mb-2">Deliver To</p>
                <p className="text-sm font-medium">
                  {addresses.find((addr) => addr.isDefault)?.type ||
                    addresses[0]?.type ||
                    "Address"}
                </p>
                <p className="text-sm text-gray-700 mt-1">
                  {addresses.find((addr) => addr.isDefault)?.text ||
                    addresses[0]?.text}
                </p>
                <button
                  onClick={() => navigate("/manage-address")}
                  className="mt-3 text-blue-600 text-sm underline"
                >
                  Change address
                </button>
              </div>
            ) : (
              <div className="mb-4 bg-gray-50 p-4 rounded-sm text-sm">
                <button
                  type="button"
                  onClick={() => navigate("/manage-address")}
                  className="text-blue-600 font-medium underline decoration-1 underline-offset-2 hover:text-blue-800"
                >
                  No saved address found. Add one in Manage Address to see it
                  here.
                </button>
              </div>
            )}

            <div className="flex justify-between text-sm mb-2">
              <span>Items</span>
              <span>₹{getTotalPrice()}</span>
            </div>

            <div className="flex justify-between text-sm mb-2">
              <span>Shipping</span>
              <span className="text-green-600">Free</span>
            </div>

            <div className="border-t my-3"></div>

            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>₹{getTotalPrice()}</span>
            </div>

            <button className="mt-4 w-full bg-orange-500 text-white py-3 rounded">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
