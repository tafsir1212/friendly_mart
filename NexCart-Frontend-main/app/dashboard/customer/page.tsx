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
  const [activeTab, setActiveTab] = useState<
    "overview" | "cart" | "orders"
  >("overview");

  useEffect(() => {
    const pusher = new Pusher("8ce8e1219e4b306f5eba", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("order-channel");

    channel.bind("order-status-updated", (data: any) => {
      console.log("Realtime Update:", data);

      setOrders((prev) =>
        prev.map((order) =>
          order.id === data.orderId
            ? { ...order, status: data.status }
            : order
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
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/20",
    },
    {
      label: "Pending",
      value: orders.filter((o) => o.status === "pending").length,
      icon: Clock,
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/20",
    },
    {
      label: "Delivered",
      value: orders.filter((o) => o.status === "delivered").length,
      icon: CheckCircle,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
    },
  ];

  const navItems = [
    { key: "overview", label: "Overview", icon: TrendingUp },
    { key: "cart", label: "My Cart", icon: ShoppingCart },
    { key: "orders", label: "Orders", icon: Package },
  ] as const;

  return (
    <div className="bg-[#060816] min-h-screen text-white">

      {/* Sidebar */}
      <aside className="hidden left-0 z-30 fixed inset-y-0 lg:flex flex-col bg-[#0d1325]/95 backdrop-blur-xl border-white/10 border-r w-72">

        {/* Logo */}
        <div className="px-6 py-6 border-white/10 border-b">
          <div className="flex items-center gap-3">
            <div className="flex justify-center items-center bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg rounded-2xl w-10 h-10">
              <ShoppingCart size={18} className="text-white" />
            </div>

            <div>
              <h1 className="font-black text-white text-xl tracking-wide">
                ShopZone
              </h1>
              <p className="text-slate-400 text-xs">
                Customer Dashboard
              </p>
            </div>
          </div>
        </div>

        {/* User */}
        <div className="px-6 py-5 border-white/10 border-b">
          <div className="flex items-center gap-4 bg-white/5 p-3 rounded-2xl">
            <img
              src={
                user?.profilePic
                  ? `http://localhost:3000/uploads/profile/${user.profilePic}`
                  : "/no-image.png"
              }
              alt="Profile"
              className="shadow-lg border-2 border-cyan-500/40 rounded-2xl w-14 h-14 object-cover"
            />

            <div className="min-w-0">
              <p className="font-bold text-white text-sm truncate">
                {user?.name ?? "User"}
              </p>

              <p className="text-slate-400 text-xs truncate">
                {user?.email}
              </p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex flex-col flex-1 gap-2 px-4 py-5">

          {navItems.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-300
              
              ${
                activeTab === key
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}

          <Link
            href="/dashboard/customer/profile"
            className="flex items-center gap-3 hover:bg-white/5 px-4 py-3 rounded-2xl font-semibold text-slate-300 hover:text-white text-sm transition-all"
          >
            <User size={18} />
            Profile
          </Link>

          <Link
            href="/dashboard/customer/myorder"
            className="flex items-center gap-3 hover:bg-white/5 px-4 py-3 rounded-2xl font-semibold text-slate-300 hover:text-white text-sm transition-all"
          >
            <Package size={18} />
            All Orders
          </Link>
        </nav>

        {/* Logout */}
        <div className="p-4 border-white/10 border-t">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 bg-red-500/10 hover:bg-red-500/20 px-4 py-3 rounded-2xl w-full font-semibold text-red-400 text-sm transition-all"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="lg:pl-72">

        {/* Header */}
        <header className="top-0 z-20 sticky flex justify-between items-center bg-[#060816]/80 backdrop-blur-xl px-6 py-5 border-white/10 border-b">

          <div>
            <h1 className="font-black text-white text-2xl">
              {navItems.find((n) => n.key === activeTab)?.label ??
                "Dashboard"}
            </h1>

            <p className="mt-1 text-slate-400 text-sm">
              Welcome back,{" "}
              <span className="font-semibold text-cyan-400">
                {user?.name?.split(" ")[0] ?? "User"}
              </span>
            </p>
          </div>

          <div className="flex items-center gap-3">

            {/* Mobile Tabs */}
            <div className="lg:hidden flex items-center gap-2">
              {navItems.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all

                  ${
                    activeTab === key
                      ? "bg-cyan-500 text-white"
                      : "bg-white/10 text-slate-300"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Notification */}
            <button className="relative bg-white/5 hover:bg-white/10 p-3 rounded-2xl text-slate-300 transition-all">
              <Bell size={18} />

              {orders.filter((o) => o.status === "pending").length > 0 && (
                <span className="top-2 right-2 absolute bg-red-500 rounded-full w-2.5 h-2.5" />
              )}
            </button>

            {/* Avatar */}
            <img
              src={
                user?.profilePic
                  ? `http://localhost:3000/uploads/profile/${user.profilePic}`
                  : "/no-image.png"
              }
              alt="Profile"
              className="shadow-lg border-2 border-cyan-500/30 rounded-2xl w-11 h-11 object-cover"
            />
          </div>
        </header>

        {/* Content */}
        <main className="mx-auto p-6 max-w-7xl">

          {/* Cart */}
          {activeTab === "cart" && <CartPage />}

          {/* Orders */}
          {activeTab === "orders" && <RecentOrders />}

          {/* Overview */}
          {activeTab === "overview" && (
            <>
              {/* Hero */}
              <div className="relative bg-gradient-to-br from-cyan-500/20 to-blue-700/20 shadow-xl mb-8 p-8 border border-cyan-500/20 rounded-3xl overflow-hidden">

                <div className="top-0 right-0 absolute bg-cyan-400 opacity-10 blur-3xl rounded-full w-52 h-52" />

                <div className="z-10 relative flex md:flex-row flex-col justify-between items-center gap-6">

                  <div>
                    <h2 className="font-black text-white text-4xl leading-tight">
                      Welcome Back,
                      <br />
                      {user?.name?.split(" ")[0]}
                    </h2>

                    <p className="mt-3 max-w-xl text-slate-300">
                      Manage your orders, cart, profile and stay updated
                      with your latest shopping activity.
                    </p>

                    <div className="flex flex-wrap gap-3 mt-6">

                      <Link
                        href="/dashboard/customer/profile"
                        className="bg-cyan-500 hover:bg-cyan-600 shadow-lg px-5 py-3 rounded-2xl font-semibold text-white transition-all"
                      >
                        Edit Profile
                      </Link>

                      <button
                        onClick={() => setActiveTab("orders")}
                        className="bg-white/10 hover:bg-white/20 px-5 py-3 rounded-2xl font-semibold text-white transition-all"
                      >
                        View Orders
                      </button>
                    </div>
                  </div>

                  <img
                    src={
                      user?.profilePic
                        ? `http://localhost:3000/uploads/profile/${user.profilePic}`
                        : "/no-image.png"
                    }
                    alt="Profile"
                    className="shadow-2xl border-4 border-cyan-500/30 rounded-3xl w-40 h-40 object-cover"
                  />
                </div>
              </div>

              {/* Stats */}
              <div className="gap-5 grid grid-cols-1 md:grid-cols-3 mb-8">

                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className={`bg-[#0d1325] border ${stat.border} rounded-3xl p-6 shadow-lg hover:scale-[1.02] transition-all`}
                  >
                    <div className="flex justify-between items-center">

                      <div>
                        <p className="text-slate-400 text-sm">
                          {stat.label}
                        </p>

                        <h2
                          className={`text-4xl font-black mt-2 ${stat.color}`}
                        >
                          {stat.value}
                        </h2>
                      </div>

                      <div className={`${stat.bg} p-4 rounded-2xl`}>
                        <stat.icon
                          size={26}
                          className={stat.color}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="gap-5 grid grid-cols-1 md:grid-cols-4 mb-8">

                <button
                  onClick={() => setActiveTab("cart")}
                  className="bg-[#0d1325] hover:bg-[#131b31] shadow-lg p-5 border border-white/10 rounded-3xl text-left transition-all"
                >
                  <ShoppingCart className="mb-4 text-cyan-400" />
                  <h3 className="font-bold text-lg">My Cart</h3>
                  <p className="mt-1 text-slate-400 text-sm">
                    View your shopping cart items
                  </p>
                </button>

                <button
                  onClick={() => setActiveTab("orders")}
                  className="bg-[#0d1325] hover:bg-[#131b31] shadow-lg p-5 border border-white/10 rounded-3xl text-left transition-all"
                >
                  <Package className="mb-4 text-purple-400" />
                  <h3 className="font-bold text-lg">Orders</h3>
                  <p className="mt-1 text-slate-400 text-sm">
                    Check all your orders
                  </p>
                </button>

                <Link
                  href="/dashboard/customer/profile"
                  className="bg-[#0d1325] hover:bg-[#131b31] shadow-lg p-5 border border-white/10 rounded-3xl transition-all"
                >
                  <User className="mb-4 text-emerald-400" />
                  <h3 className="font-bold text-lg">Profile</h3>
                  <p className="mt-1 text-slate-400 text-sm">
                    Manage account information
                  </p>
                </Link>

                <Link
                  href="/dashboard/customer/complaint"
                  className="bg-[#0d1325] hover:bg-[#131b31] shadow-lg p-5 border border-white/10 rounded-3xl transition-all"
                >
                  <Bell className="mb-4 text-yellow-400" />
                  <h3 className="font-bold text-lg">
                    Complaint
                  </h3>
                  <p className="mt-1 text-slate-400 text-sm">
                    File a complaint easily
                  </p>
                </Link>
              </div>

              {/* Recent Orders */}
              <div className="bg-[#0d1325] shadow-lg p-6 border border-white/10 rounded-3xl">
                <div className="flex justify-between items-center mb-5">

                  <div>
                    <h2 className="font-bold text-white text-xl">
                      Recent Orders
                    </h2>

                    <p className="text-slate-400 text-sm">
                      Latest activity from your account
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveTab("orders")}
                    className="flex items-center gap-1 font-semibold text-cyan-400 hover:text-cyan-300 text-sm transition"
                  >
                    See all
                    <ChevronRight size={16} />
                  </button>
                </div>

                <RecentOrders />
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}