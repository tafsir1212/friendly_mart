"use client";

import CartPage from "@/components/CartPage";
import RecentOrders from "@/components/RecentOrders";
import axios from "axios";
import Cookies from "js-cookie";
import Pusher from "pusher-js";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

import {
  User,
  ShoppingCart,
  Package,
  LogOut,
  Clock,
  CheckCircle,
  Bell,
  ChevronRight,
  Zap,
  Home,
  MessageSquare,
  BarChart2,
  Search,
  Menu,
  TrendingUp,
} from "lucide-react";

export default function CustomerDashboard() {
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<
    "overview" | "cart" | "orders"
  >("overview");

  // const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const pusher = new Pusher("f6b99afdc4a898a8e030", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("order-channel");

    channel.bind("order-status-updated", (data: any) => {
      setOrders((prev) =>
        prev.map((order) =>
          order.id === data.orderId
            ? { ...order, status: data.status }
            : order
        )
      );

      toast.success(`📦 Order #${data.orderId} is now ${data.status}`);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, []);

  useEffect(() => {
    const token = Cookies.get("token");
    const role = Cookies.get("role");

    if (!token || role !== "customer") {
      window.location.href = "/login/customer";
      return;
    }

    const payload = JSON.parse(atob(token.split(".")[1]));

    axios
      .get("http://localhost:3000/customer/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setUser(res.data))
      .catch(console.log);

    axios
      .get(`http://localhost:3000/customer/my-orders/${payload.sub}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setOrders(res.data))
      .catch(console.log);
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("role");
    window.location.href = "/login/customer";
  };

  const pendingCount = orders.filter(
    (o) => o.status === "pending"
  ).length;

  const deliveredCount = orders.filter(
    (o) => o.status === "delivered"
  ).length;

  const stats = [
    {
      label: "Total Orders",
      value: orders.length,
      icon: BarChart2,
      color: "from-sky-500 to-cyan-400",
    },
    {
      label: "Pending",
      value: pendingCount,
      icon: Clock,
      color: "from-orange-500 to-amber-400",
    },
    {
      label: "Delivered",
      value: deliveredCount,
      icon: CheckCircle,
      color: "from-emerald-500 to-green-400",
    },
  ];

  const navItems = [
    {
      key: "overview",
      label: "Overview",
      icon: Home,
    },
    {
      key: "cart",
      label: "My Cart",
      icon: ShoppingCart,
    },
    {
      key: "orders",
      label: "Orders",
      icon: Package,
    },
  ] as const;

  return (
    <div
      className="min-h-screen text-white overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at top left, rgba(56,189,248,0.15), transparent 25%),
          radial-gradient(circle at bottom right, rgba(99,102,241,0.15), transparent 30%),
          linear-gradient(to bottom, #030712, #0b1120)
        `,
      }}
    >
      {/* BACKGROUND EFFECTS */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[10%] w-[500px] h-[500px] rounded-full bg-sky-500/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[5%] w-[400px] h-[400px] rounded-full bg-indigo-500/10 blur-[120px]" />

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>


      {/* MOBILE OVERLAY */}
   

      {/* MAIN */}
      <div className=" relative z-10">
        {/* HEADER */}
       

        {/* CONTENT */}
        <main className="p-6 md:p-8 max-w-7xl mx-auto">
          {activeTab === "cart" && <CartPage />}

          {activeTab === "orders" && <RecentOrders />}

          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* HERO */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden rounded-3xl border border-white/10 p-8 md:p-10"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(17,24,39,0.8), rgba(15,23,42,0.95))",
                  backdropFilter: "blur(20px)",
                }}
              >
                <div className="absolute right-[-60px] top-[-60px] w-72 h-72 bg-sky-500/10 rounded-full blur-[100px]" />

                <div className="flex flex-col md:flex-row justify-between gap-8 items-center">
                  <div className="max-w-xl">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-400/20 mb-5">
                      <TrendingUp
                        size={14}
                        className="text-sky-400"
                      />

                      <span className="text-sky-400 text-xs font-semibold uppercase tracking-wide">
                        Premium Dashboard
                      </span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                      Welcome back,
                      <br />
                      <span className="bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
                        {user?.name?.split(" ")[0] || "User"}
                      </span>
                    </h2>

                    <p className="mt-5 text-white/40 leading-relaxed">
                      Manage orders, track deliveries, and monitor
                      all your shopping activities in one elegant
                      dashboard.
                    </p>

                    <div className="flex flex-wrap gap-4 mt-8">
                      <Link
                        href="/dashboard/customer/profile"
                        className="px-6 py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-500 font-semibold hover:scale-105 transition"
                      >
                        Edit Profile
                      </Link>

                      <button
                        onClick={() => setActiveTab("orders")}
                        className="px-6 py-3 rounded-2xl bg-white/[0.05] border border-white/10 hover:bg-white/[0.08] transition"
                      >
                        View Orders
                      </button>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-sky-500/20 blur-3xl" />

                    <img
                      src={
                        user?.profilePic
                          ? `http://localhost:3000/uploads/profile/${user.profilePic}`
                          : "/no-image.png"
                      }
                      alt="profile"
                      className="relative w-36 h-36 md:w-44 md:h-44 rounded-3xl object-cover border border-white/10"
                    />
                  </div>
                </div>
              </motion.div>

              {/* STATS */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: index * 0.1,
                    }}
                    className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 hover:scale-[1.02] transition-all duration-300 shadow-[0_10px_40px_rgba(0,0,0,0.35)]"
                  >
                    <div
                      className={`absolute inset-0 opacity-10 bg-gradient-to-br ${stat.color}`}
                    />

                    <div className="relative flex items-center justify-between">
                      <div>
                        <p className="text-white/40 text-sm">
                          {stat.label}
                        </p>

                        <h3 className="text-5xl font-bold mt-3">
                          {stat.value}
                        </h3>
                      </div>

                      <div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                      >
                        <stat.icon size={28} />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* ANALYTICS */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* CARD */}
                <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">
                      Monthly Activity
                    </h3>

                    <TrendingUp
                      size={18}
                      className="text-sky-400"
                    />
                  </div>

                  <p className="text-4xl font-bold mt-5">75%</p>

                  <div className="mt-6 w-full h-3 rounded-full bg-white/5 overflow-hidden">
                    <div className="w-[75%] h-full bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full" />
                  </div>
                </div>

                {/* CARD */}
                <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">
                      Delivery Success
                    </h3>

                    <CheckCircle
                      size={18}
                      className="text-emerald-400"
                    />
                  </div>

                  <p className="text-4xl font-bold mt-5">92%</p>

                  <div className="mt-6 w-full h-3 rounded-full bg-white/5 overflow-hidden">
                    <div className="w-[92%] h-full bg-gradient-to-r from-emerald-400 to-green-500 rounded-full" />
                  </div>
                </div>

                {/* CARD */}
                <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">
                      Pending Orders
                    </h3>

                    <Clock
                      size={18}
                      className="text-orange-400"
                    />
                  </div>

                  <p className="text-4xl font-bold mt-5">
                    {pendingCount}
                  </p>

                  <div className="mt-6 w-full h-3 rounded-full bg-white/5 overflow-hidden">
                    <div className="w-[40%] h-full bg-gradient-to-r from-orange-400 to-amber-500 rounded-full" />
                  </div>
                </div>
              </div>

              {/* QUICK ACTIONS */}
              <div>
                <h2 className="text-lg font-semibold mb-5">
                  Quick Actions
                </h2>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                  {[
                    {
                      label: "My Cart",
                      icon: ShoppingCart,
                      color: "from-sky-500 to-cyan-400",
                      action: () => setActiveTab("cart"),
                    },
                    {
                      label: "Orders",
                      icon: Package,
                      color: "from-indigo-500 to-violet-500",
                      action: () => setActiveTab("orders"),
                    },
                    {
                      label: "Profile",
                      icon: User,
                      color: "from-emerald-500 to-green-400",
                      href: "/dashboard/customer/profile",
                    },
                    {
                      label: "Complaint",
                      icon: MessageSquare,
                      color: "from-orange-500 to-amber-400",
                      href: "/dashboard/customer/complaint",
                    },
                  ].map((item) => {
                    const content = (
                      <>
                        <div
                          className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-5`}
                        >
                          <item.icon size={22} />
                        </div>

                        <h3 className="font-semibold">
                          {item.label}
                        </h3>

                        <ChevronRight
                          size={18}
                          className="absolute top-6 right-6 text-white/20"
                        />
                      </>
                    );

                    const className =
                      "relative rounded-3xl border border-white/10 bg-white/[0.03] p-6 hover:bg-white/[0.05] hover:scale-[1.02] transition-all duration-300";

                    return item.href ? (
                      <Link
                        key={item.label}
                        href={item.href}
                        className={className}
                      >
                        {content}
                      </Link>
                    ) : (
                      <button
                        key={item.label}
                        onClick={item.action}
                        className={className}
                      >
                        {content}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* RECENT ORDERS */}
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] overflow-hidden">
                <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                  <div>
                    <h2 className="font-semibold text-lg">
                      Recent Orders
                    </h2>

                    <p className="text-white/40 text-sm mt-1">
                      Your latest purchases
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveTab("orders")}
                    className="text-sky-400 hover:text-sky-300 flex items-center gap-1"
                  >
                    See all
                    <ChevronRight size={16} />
                  </button>
                </div>

                <div className="p-6">
                  <RecentOrders />
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}