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
    <div className="bg-[#060816] px-4 py-10 min-h-screen text-white">

      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="flex items-center gap-4 mb-10">

          <div className="bg-cyan-500/10 p-4 border border-cyan-500/20 rounded-3xl">
            <ShoppingCart
              size={28}
              className="text-cyan-400"
            />
          </div>

          <div>
            <h1 className="font-black text-white text-4xl">
              Shopping Cart
            </h1>

            <p className="mt-1 text-slate-400">
              {cartItems.length} item
              {cartItems.length > 1 && "s"} in your cart
            </p>
          </div>
        </div>

        {/* Empty */}
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center bg-[#0d1325] shadow-2xl py-24 border border-white/10 rounded-[32px] text-center">

            <div className="bg-cyan-500/10 mb-6 p-8 rounded-full">
              <ShoppingCart
                size={60}
                className="text-cyan-400"
              />
            </div>

            <h2 className="mb-2 font-black text-white text-3xl">
              Your cart is empty
            </h2>

            <p className="max-w-md text-slate-400">
              Looks like you haven’t added any
              products yet.
            </p>

            <a
              href="/products"
              className="bg-cyan-500 hover:bg-cyan-600 shadow-cyan-500/20 shadow-lg mt-8 px-8 py-3 rounded-2xl font-bold text-white transition-all"
            >
              Browse Products
            </a>
          </div>
        ) : (
          <div className="gap-8 grid grid-cols-1 xl:grid-cols-3">

            {/* Cart Items */}
            <div className="space-y-5 xl:col-span-2">

              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#0d1325] hover:bg-[#11182d] shadow-xl p-5 border border-white/10 rounded-[28px] transition-all duration-300"
                >
                  <div className="flex md:flex-row flex-col gap-5">

                    {/* Image */}
                    <div className="shrink-0">
                      <img
                        src={
                          item.product?.productImage
                            ? `http://localhost:3000/uploads/products/${item.product.productImage}`
                            : "/no-image.png"
                        }
                        alt={
                          item.product?.productName
                        }
                        className="border border-white/10 rounded-3xl w-32 h-32 object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-1 justify-between">

                      <div>
                        <h2 className="font-black text-white text-2xl">
                          {
                            item.product
                              ?.productName
                          }
                        </h2>

                        <p className="mt-2 text-slate-400 text-sm">
                          Premium product added to
                          your shopping cart
                        </p>

                        <div className="flex items-center gap-3 mt-4">

                          <span className="bg-cyan-500/10 px-4 py-1 rounded-full font-bold text-cyan-400 text-sm">
                            $
                            {Number(
                              item.product?.price
                            ).toFixed(2)}
                          </span>

                          <span className="text-slate-500 text-sm">
                            per item
                          </span>
                        </div>
                      </div>

                      {/* Bottom */}
                      <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-4 mt-6">

                        {/* Quantity */}
                        <div className="flex items-center bg-[#11182d] border border-white/10 rounded-2xl w-fit overflow-hidden">

                          <button
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                -1
                              )
                            }
                            className="flex justify-center items-center hover:bg-white/5 w-12 h-12 transition-all"
                          >
                            <Minus
                              size={16}
                              className="text-white"
                            />
                          </button>

                          <div className="w-14 font-black text-lg text-center">
                            {item.quantity}
                          </div>

                          <button
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                1
                              )
                            }
                            className="flex justify-center items-center hover:bg-white/5 w-12 h-12 transition-all"
                          >
                            <Plus
                              size={16}
                              className="text-white"
                            />
                          </button>
                        </div>

                        {/* Price + Remove */}
                        <div className="flex items-center gap-4">

                          <div className="text-right">
                            <p className="text-slate-400 text-xs">
                              Total
                            </p>

                            <h3 className="font-black text-cyan-400 text-3xl">
                              $
                              {(
                                Number(
                                  item.product
                                    ?.price
                                ) *
                                Number(
                                  item.quantity
                                )
                              ).toFixed(2)}
                            </h3>
                          </div>

                          <button
                            onClick={() =>
                              handleRemove(
                                item.id
                              )
                            }
                            className="bg-red-500/10 hover:bg-red-500/20 p-3 border border-red-500/20 rounded-2xl text-red-400 transition-all"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="top-6 sticky h-fit">

              <div className="bg-[#0d1325] shadow-2xl p-7 border border-white/10 rounded-[32px]">

                <h2 className="mb-6 font-black text-white text-2xl">
                  Order Summary
                </h2>

                {/* Products */}
                <div className="space-y-3 pb-5 border-white/10 border-b">

                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between gap-4 text-sm"
                    >
                      <span className="text-slate-300 truncate">
                        {
                          item.product
                            ?.productName
                        }{" "}
                        × {item.quantity}
                      </span>

                      <span className="font-bold text-white">
                        $
                        {(
                          Number(
                            item.product
                              ?.price
                          ) *
                          Number(
                            item.quantity
                          )
                        ).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="flex justify-between items-center py-6">

                  <div className="flex items-center gap-2 font-bold text-slate-300">
                    <Tag
                      size={18}
                      className="text-cyan-400"
                    />

                    Total
                  </div>

                  <h2 className="font-black text-cyan-400 text-4xl">
                    ${total.toFixed(2)}
                  </h2>
                </div>

                {/* Payment */}
                <div>
                  <label className="flex items-center gap-2 mb-4 font-bold text-slate-300 text-sm">
                    <CreditCard
                      size={16}
                      className="text-cyan-400"
                    />
                    Payment Method
                  </label>

                  <div className="gap-3 grid grid-cols-2">

                    {paymentOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() =>
                          setPaymentMethod(
                            opt.value
                          )
                        }
                        className={`rounded-2xl border p-4 text-sm font-bold transition-all

                        ${
                          paymentMethod ===
                          opt.value
                            ? "bg-cyan-500/10 border-cyan-500 text-cyan-400"
                            : "bg-[#11182d] border-white/10 text-slate-300 hover:border-cyan-500/30"
                        }`}
                      >
                        <div className="mb-2 text-2xl">
                          {opt.emoji}
                        </div>

                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Checkout */}
                <button
                  onClick={handleCheckout}
                  disabled={checkingOut}
                  className="flex justify-center items-center gap-3 bg-cyan-500 hover:bg-cyan-600 disabled:opacity-60 shadow-cyan-500/20 shadow-lg mt-7 py-4 rounded-2xl w-full font-black text-white text-lg transition-all"
                >
                  {checkingOut ? (
                    <>
                      <div className="border-2 border-white border-t-transparent rounded-full w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <ShieldCheck size={20} />
                      Place Order
                    </>
                  )}
                </button>

                <p className="mt-5 text-slate-500 text-xs text-center">
                  Secure checkout • 100% protected
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}