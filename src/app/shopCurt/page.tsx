'use client';

import React from "react";
import Link from "next/link";
import Head from "next/head";
import { useCart } from "../context/CartContext";
import toast from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';
import ShippingCalculator from "../components/ShippingCalculator";
import router from "next/router";

const ShopCartPage = () => {  // Changed from export default function to const
  const { cart, updateQuantity, removeFromCart, clearCart, getCartTotal } = useCart();

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(productId, newQuantity);
      toast.success('Cart updated!');
    }
  };

  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
    toast.success('Item removed from cart!');
  };

  const handleClearCart = () => {
    clearCart();
    toast.success('Cart cleared!');
  };
// Add this to your ShopCartPage component
const handleCheckout = async () => {
  try {
      const orderData = {
          _type: 'order',
          items: cart.map(item => ({
              _type: 'orderItem',
              productId: item._id,
              name: item.name,
              quantity: item.quantity,
              price: item.price
          })),
          total: getCartTotal(),
          orderDate: new Date().toISOString(),
          status: 'pending'
      };

      const response = await fetch('/api/createOrder', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderData)
      });

      if (response.ok) {
          toast.success('Order placed successfully!');
          clearCart();
          // Redirect to success page
          router.push('/ordercompleted');
      }
  } catch (error) {
      toast.error('Failed to place order');
  }
};

  return (
    <>
    <Head>
      <title>Shopping Cart</title>
      <meta name="description" content="View and manage your shopping cart." />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="w-full h-[200px] md:h-[286px] bg-[#F6F5FF] flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-2 md:mb-4">
            Shopping Cart
          </h1>
          <p className="text-xs md:text-sm text-gray-500">
            Home &gt; Pages &gt; <span className="text-pink-500">Shopping Cart</span>
          </p>
        </div>
      </div>

      <div className="p-4 md:p-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Product Table */}
          <div className="flex-1 bg-white shadow-md rounded-lg overflow-auto">
          <table className="w-full "> 
  <thead>
    <tr className="border-b text-gray-800 bg-gray-50">
      <th className="p-4 text-xs md:text-base w-[40%]">Product</th> 
      <th className="p-6 text-xs md:text-base w-[15%]">Price</th>
      <th className="p-4 text-xs md:text-base w-[15%]">Quantity</th>
      <th className="p-4 text-xs md:text-base w-[15%]">Total</th>
      <th className="p-4 text-xs md:text-base w-[15%]">Remove</th>
    </tr>
  </thead>
              <tbody>
                {cart.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center text-gray-800 p-4">
                      Your cart is empty
                    </td>
                  </tr>
                ) : (
                  cart.map((item) => (
                    <tr
                      key={item._id}
                      className="border-b hover:bg-gray-50 text-sm md:text-base"
                    >
                      <td className="p-4">
  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 md:gap-4">
    {item.image?.asset?.url && typeof item.image.asset.url === 'string' ? (
      <Image
        src={item.image.asset.url}
        alt={item.name}
        width={80}
        height={80}
        className="rounded object-cover"
      />
    ) : (
      <div className="w-20 h-20 bg-gray-200 rounded flex items-center justify-center">
        <span className="text-gray-400">No image</span>
      </div>
    )}
    <div className="min-w-0"> {/* Add this wrapper */}
      <p className="font-semibold truncate max-w-[150px] sm:max-w-[200px]">
        {item.name}
      </p>
    </div>
  </div>
</td>

                      <td className="p-7">${Number(item.price).toFixed(2)}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                            className="px-2 py-1 bg-gray-200 rounded"
                          >
                            -
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                            className="px-2 py-1 bg-gray-200 rounded"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="p-4">
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => handleRemoveItem(item._id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <div className="flex flex-col md:flex-row justify-between p-4 gap-4">
              <button
                onClick={handleClearCart}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
              >
                Clear Cart
              </button>
              <Link
                href="/"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors text-center"
              >
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Right Column: Cart Totals and Shipping */}
          <div className="w-full lg:w-1/3 flex flex-col gap-8">
            {/* Cart Totals */}
            <div className="bg-[#F6F5FF] p-6 rounded">
              <h3 className="text-center text-lg text-gray-800 font-bold mb-4">Cart Totals</h3>
              <div className="flex text-gray-800 justify-between">
                <p>Subtotal:</p>
                <p className="font-semibold">${getCartTotal().toFixed(2)}</p>
              </div>
              <hr className="my-4 border-t border-gray-200" />
              <div className="flex justify-between  text-gray-800 mt-2">
                <p>Total:</p>
                <p className="font-semibold">${getCartTotal().toFixed(2)}</p>
              </div>
              <Link
                href="/HektoDemo"
                onClick={handleCheckout}
                className="bg-green-500 text-white w-full mt-4 py-2 rounded hover:bg-green-600 transition-colors block text-center"
              >
                Proceed To Checkout
              </Link>
            </div>

            {/* Calculate Shipping */}
            <div className="bg-[#F6F5FF] p-6 rounded">
            <ShippingCalculator />
              
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ShopCartPage;