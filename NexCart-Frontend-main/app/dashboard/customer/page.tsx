"use client";

import CartPage from "@/components/CartPage";
import RecentOrders from "@/components/RecentOrders";
import axios from "axios";
import Cookies from "js-cookie";
import Pusher from "pusher-js";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  User,
  ShoppingCart,
  Package,
  LogOut,
  TrendingUp,
  Clock,
  CheckCircle,
  Bell,
  ChevronRight,
} from "lucide-react";

export default function CustomerDashboard() {
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"overview" | "cart" | "orders">("overview");

  useEffect(() => {
    const pusher = new Pusher("8ce8e1219e4b306f5eba", { cluster: "ap2" });
    const channel = pusher.subscribe("order-channel");

    channel.bind("order-status-updated", (data: any) => {
      console.log("Realtime Update:", data);
      setOrders((prev) =>
        prev.map((order) =>
          order.id === data.orderId ? { ...order, status: data.status } : order
        )
      );
      toast.success(`Order #${data.orderId} is now ${data.status}`);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
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
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch(console.log);

    axios
      .get(`http://localhost:3000/customer/my-orders/${payload.sub}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setOrders(res.data))
      .catch(console.log);
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("role");
    window.location.href = "/login/customer";
  };

  const stats = [
    {
      label: "Total Orders",
      value: orders.length,
      icon: TrendingUp,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      border: "border-indigo-100",
    },
    {
      label: "Pending",
      value: orders.filter((o) => o.status === "pending").length,
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-100",
    },
    {
      label: "Delivered",
      value: orders.filter((o) => o.status === "delivered").length,
      icon: CheckCircle,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-100",
    },
  ];

  const navItems = [
    { key: "overview", label: "Overview", icon: TrendingUp },
    { key: "cart",     label: "My Cart",  icon: ShoppingCart },
    { key: "orders",   label: "Orders",   icon: Package },
  ] as const;

  return (
    <div className="bg-[#f4f6fb] min-h-screen">

      {/* ── Sidebar ── */}
      <aside className="hidden left-0 z-30 fixed inset-y-0 lg:flex flex-col bg-white shadow-sm border-slate-100 border-r w-64">
        {/* Brand */}
        <div className="px-6 py-6 border-slate-100 border-b">
          <div className="flex items-center gap-2">
            <div className="flex justify-center items-center bg-indigo-600 rounded-lg w-8 h-8">
              <ShoppingCart size={16} className="text-white" />
            </div>
            <span className="font-extrabold text-slate-800 text-lg tracking-tight">ShopZone</span>
          </div>
        </div>

        {/* Avatar */}
        <div className="px-6 py-5 border-slate-100 border-b">
          <div className="flex items-center gap-3">
            <img
              src={user?.profilePic ? `http://localhost:3000/uploads/profile/${user.profilePic}` : "/no-image.png"}
              alt="Profile"
              className="rounded-full ring-2 ring-indigo-100 w-10 h-10 object-cover"
            />
            <div className="min-w-0">
              <p className="font-bold text-slate-800 text-sm truncate">{user?.name ?? "—"}</p>
              <p className="text-slate-400 text-xs truncate">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex flex-col flex-1 gap-1 px-4 py-4">
          {navItems.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all
                ${activeTab === key
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"}`}
            >
              <Icon size={17} /> {label}
            </button>
          ))}

          <Link
            href="/dashboard/customer/profile"
            className="flex items-center gap-3 hover:bg-slate-50 px-4 py-2.5 rounded-xl font-semibold text-slate-500 hover:text-slate-800 text-sm transition-all"
          >
            <User size={17} /> Profile
          </Link>

          <Link
            href="/dashboard/customer/myorder"
            className="flex items-center gap-3 hover:bg-slate-50 px-4 py-2.5 rounded-xl font-semibold text-slate-500 hover:text-slate-800 text-sm transition-all"
          >
            <Package size={17} /> All Orders
          </Link>
        </nav>

        {/* Logout */}
        <div className="px-4 py-4 border-slate-100 border-t">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 hover:bg-red-50 px-4 py-2.5 rounded-xl w-full font-semibold text-red-500 text-sm transition-all"
          >
            <LogOut size={17} /> Logout
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="lg:pl-64">

        {/* Top Bar */}
        <header className="top-0 z-20 sticky flex justify-between items-center bg-white/80 backdrop-blur px-6 py-4 border-slate-100 border-b">
          <div>
            <h1 className="font-extrabold text-slate-800 text-xl">
              {navItems.find((n) => n.key === activeTab)?.label ?? "Dashboard"}
            </h1>
            <p className="mt-0.5 text-slate-400 text-xs">
              Welcome back, {user?.name?.split(" ")[0] ?? "there"} 👋
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile tabs */}
            <div className="lg:hidden flex items-center gap-1">
              {navItems.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all
                    ${activeTab === key ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-500"}`}
                >
                  {label}
                </button>
              ))}
            </div>

            <button className="relative bg-slate-100 hover:bg-slate-200 p-2 rounded-xl text-slate-500 transition">
              <Bell size={18} />
              {orders.filter((o) => o.status === "pending").length > 0 && (
                <span className="top-1.5 right-1.5 absolute bg-red-500 rounded-full w-2 h-2" />
              )}
            </button>

            <img
              src={user?.profilePic ? `http://localhost:3000/uploads/profile/${user.profilePic}` : "/no-image.png"}
              alt="Profile"
              className="rounded-full ring-2 ring-indigo-100 w-9 h-9 object-cover"
            />
          </div>
        </header>

        {/* Page Body */}
        <main className="mx-auto p-6 max-w-6xl">

          {/* ── Cart Tab ── */}
          {activeTab === "cart" && <CartPage />}

          {/* ── Orders Tab ── */}
          {activeTab === "orders" && <RecentOrders />}

          {/* ── Overview Tab ── */}
          {activeTab === "overview" && (
            <>
              {/* Stats */}
              <div className="gap-4 grid grid-cols-1 sm:grid-cols-3 mb-6">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className={`bg-white rounded-2xl border ${stat.border} p-5 flex items-center gap-4 shadow-sm`}
                  >
                    <div className={`${stat.bg} p-3 rounded-xl`}>
                      <stat.icon size={22} className={stat.color} />
                    </div>
                    <div>
                      <p className="font-medium text-slate-400 text-xs">{stat.label}</p>
                      <p className={`text-3xl font-extrabold mt-0.5 ${stat.color}`}>{stat.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Profile Card */}
              <div className="flex sm:flex-row flex-col items-center sm:items-start gap-5 bg-white shadow-sm mb-6 p-6 border border-slate-100 rounded-2xl">
                <div className="relative shrink-0">
                  <img
                    src={user?.profilePic ? `http://localhost:3000/uploads/profile/${user.profilePic}` : "/no-image.png"}
                    alt="Profile"
                    className="rounded-2xl ring-4 ring-indigo-50 w-20 h-20 object-cover"
                  />
                  <span className="-right-1 -bottom-1 absolute bg-emerald-400 border-2 border-white rounded-full w-5 h-5" />
                </div>
                <div className="flex-1 sm:text-left text-center">
                  <h2 className="font-extrabold text-slate-800 text-2xl">{user?.name}</h2>
                  <p className="mt-1 text-slate-400 text-sm">{user?.email}</p>
                  <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-4">
                    <Link
                      href="/dashboard/customer/profile"
                      className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200 shadow-md px-4 py-2 rounded-xl font-semibold text-white text-sm transition"
                    >
                      <User size={14} /> Edit Profile
                    </Link>
                    <button
                      onClick={() => setActiveTab("cart")}
                      className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl font-semibold text-slate-600 text-sm transition"
                    >
                      <ShoppingCart size={14} /> View Cart
                    </button>
                    <button
                      onClick={() => setActiveTab("orders")}
                      className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl font-semibold text-slate-600 text-sm transition"
                    >
                      <Package size={14} /> My Orders
                    </button>
                    <Link
                      href="/dashboard/customer/complaint"
                      className="flex items-center gap-1.5 bg-amber-50 hover:bg-amber-100 px-4 py-2 rounded-xl font-semibold text-amber-600 text-sm transition"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <path d="M12 15V3" />
                      </svg>
                      File Complaint
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-1.5 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-xl font-semibold text-red-500 text-sm transition"
                    >
                      <LogOut size={14} /> Logout
                    </button>
                  </div>
                </div>
              </div>

              {/* Recent Orders preview */}
              <RecentOrders />
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setActiveTab("orders")}
                  className="flex items-center gap-1 font-semibold text-indigo-600 hover:text-indigo-800 text-sm transition"
                >
                  See all orders <ChevronRight size={16} />
                </button>
              </div>
            </>
          )}

        </main>
      </div>
    </div>
  );
}