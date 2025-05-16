"use client"; // Enables client-side rendering in Next.js (necessary for hooks like useState/useEffect)

import React from "react"; // Import React
import { assets } from "@/assets/assets"; // Import assets
import OrderSummary from "../components/OrderSummary"; // Import OrderSummary component
import Image from "next/image"; // Import Image from Next.js
import Navbar from "../components/NavBar"; // Import Navbar component
import { useAppContext } from "../context/AppContext"; // Custom hook for React context

const Cart = () => {
  // Destructure values from context: products list, router object, cartItems map, and cart manipulation functions
  const {
    products,
    router,
    cartItems,
    addToCart,
    updateCartQuantity,
    getCartCount,
  } = useAppContext();

  return (
    <>
      <Navbar /> {/* Display top navigation bar */}
      <div className="flex flex-col md:flex-row gap-10 px-6 md:px-16 lg:px-32 pt-14 mb-20">
        {/* Left section: Cart items */}
        <div className="flex-1">
          {/* Cart title and total item count */}
          <div className="flex items-center justify-between mb-8 border-b border-gray-500/30 pb-6">
            <div>
              <p className="text-2xl md:text-3xl text-gray-500">
                Your <span className="font-medium text-orange-600">Cart</span>
              </p>
              <p className="text-lg md:text-xl text-gray-500/80">
                {getCartCount()} Items {/* Display total item count */}
              </p>
            </div>
          </div>

          {/* Table to display cart items */}
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              {/* Table headers */}
              <thead className="text-left">
                <tr>
                  <th className="pb-6 md:px-4 px-1 text-gray-600 font-medium">
                    Product Details
                  </th>
                  <th className="pb-6 md:px-4 px-1 text-gray-600 font-medium">
                    Price
                  </th>
                  <th className="pb-6 md:px-4 px-1 text-gray-600 font-medium">
                    Quantity
                  </th>
                  <th className="pb-6 md:px-4 px-1 text-gray-600 font-medium">
                    Subtotal
                  </th>
                </tr>
              </thead>
              {/* Table body: looping through each cart item */}
              <tbody>
                {Object.keys(cartItems).map((itemId) => {
                  const product = products.find((product) => product._id === itemId);
                  // Skip if product not found or quantity is 0
                  if (!product || cartItems[itemId] <= 0) return null;

                  return (
                    <tr key={itemId}>
                      {/* Product info cell */}
                      <td className="flex items-center gap-4 py-4 md:px-4 px-1">
                        {/* Product image */}
                        <div className="rounded-lg overflow-hidden bg-gray-500/10 p-2">
                          <Image
                            src={product.image[0]}
                            alt={product.name}
                            className="w-16 h-auto object-cover mix-blend-multiply"
                          />
                        </div>
                        {/* Mobile remove button */}
                        <button
                          className="md:hidden text-xs text-orange-600 mt-1"
                          onClick={() => updateCartQuantity(product._id, 0)}
                        >
                          Remove
                        </button>
                        {/* Product name and desktop remove button */}
                        <div className="text-sm hidden md:block">
                          <p className="text-gray-800">{product.name}</p>
                          <button
                            className="text-xs text-orange-600 mt-1"
                            onClick={() => updateCartQuantity(product._id, 0)}
                          >
                            Remove
                          </button>
                        </div>
                      </td>
                      {/* Product price */}
                      <td className="py-4 md:px-4 px-1 text-gray-600">
                        ${product.offerPrice}
                      </td>
                      {/* Quantity controls */}
                      <td className="py-4 md:px-4 px-1">
                        <div className="flex items-center md:gap-2 gap-1">
                          {/* Decrease quantity button */}
                          <button
                            onClick={() =>
                              updateCartQuantity(product._id, cartItems[itemId] - 1)
                            }
                          >
                            <Image
                              src={assets.decrease_arrow}
                              alt="decrease_arrow"
                              className="w-4 h-4"
                            />
                          </button>
                          {/* Quantity input */}
                          <input
                            type="number"
                            value={cartItems[itemId]}
                            onChange={(e) =>
                              updateCartQuantity(product._id, Number(e.target.value))
                            }
                            className="w-8 border text-center appearance-none"
                          />
                          {/* Increase quantity button */}
                          <button onClick={() => addToCart(product._id)}>
                            <Image
                              src={assets.increase_arrow}
                              alt="increase_arrow"
                              className="w-4 h-4"
                            />
                          </button>
                        </div>
                      </td>
                      {/* Subtotal price */}
                      <td className="py-4 md:px-4 px-1 text-gray-600">
                        ${(product.offerPrice * cartItems[itemId]).toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Continue Shopping Button */}
          <button
            onClick={() => router.push("/all-products")}
            className="group flex items-center mt-6 gap-2 text-orange-600"
          >
            <Image
              src={assets.arrow_right_icon_colored}
              alt="arrow_right_icon_colored"
              className="group-hover:-translate-x-1 transition"
            />
            Continue Shopping
          </button>
        </div>

        {/* Right section: order summary and checkout button */}
        <OrderSummary />
      </div>
    </>
  );
};

export default Cart;