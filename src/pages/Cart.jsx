import TopHeader from "../components/TopHeader";
import { useCart } from "../redux/useCart";
import { X } from "lucide-react";

export default function Cart() {
  const { cart, getTotalPrice, removeFromCart, updateQuantity } = useCart();

  return (
    <>
      <TopHeader />

      <div className="pt-24 px-4 md:px-10 bg-gray-100 min-h-screen">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6">
          
          {/* LEFT SIDE - CART ITEMS */}
          <div className="flex-1 bg-white p-6 rounded shadow">
            <h1 className="text-xl font-semibold mb-4">
              Your Shopping Cart ({cart.reduce((sum, product) => sum + product.designs.length, 0)} items)
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
                        key !== "quantity" && (
                          <p key={key} className="text-gray-500 text-xs">
                            {key}: {String(val)}
                          </p>
                        )
                    )}
                  </div>

                  {/* QUANTITY CONTROL */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateQuantity(
                          product.productId,
                          index,
                          d.quantity - 1
                        )
                      }
                      disabled={d.quantity <= 1}
                      className="border px-2 disabled:opacity-50"
                    >
                      -
                    </button>

                    <span>{d.quantity}</span>

                    <button
                      onClick={() =>
                        updateQuantity(
                          product.productId,
                          index,
                          d.quantity + 1
                        )
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
                      onClick={() =>
                        removeFromCart(product.productId, index)
                      }
                      className="text-red-500"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* RIGHT SIDE - SUMMARY */}
          <div className="w-full lg:w-[300px] bg-white p-6 rounded shadow h-fit">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

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