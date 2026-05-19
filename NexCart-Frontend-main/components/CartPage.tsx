"use client";

import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Trash2,
  Minus,
  Plus,
  ShoppingCart,
  Tag,
  CreditCard,
  ShieldCheck,
} from "lucide-react";

export default function CartPage() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [checkingOut, setCheckingOut] = useState(false);

  const handleCheckout = async () => {
    try {
      setCheckingOut(true);

      const token = Cookies.get("token");

      if (!token) {
        toast.error("Please login");
        return;
      }

      const payload = JSON.parse(atob(token.split(".")[1]));
      const customerId = payload.sub;

      const res = await axios.post(
        `http://localhost:3000/customer/orders/${customerId}`,
        { paymentMethod },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res.data);

      toast.success("Order placed successfully 🎉");
      setCartItems([]);
    } catch (error: any) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Checkout failed"
      );
    } finally {
      setCheckingOut(false);
    }
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = Cookies.get("token");
        const role = Cookies.get("role");

        if (!token || role !== "customer") {
          window.location.href = "/login/customer";
          return;
        }

        const payload = JSON.parse(atob(token.split(".")[1]));
        const customerId = payload.sub;

        const res = await axios.get(
          `http://localhost:3000/customer/cart/${customerId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setCartItems(res.data);
      } catch (error: any) {
        console.log(error);

        toast.error(
          error.response?.data?.message ||
            "Failed to load cart"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handleRemove = async (id: number) => {
    try {
      const token = Cookies.get("token");

      await axios.delete(
        `http://localhost:3000/customer/cart/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCartItems((prev) =>
        prev.filter((item) => item.id !== id)
      );

      toast.success("Item removed from cart");
    } catch (error) {
      console.log(error);
      toast.error("Failed to remove item");
    }
  };

  const updateQuantity = async (
    id: number,
    delta: number
  ) => {
    try {
      const token = Cookies.get("token");

      const item = cartItems.find((i) => i.id === id);

      const newQuantity = item.quantity + delta;

      if (newQuantity < 1) return;

      await axios.patch(
        `http://localhost:3000/customer/cart/${id}`,
        { quantity: newQuantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCartItems((prev) =>
        prev.map((i) =>
          i.id === id
            ? { ...i, quantity: newQuantity }
            : i
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const total = cartItems.reduce(
    (acc, item) =>
      acc +
      Number(item.product.price) *
        Number(item.quantity),
    0
  );

  const paymentOptions = [
    {
      value: "cash",
      label: "Cash",
      emoji: "💵",
    },
    {
      value: "bkash",
      label: "bKash",
      emoji: "📱",
    },
    {
      value: "nagad",
      label: "Nagad",
      emoji: "🔴",
    },
    {
      value: "card",
      label: "Card",
      emoji: "💳",
    },
  ];

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center gap-5 bg-[#060816] min-h-screen">

        <div className="border-4 border-cyan-500 border-t-transparent rounded-full w-16 h-16 animate-spin" />

        <p className="font-medium text-slate-400 text-lg">
          Loading your cart...
        </p>
      </div>
    );
  }

 return (
  <div className="bg-[#0b0f19] min-h-screen text-white px-4 py-10">
    <div className="mx-auto max-w-6xl">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="font-bold text-3xl">Your Cart</h1>
          <p className="text-gray-400 text-sm">
            {cartItems.length} items ready for checkout
          </p>
        </div>

        <ShoppingCart className="text-gray-300" />
      </div>

      {/* EMPTY STATE */}
      {cartItems.length === 0 ? (
        <div className="flex flex-col justify-center items-center bg-[#111827] p-16 border border-white/10 rounded-2xl text-center">
          <ShoppingCart size={50} className="mb-4 text-gray-500" />
          <h2 className="font-semibold text-xl">Cart is empty</h2>
          <p className="mt-2 text-gray-400 text-sm">
            Add products to continue shopping
          </p>

          <a
            href="/products"
            className="bg-white mt-6 px-6 py-2 rounded-lg font-semibold text-black"
          >
            Browse Products
          </a>
        </div>
      ) : (
        <div className="gap-8 grid grid-cols-1 lg:grid-cols-3">

          {/* LEFT: CART ITEMS */}
          <div className="space-y-4 lg:col-span-2">

            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 bg-[#111827] p-4 border border-white/10 rounded-xl"
              >

                {/* IMAGE */}
                <img
                  src={
                    item.product?.productImage
                      ? `http://localhost:3000/uploads/products/${item.product.productImage}`
                      : "/no-image.png"
                  }
                  className="rounded-lg w-24 h-24 object-cover"
                />

                {/* DETAILS */}
                <div className="flex flex-1 justify-between">

                  <div>
                    <h2 className="font-semibold text-lg">
                      {item.product?.productName}
                    </h2>

                    <p className="text-gray-400 text-sm">
                      ${Number(item.product?.price).toFixed(2)} each
                    </p>

                    {/* QUANTITY */}
                    <div className="flex items-center gap-2 mt-3">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="bg-white/10 p-2 rounded-md"
                      >
                        <Minus size={14} />
                      </button>

                      <span className="px-3">{item.quantity}</span>

                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="bg-white/10 p-2 rounded-md"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  {/* RIGHT SIDE */}
                  <div className="flex flex-col justify-between items-end">

                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-red-400"
                    >
                      <Trash2 size={18} />
                    </button>

                    <p className="font-bold text-white">
                      $
                      {(
                        Number(item.product?.price) *
                        Number(item.quantity)
                      ).toFixed(2)}
                    </p>
                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: CHECKOUT SUMMARY */}
          <div className="top-6 sticky h-fit">

            <div className="bg-[#111827] p-6 border border-white/10 rounded-2xl">

              <h2 className="mb-4 font-semibold text-xl">
                Order Summary
              </h2>

              {/* ITEMS LIST */}
              <div className="space-y-2 mb-4 text-sm text-gray-300">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span className="truncate">
                      {item.product?.productName} × {item.quantity}
                    </span>
                    <span>
                      $
                      {(
                        Number(item.product?.price) *
                        Number(item.quantity)
                      ).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <hr className="border-white/10" />

              {/* TOTAL */}
              <div className="flex justify-between mt-4 font-bold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              {/* PAYMENT */}
              <div className="mt-6">
                <p className="mb-2 text-gray-400 text-sm">
                  Payment Method
                </p>

                <select
                  className="bg-black p-3 border border-white/10 rounded-lg w-full"
                  value={paymentMethod}
                  onChange={(e) =>
                    setPaymentMethod(e.target.value)
                  }
                >
                  <option value="cash">Cash</option>
                  <option value="bkash">bKash</option>
                  <option value="nagad">Nagad</option>
                  <option value="card">Card</option>
                </select>
              </div>

              {/* CHECKOUT BUTTON */}
              <button
                onClick={handleCheckout}
                disabled={checkingOut}
                className="bg-white disabled:opacity-50 mt-6 py-3 rounded-lg w-full font-bold text-black"
              >
                {checkingOut ? "Processing..." : "Checkout"}
              </button>

              <p className="mt-3 text-gray-500 text-xs text-center">
                Secure payment protected
              </p>

            </div>
          </div>

        </div>
      )}
    </div>
  </div>
);
}