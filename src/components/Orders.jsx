import TopHeader from "../components/TopHeader";
import { useAuth } from "../components/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://my-project-backend-ee4t.onrender.com";

export default function Orders() {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const getStatusColor = (status) => {
    if (status === "PLACED") return "text-orange-500";
    if (status === "SHIPPED") return "text-green-600";
    if (status === "DELIVERED") return "text-green-800";
    if (status === "CANCELLED") return "text-red-500";
    return "text-gray-500"; // fallback (important)
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

                    <div className="text-right">
                      <p className="text-sm text-gray-500">Status</p>
                      <p
                        className={`font-semibold ${getStatusColor(order.status)}`}
                      >
                        {order.status}
                      </p>
                    </div>
                  </div>

                  {/* ITEMS */}
                  <div className="space-y-4">
                    {order.items.map((item, idx) => (
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
                        </div>

                        {/* TOTAL */}
                        <div className="font-semibold md:text-right">
                          ₹{item.lineTotal}
                        </div>
                      </div>
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
    </>
  );
}
