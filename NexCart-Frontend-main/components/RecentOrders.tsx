"use client";

import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import { useEffect, useState } from "react";

import {
  ChevronRight,
  ShoppingBag,
  Clock3,
  CheckCircle2,
  Truck,
  XCircle,
  TrendingUp,
  Activity,
} from "lucide-react";

const statusStyle: Record<
  string,
  {
    className: string;
    icon: any;
  }
> = {
  delivered: {
    className:
      "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    icon: CheckCircle2,
  },

  pending: {
    className:
      "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
    icon: Clock3,
  },

  cancelled: {
    className:
      "bg-red-500/10 text-red-400 border border-red-500/20",
    icon: XCircle,
  },

  processing: {
    className:
      "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20",
    icon: Truck,
  },
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

  const pendingOrders = orders.filter(
    (o) => o.status === "pending"
  ).length;

  const deliveredOrders = orders.filter(
    (o) => o.status === "delivered"
  ).length;

  const featuredOrder = orders[0];

  if (loading) {
    return (
      <div className="rounded-[36px] border border-white/10 bg-[#060816] p-20">
        <div className="flex flex-col items-center gap-6">
          <div className="h-16 w-16 animate-spin rounded-full border-[5px] border-cyan-400 border-t-transparent" />

          <div className="text-center">
            <h2 className="text-2xl font-black text-white">
              Loading Orders
            </h2>

            <p className="mt-2 text-slate-400">
              Fetching your latest purchases...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-cyan-500/10 border border-cyan-500/20">
            <ShoppingBag
              size={30}
              className="text-cyan-400"
            />
          </div>

          <div>
            <h1 className="text-4xl font-black tracking-tight text-white">
              Orders Dashboard
            </h1>

            <p className="mt-2 text-slate-400">
              Monitor your latest purchases and
              shipping activity
            </p>
          </div>
        </div>

        <Link
          href="/dashboard/customer/myorder"
          className="
            inline-flex items-center gap-2
            rounded-2xl
            bg-cyan-500
            px-6 py-3
            text-sm font-bold
            text-black
            transition-all duration-300
            hover:scale-105
          "
        >
          View All Orders

          <ChevronRight size={16} />
        </Link>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* LEFT SIDE */}
        <div className="space-y-6 xl:col-span-2">
          {/* FEATURED ORDER */}
          {featuredOrder && (
            <div className="relative overflow-hidden rounded-[36px] border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-[#081120] to-[#050816] p-8">
              {/* GLOW */}
              <div className="absolute right-[-100px] top-[-100px] h-[300px] w-[300px] rounded-full bg-cyan-400/20 blur-[120px]" />

              <div className="relative flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
                {/* LEFT */}
                <div className="flex flex-col gap-6 md:flex-row md:items-center">
                  <img
                    src={
                      featuredOrder.orderItems?.[0]
                        ?.product?.productImage
                        ? `http://localhost:3000/uploads/products/${featuredOrder.orderItems[0].product.productImage}`
                        : "/no-image.png"
                    }
                    alt="Product"
                    className="h-36 w-36 rounded-[32px] border border-white/10 object-cover shadow-2xl"
                  />

                  <div>
                    <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-cyan-400">
                      Featured Order
                    </span>

                    <h2 className="mt-5 max-w-2xl text-4xl font-black leading-tight text-white">
                      {
                        featuredOrder.orderItems?.[0]
                          ?.product?.productName
                      }
                    </h2>

                    <p className="mt-4 max-w-xl leading-relaxed text-slate-400">
                      Your premium order is currently
                      active and moving through our
                      delivery pipeline.
                    </p>

                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <span
                        className={`rounded-full px-4 py-2 text-sm font-bold capitalize ${
                          statusStyle[
                            featuredOrder.status
                          ]?.className
                        }`}
                      >
                        {featuredOrder.status}
                      </span>

                      <span className="text-sm text-slate-500">
                        {new Date(
                          featuredOrder.createdAt
                        ).toLocaleDateString(
                          "en-US",
                          {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="flex flex-col items-start lg:items-end">
                  <p className="text-sm text-slate-400">
                    Total Amount
                  </p>

                  <h1 className="mt-2 bg-gradient-to-r from-cyan-300 to-sky-400 bg-clip-text text-6xl font-black text-transparent">
                    $
                    {Number(
                      featuredOrder.totalAmount
                    ).toFixed(2)}
                  </h1>

                  <button className="mt-6 rounded-2xl bg-cyan-500 px-7 py-3 text-sm font-bold text-black transition-all duration-300 hover:scale-105">
                    Track Order
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SMALL ORDERS */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {orders.slice(1, 5).map((order) => {
              const statusData =
                statusStyle[order.status];

              return (
                <div
                  key={order.id}
                  className="
                    group rounded-[30px]
                    border border-white/10
                    bg-white/[0.03]
                    p-5
                    backdrop-blur-xl
                    transition-all duration-500
                    hover:-translate-y-1
                    hover:border-cyan-400/20
                    hover:bg-cyan-500/[0.03]
                  "
                >
                  {/* TOP */}
                  <div className="flex items-start justify-between">
                    <img
                      src={
                        order.orderItems?.[0]
                          ?.product?.productImage
                          ? `http://localhost:3000/uploads/products/${order.orderItems[0].product.productImage}`
                          : "/no-image.png"
                      }
                      alt="Product"
                      className="h-20 w-20 rounded-2xl border border-white/10 object-cover"
                    />

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${statusData?.className}`}
                    >
                      {order.status}
                    </span>
                  </div>

                  {/* BODY */}
                  <div className="mt-5">
                    <h3 className="text-2xl font-black leading-tight text-white">
                      {
                        order.orderItems?.[0]
                          ?.product?.productName
                      }
                    </h3>

                    <div className="mt-3 flex items-center gap-3 text-sm text-slate-400">
                      <span>
                        Qty:
                        <span className="ml-1 font-bold text-white">
                          {
                            order.orderItems?.[0]
                              ?.quantity
                          }
                        </span>
                      </span>

                      <span className="flex items-center gap-1 text-cyan-400">
                        <TrendingUp size={14} />
                        Active
                      </span>
                    </div>
                  </div>

                  {/* FOOTER */}
                  <div className="mt-7 flex items-end justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-slate-500">
                        Amount
                      </p>

                      <h2 className="mt-2 text-4xl font-black text-cyan-400">
                        $
                        {Number(
                          order.totalAmount
                        ).toFixed(0)}
                      </h2>
                    </div>

                    <button className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:border-cyan-400/20 hover:bg-cyan-500/10 hover:text-cyan-300">
                      View
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="space-y-6">
          {/* ANALYTICS */}
          <div className="rounded-[32px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-cyan-500/10 p-3">
                <Activity
                  size={20}
                  className="text-cyan-400"
                />
              </div>

              <div>
                <h3 className="text-2xl font-black text-white">
                  Analytics
                </h3>

                <p className="text-sm text-slate-400">
                  Order performance overview
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-5">
              {/* TOTAL */}
              <div className="rounded-3xl border border-cyan-500/10 bg-cyan-500/10 p-6">
                <p className="text-sm text-cyan-300">
                  Total Orders
                </p>

                <h1 className="mt-3 text-6xl font-black text-white">
                  {orders.length}
                </h1>
              </div>

              {/* GRID */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-3xl border border-emerald-500/10 bg-emerald-500/10 p-5">
                  <p className="text-xs uppercase tracking-wider text-emerald-300">
                    Delivered
                  </p>

                  <h2 className="mt-3 text-4xl font-black text-white">
                    {deliveredOrders}
                  </h2>
                </div>

                <div className="rounded-3xl border border-yellow-500/10 bg-yellow-500/10 p-5">
                  <p className="text-xs uppercase tracking-wider text-yellow-300">
                    Pending
                  </p>

                  <h2 className="mt-3 text-4xl font-black text-white">
                    {pendingOrders}
                  </h2>
                </div>
              </div>
            </div>
          </div>

          {/* ACTIVITY */}
          <div className="rounded-[32px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
            <h3 className="text-2xl font-black text-white">
              Recent Activity
            </h3>

            <div className="mt-8 space-y-6">
              {orders.slice(0, 4).map((order) => (
                <div
                  key={order.id}
                  className="flex gap-4"
                >
                  <div className="mt-1 h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.7)]" />

                  <div>
                    <p className="font-semibold text-white">
                      Order #{order.id} updated
                    </p>

                    <p className="mt-1 text-sm text-slate-400 capitalize">
                      Status:
                      <span className="ml-1 text-cyan-400">
                        {order.status}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* QUICK CARD */}
          <div className="overflow-hidden rounded-[32px] border border-cyan-500/10 bg-gradient-to-br from-cyan-500/10 to-sky-500/5 p-6">
            <h3 className="text-2xl font-black text-white">
              Fast Delivery
            </h3>

            <p className="mt-3 leading-relaxed text-slate-300">
              Premium shipping enabled for your
              account. Get faster delivery and
              priority support.
            </p>

            <button className="mt-6 rounded-2xl bg-cyan-500 px-6 py-3 text-sm font-bold text-black transition-all hover:scale-105">
              Upgrade Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}