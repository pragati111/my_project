import TopHeader from "../components/TopHeader";
import { useCart } from "../redux/useCart";

export default function Cart() {
  const { cart, getTotalPrice, removeFromCart, updateQuantity } = useCart();

  // ✅ TOTAL PRICE is now from Redux hook
  // const getTotalPrice = () => { ... } // Removed - now using Redux hook

  return (
    <>
      <TopHeader />

      <div className="pt-20 px-4 md:px-10 min-h-screen bg-gray-100">

        <h1 className="text-xl md:text-2xl font-semibold mb-6">
          Your Cart
        </h1>

        {/* 🟡 EMPTY CART */}
        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty</p>
        ) : (
          <>
            {/* 🔥 CART ITEMS */}
            {cart.map((product) => (
              <div
                key={product.productId}
                className="bg-white p-4 rounded-lg shadow mb-6"
              >
                <h2 className="text-lg font-semibold mb-2">
                  {product.name}
                </h2>

                {/* DESIGNS */}
                {product.designs.map((d, index) => (
                  <div
                    key={index}
                    className="border p-3 my-2 rounded"
                  >
                    {/* CONFIG DETAILS */}
                    <div className="text-sm text-gray-700 space-y-1">
                      {Object.entries(d.config).map(([key, val]) => (
                        key !== "quantity" && (
                          <p key={key}>
                            <span className="font-medium">{key}:</span>{" "}
                            {String(val)}
                          </p>
                        )
                      ))}
                    </div>

                    {/* QUANTITY */}
                    <div className="mt-2 flex justify-between items-center">
                      <p className="font-medium">
                        Qty: {d.quantity}
                      </p>

                      <p className="text-green-600 font-semibold">
                        ₹{d.quantity * product.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ))}

            {/* 💳 TOTAL + PAY BUTTON */}
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>₹{getTotalPrice()}</span>
              </div>

              <button className="mt-4 w-full bg-green-600 text-white py-3 rounded">
                Pay Now
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}