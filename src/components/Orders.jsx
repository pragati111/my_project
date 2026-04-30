import TopHeader from "../components/TopHeader";
import { useAuth } from "../components/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://my-project-backend-ee4t.onrender.com";

export default function Orders() {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedOrder, setSelectedOrder] = useState(null);

  const openTrackingModal = (order) => {
    setSelectedOrder(order);
  };

  const closeTrackingModal = () => {
    setSelectedOrder(null);
  };

  const getStatusColor = (status) => {
    if (status === "PLACED") return "text-amber-500"; // softer than yellow
    if (status === "CONFIRMED") return "text-blue-500"; // stable, trusted
    if (status === "SHIPPED") return "text-indigo-500"; // in-progress / movement
    if (status === "DELIVERED") return "text-green-600"; // success
    if (status === "CANCELLED") return "text-red-500"; // error
    return "text-gray-500";
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${API}/api/order/my-orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrders(res.data.orders || []);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchOrders();
  }, [token]);

  return (
    <>
      <TopHeader />

      <div className="pt-24 px-4 md:px-10 bg-gray-100 min-h-screen">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-semibold mb-2">My Orders</h1>
          <p className="text-gray-500 text-sm mb-6">
            View and track all your orders
          </p>

          {loading ? (
            <p>Loading orders...</p>
          ) : orders.length === 0 ? (
            <p>No orders found</p>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order._id} className="bg-white rounded shadow p-5">
                  {/* TOP SECTION */}
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center border-b pb-3 mb-4 gap-2">
                    <div>
                      <p className="text-sm text-gray-500">Order ID</p>
                      <p className="font-semibold text-blue-600">
                        #{order._id}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(order.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex flex-col md:items-end items-start gap-2 w-full md:w-auto">
                      <div className="text-left md:text-right w-full">

  <div className="flex justify-start md:justify-end">
    <div
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium shadow-sm border backdrop-blur-sm
      ${
        order.status === "PLACED"
          ? "bg-amber-50 text-amber-700 border-amber-200"
          : order.status === "CONFIRMED"
          ? "bg-blue-50 text-blue-700 border-blue-200"
          : order.status === "SHIPPED"
          ? "bg-indigo-50 text-indigo-700 border-indigo-200"
          : order.status === "OUT_FOR_DELIVERY"
          ? "bg-purple-50 text-purple-700 border-purple-200"
          : order.status === "DELIVERED"
          ? "bg-green-50 text-green-700 border-green-200"
          : "bg-red-50 text-red-700 border-red-200"
      }`}
    >
      {/* ICON */}
      <span className="text-sm">
        {order.status === "PLACED" && "🧾"}
        {order.status === "CONFIRMED" && "✔"}
        {order.status === "SHIPPED" && "🚚"}
        {order.status === "OUT_FOR_DELIVERY" && "📦"}
        {order.status === "DELIVERED" && "✅"}
        {order.status === "CANCELLED" && "❌"}
      </span>

      {/* TEXT */}
      <span className="tracking-wide">
        {order.status.replaceAll("_", " ")}
      </span>
    </div>
  </div>
</div>

                      {/* BUTTONS */}
                      <div className="flex gap-2 flex-wrap justify-start md:justify-end w-full">
                        {/* TRACK BUTTON */}
                        <button
                          onClick={() => openTrackingModal(order)}
                          className="px-3 py-1.5 text-xs  bg-black text-white hover:bg-gray-800 transition-all duration-200 shadow-sm hover:shadow-md"
                        >
                          Track Delivery
                        </button>

                        {/* CANCEL BUTTON */}
                        {order.status === "PLACED" && (
                          <button className="px-3 py-1.5 text-xs  border border-red-500 text-red-500 hover:bg-red-50 transition-all duration-200 shadow-sm hover:shadow-md">
                            Cancel Order
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* ITEMS */}
                  <div className="space-y-4">
                    {order.items.map((item, idx) => (
                      <>
                        {/* PRODUCT MAIN ROW */}
                        <div
                          key={idx}
                          className="flex flex-col md:flex-row gap-4 border-b pb-4"
                        >
                          {/* IMAGE */}
                          <img
                            src={
                              item.product?.media?.[0]?.url ||
                              item.product?.images?.[0]
                            }
                            className="w-20 h-20 object-cover rounded border"
                          />

                          {/* DETAILS */}
                          <div className="flex-1">
                            <p className="font-semibold">{item.name}</p>

                            <p className="text-sm text-gray-500">
                              Qty: {item.quantity}
                            </p>

                            <p className="text-sm text-gray-500">
                              ₹{item.sellingPrice} each
                            </p>

                            {/* 🔥 DESIGNS BELOW DETAILS */}
                            {item.designs?.length > 0 && (
                              <div className="mt-3 space-y-3">
                                {item.designs.map((d, i) => (
                                  <div
                                    key={i}
                                    className="bg-gray-50 border rounded p-3 text-xs"
                                  >
                                    {/* TEXT FIELDS */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                      {Object.entries(d.config).map(
                                        ([key, val]) => {
                                          if (
                                            typeof val === "string" &&
                                            val.startsWith("http")
                                          ) {
                                            return null;
                                          }

                                          return (
                                            <p
                                              key={key}
                                              className="break-words"
                                            >
                                              <span className="font-medium">
                                                {key}:
                                              </span>{" "}
                                              {String(val)}
                                            </p>
                                          );
                                        },
                                      )}
                                    </div>

                                    {/* IMAGES */}
                                    <div className="flex flex-wrap gap-2 mt-2">
                                      {Object.entries(d.config).map(
                                        ([key, val]) =>
                                          typeof val === "string" &&
                                          val.startsWith("http") ? (
                                            <img
                                              key={key}
                                              src={val}
                                              className="w-14 h-14 object-cover border rounded"
                                            />
                                          ) : null,
                                      )}
                                    </div>

                                    {/* QUANTITY */}
                                    <p className="mt-2 font-medium">
                                      Qty: {d.quantity}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* TOTAL */}
                          <div className="font-semibold md:text-right">
                            ₹{item.lineTotal}
                          </div>
                        </div>
                      </>
                    ))}
                  </div>

                  {/* FOOTER */}
                  <div className="mt-4 grid md:grid-cols-2 gap-4 text-sm">
                    {/* ADDRESS */}
                    <div>
                      <p className="font-semibold mb-1">Delivery Address</p>
                      <p>{order.shippingAddress.name}</p>
                      <p className="text-gray-600">
                        {order.shippingAddress.line1}
                      </p>
                      <p className="text-gray-600">
                        {order.shippingAddress.city},{" "}
                        {order.shippingAddress.state} -{" "}
                        {order.shippingAddress.pincode}
                      </p>
                    </div>

                    {/* PAYMENT */}
                    <div>
                      <p className="font-semibold mb-1">Payment</p>
                      <p>Method: {order.payment.method}</p>
                      <p>Status: {order.payment.status}</p>
                      <p className="mt-2 font-semibold text-lg">
                        Total: ₹{order.totalAmount}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg rounded-xl p-6 relative">
            {/* CLOSE BUTTON */}
            <button
              onClick={closeTrackingModal}
              className="absolute top-3 right-3 text-gray-500"
            >
              ✕
            </button>

            <h2 className="text-lg font-semibold mb-4">Track Your Order</h2>

            {/* STATUS + STEPPER LOGIC */}
            {selectedOrder.status === "CANCELLED" && (
              <div className="mb-4 text-center text-red-500 font-semibold">
                ❌ Order Cancelled
              </div>
            )}

            {selectedOrder.status !== "CANCELLED" &&
              (() => {
                const steps = ["PLACED", "CONFIRMED", "SHIPPED", "DELIVERED"];

                const statusMap = {
                  PLACED: 0,
                  CONFIRMED: 1,
                  SHIPPED: 2,
                  DISPATCHED: 2,
                  DELIVERED: 3,
                };

                const currentIndex = statusMap[selectedOrder.status] ?? 0;

                const latestUpdate =
                  selectedOrder.trackingUpdates?.[
                    selectedOrder.trackingUpdates.length - 1
                  ];

                return (
                  <div className="flex items-center justify-between mb-6 relative">
                    {steps.map((step, i) => {
                      const isActive = i <= currentIndex;

                      return (
                        <div
                          key={step}
                          className="flex-1 flex flex-col items-center relative group"
                        >
                          {/* LINE */}
                          {i !== 0 && (
                            <div
                              className={`absolute left-[-50%] top-3 w-full h-1 transition-all duration-500 ${
                                i <= currentIndex
                                  ? "bg-green-500"
                                  : "bg-gray-300"
                              }`}
                            />
                          )}

                          {/* CIRCLE */}
                          <div
                            className={`w-7 h-7 rounded-full z-10 flex items-center justify-center text-xs text-white font-bold transition-all duration-500 ${
                              isActive
                                ? "bg-green-500 scale-110 shadow-lg"
                                : "bg-gray-300"
                            }`}
                          >
                            {isActive ? "✓" : ""}
                          </div>

                          {/* LABEL */}
                          <p className="text-xs mt-2">{step}</p>

                          {/* TOOLTIP (on SHIPPED hover) */}
                          {step === "SHIPPED" && latestUpdate && (
                            <div className="absolute bottom-[-60px] hidden group-hover:block bg-black text-white text-xs px-3 py-2 rounded shadow-lg w-48 text-center">
                              <p>{latestUpdate.status}</p>
                              <p className="text-gray-300 text-[10px] mt-1">
                                {latestUpdate.location}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })()}

            {/* TRACKING HISTORY */}
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {selectedOrder.trackingUpdates?.length > 0 ? (
                selectedOrder.trackingUpdates.map((t, idx) => (
                  <div key={idx} className="border rounded p-3 text-sm">
                    <p className="font-semibold">{t.status}</p>
                    <p className="text-gray-500 text-xs">{t.location}</p>
                    <p className="text-gray-400 text-xs mt-1">
                      {new Date(t.updatedAt).toLocaleString()}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">
                  No tracking updates available yet
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
