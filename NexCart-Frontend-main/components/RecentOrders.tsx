"use client";

import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ChevronRight,
  Package,
  ShoppingBag,
} from "lucide-react";

const statusStyle: Record<string, string> = {
  delivered:
    "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20",

  pending:
    "bg-yellow-500/15 text-yellow-400 border border-yellow-500/20",

  cancelled:
    "bg-red-500/15 text-red-400 border border-red-500/20",

  processing:
    "bg-cyan-500/15 text-cyan-400 border border-cyan-500/20",
};

export default function RecentOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
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
          `http://localhost:3000/customer/my-orders/${customerId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setOrders(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const updateOrderStatus = (
    orderId: number,
    status: string
  ) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? { ...order, status }
          : order
      )
    );
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center gap-4 bg-[#0d1325] shadow-xl p-16 border border-white/10 rounded-3xl">

        <div className="border-4 border-cyan-500 border-t-transparent rounded-full w-12 h-12 animate-spin" />

        <p className="font-medium text-slate-400 text-sm">
          Loading your orders...
        </p>
      </div>
    );
  }

  return (
    <div
      id="orders-section"
      className="bg-[#0d1325] shadow-2xl border border-white/10 rounded-3xl overflow-hidden"
    >
      {/* Header */}
      <div className="flex justify-between items-center bg-white/[0.02] px-6 py-5 border-white/10 border-b">

        <div className="flex items-center gap-4">

          <div className="bg-cyan-500/10 p-3 rounded-2xl">
            <ShoppingBag className="text-cyan-400" size={22} />
          </div>

          <div>
            <h2 className="font-black text-white text-xl">
              Recent Orders
            </h2>

            <p className="mt-1 text-slate-400 text-sm">
              Your latest purchases & updates
            </p>
          </div>
        </div>

        <Link
          href="/dashboard/customer/myorder"
          className="flex items-center gap-1 font-semibold text-cyan-400 hover:text-cyan-300 text-sm transition-all"
        >
          View All
          <ChevronRight size={16} />
        </Link>
      </div>

      {/* Orders */}
      <div className="p-5">

        {orders.length === 0 ? (
          <div className="flex flex-col justify-center items-center py-20 text-center">

            <div className="bg-white/5 mb-5 p-5 rounded-full">
              <Package
                size={48}
                className="text-slate-500"
              />
            </div>

            <h3 className="font-bold text-white text-lg">
              No Orders Yet
            </h3>

            <p className="mt-2 text-slate-400 text-sm">
              Your recent orders will appear here
            </p>
          </div>
        ) : (
          <div className="space-y-4">

            {orders.slice(0, 5).map((order) => (
              <div
                key={order.id}
                className="bg-[#11182d] hover:bg-[#151d35] p-5 border border-white/5 rounded-3xl transition-all duration-300"
              >
                <div className="flex lg:flex-row flex-col lg:justify-between lg:items-center gap-5">

                  {/* Left */}
                  <div className="flex items-center gap-4">

                    <img
                      src={
                        order.orderItems?.[0]?.product
                          ?.productImage
                          ? `http://localhost:3000/uploads/products/${order.orderItems[0].product.productImage}`
                          : "/no-image.png"
                      }
                      alt="Product"
                      className="border border-white/10 rounded-2xl w-20 h-20 object-cover"
                    />

                    <div>
                      <div className="flex items-center gap-2 mb-2">

                        <span className="bg-cyan-500/10 px-3 py-1 rounded-full font-bold text-cyan-400 text-xs">
                          Order #{order.id}
                        </span>

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold capitalize
                          ${
                            statusStyle[order.status] ??
                            "bg-white/10 text-slate-300"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>

                      <h3 className="font-bold text-white text-lg leading-tight">
                        {
                          order.orderItems?.[0]?.product
                            ?.productName
                        }
                      </h3>

                      <p className="mt-1 text-slate-400 text-sm">
                        Qty:{" "}
                        {
                          order.orderItems?.[0]
                            ?.quantity
                        }
                        {order.orderItems?.length > 1 &&
                          ` +${
                            order.orderItems.length - 1
                          } more items`}
                      </p>

                      <p className="mt-2 text-slate-500 text-xs">
                        {new Date(
                          order.createdAt
                        ).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Right */}
                  <div className="flex flex-col items-start lg:items-end">

                    <p className="mb-1 text-slate-400 text-sm">
                      Total Amount
                    </p>

                    <h2 className="font-black text-cyan-400 text-3xl">
                      $
                      {Number(
                        order.totalAmount
                      ).toFixed(2)}
                    </h2>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}