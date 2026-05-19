"use client";

import { useEffect, useState } from "react";
import api from "../../lib/api";
import Cookies from "js-cookie";
import Link from "next/link";
import { toast } from "react-toastify";
import Pusher from "pusher-js";

const STATUS_COLORS: Record<string, string> = {
  pending:          "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  accepted:         "bg-blue-500/20 text-blue-300 border-blue-500/30",
  out_for_delivery: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  delivered:        "bg-green-500/20 text-green-300 border-green-500/30",
  cancelled:        "bg-red-500/20 text-red-400 border-red-500/30",
};

const COMPLAINT_COLORS: Record<string, string> = {
  open:        "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  in_progress: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  resolved:    "bg-green-500/20 text-green-300 border-green-500/30",
  closed:      "bg-slate-500/20 text-slate-400 border-slate-500/30",
};

export default function ManagerDashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
useEffect(() => {
    console.log("🔥 Pusher init");

    const pusher = new Pusher("8ce8e1219e4b306f5eba", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("manager-channel");

    channel.bind("pusher:subscription_succeeded", () => {
      console.log("✅ subscribed to manager-channel");
    });

    channel.bind("manager-new-order", (data: any) => {
      console.log("🔥 EVENT RECEIVED:", data);
      toast.success(`🛒 ${data.message}`);
    });

    channel.bind("pusher:subscription_error", (err: any) => {
      console.log("❌ subscription error", err);
    });

    return () => {
      channel.unbind_all?.(); // safe optional
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, []);


  useEffect(() => {
 
  const pusher = new Pusher(
 
    "f6b99afdc4a898a8e030",
 
    {

      cluster: "ap2",

    }

  );
 
  const channel =

    pusher.subscribe(

      "manager-channel"

    );
 
  channel.bind(
 
    "manager-new-order",
 
    (data: any) => {
 
      console.log(data);
 
      toast.success(
 
        `🛒 ${data.message}`

      );

    }

  );
 
  return () => {
 
    channel.unbind_all();
 
    channel.unsubscribe();
 
    pusher.disconnect();

  };
 
}, []);
 

  useEffect(() => {
    const token = Cookies.get("token");
    const role = Cookies.get("role");
    if (!token || role !== "manager") {
      window.location.href = "/login/manager";
      return;
    }
    Promise.all([
      api.get("/manager/dashboard"),
      api.get("/manager/profile"),
    ])
      .then(([statsRes, profileRes]) => {
        setStats(statsRes.data);
        setProfile(profileRes.data);
      })
      .catch((err) => setError(err.response?.data?.message || "Unable to load dashboard."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="flex items-center gap-3 text-slate-400">
          <svg className="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          Loading dashboard...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/20 px-4 py-3 border border-red-500/30 rounded-xl text-red-300 text-sm">{error}</div>
    );
  }

  const statCards = [
    {
      label: "Total Customers",
      value: stats?.totalCustomers ?? 0,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      bg: "from-blue-600 to-cyan-500",
      shadow: "shadow-blue-500/20",
      href: "/dashboard/manager/customers",
    },
    {
      label: "Total Sellers",
      value: stats?.totalSellers ?? 0,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      bg: "from-violet-600 to-purple-500",
      shadow: "shadow-violet-500/20",
      href: "/dashboard/manager/sellers",
    },
    {
      label: "Total Orders",
      value: stats?.totalOrders ?? 0,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      bg: "from-emerald-600 to-teal-500",
      shadow: "shadow-emerald-500/20",
      href: "/dashboard/manager/orders",
    },
    {
      label: "Open Complaints",
      value: stats?.openComplaints ?? 0,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      bg: "from-amber-600 to-yellow-500",
      shadow: "shadow-amber-500/20",
      href: "/dashboard/manager/complaints",
    },

    {
      label: "Delivered Orders",
      value: stats?.deliveredOrders ?? 0,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bg: "from-green-600 to-emerald-400",
      shadow: "shadow-green-500/20",
      href: "/dashboard/manager/orders",
    },
  ];

  return (
    <div>
      {/* Welcome Header */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
        <div>
          <p className="mb-1 font-medium text-slate-400 text-sm">Manager Console</p>
          <h1 className="font-extrabold text-white text-3xl">
            Welcome back, {profile?.name?.split(" ")[0] ?? "Manager"} 👋
          </h1>
          <p className="mt-1 text-slate-400 text-sm">
            Here's a live overview of your platform operations.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Manager Avatar */}
          <div className="flex items-center gap-3 bg-white/5 px-4 py-2.5 border border-white/10 rounded-2xl">
            <div className="flex flex-shrink-0 justify-center items-center bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl w-9 h-9 font-bold text-white text-sm">
              {(profile?.name || "M")[0].toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-white text-sm">{profile?.name || "—"}</p>
              <p className="text-slate-500 text-xs">{profile?.email || "—"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="gap-4 grid grid-cols-2 md:grid-cols-3 mb-8">
        {statCards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className={`group relative overflow-hidden bg-gradient-to-br ${card.bg} p-5 rounded-2xl shadow-xl ${card.shadow} hover:scale-[1.02] transition-all duration-200`}
          >
            {/* Decorative circle */}
            <div className="-top-4 -right-4 absolute bg-white/10 rounded-full w-20 h-20" />
            <div className="-right-6 -bottom-6 absolute bg-white/5 rounded-full w-28 h-28" />

            <div className="z-10 relative">
              <div className="mb-3 text-white/80">{card.icon}</div>
              <p className="font-extrabold text-white text-4xl">{card.value}</p>
              <p className="mt-1 font-medium text-white/70 text-sm">{card.label}</p>
            </div>

            {/* Arrow on hover */}
            <div className="top-4 right-4 absolute text-white/40 group-hover:text-white/80 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Orders + Recent Complaints */}
      <div className="gap-6 grid grid-cols-1 lg:grid-cols-2">

        {/* Recent Orders */}
        <div className="bg-white/5 p-5 border border-white/10 rounded-2xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-white text-base">Recent Orders</h3>
            <Link href="/dashboard/manager/orders" className="font-semibold text-blue-400 hover:text-blue-300 text-xs transition">
              View all →
            </Link>
          </div>
          {!stats?.recentOrders?.length ? (
            <p className="py-8 text-slate-500 text-sm text-center">No recent orders.</p>
          ) : (
            <div className="flex flex-col gap-2">
              {stats.recentOrders.map((order: any) => (
                <div key={order.id} className="flex items-center gap-3 bg-white/5 px-3 py-2.5 rounded-xl">
                  <div className="flex flex-shrink-0 justify-center items-center bg-gradient-to-br from-emerald-500 to-teal-400 rounded-lg w-8 h-8 font-bold text-white text-xs">
                    #{order.id}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white text-sm truncate">
                      {order.customer?.name || "Customer"}
                    </p>
                    <p className="text-slate-500 text-xs">
                      {Array.isArray(order.orderItems) ? order.orderItems.length : 0} item(s) ·{" "}
                      {order.createdAt ? new Date(order.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short" }) : "—"}
                    </p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border capitalize flex-shrink-0 ${STATUS_COLORS[order.status] || STATUS_COLORS.pending}`}>
                    {(order.status || "pending").replace(/_/g, " ")}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Complaints */}
        <div className="bg-white/5 p-5 border border-white/10 rounded-2xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-white text-base">Recent Complaints</h3>
            <Link href="/dashboard/manager/complaints" className="font-semibold text-amber-400 hover:text-amber-300 text-xs transition">
              View all →
            </Link>
          </div>
          {!stats?.recentComplaints?.length ? (
            <div className="py-8 text-center">
              <svg className="mx-auto mb-2 w-10 h-10 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-slate-500 text-sm">No complaints. All clear!</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {stats.recentComplaints.map((c: any) => (
                <div key={c.id} className="flex items-start gap-3 bg-white/5 px-3 py-2.5 rounded-xl">
                  <div className="flex flex-shrink-0 justify-center items-center bg-gradient-to-br from-amber-500 to-yellow-400 mt-0.5 rounded-lg w-8 h-8 text-white">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white text-sm truncate">{c.subject || "No subject"}</p>
                    <p className="text-slate-500 text-xs truncate">
                      {c.customerName || "Unknown"} · {c.createdAt ? new Date(c.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short" }) : "—"}
                    </p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border capitalize flex-shrink-0 ${COMPLAINT_COLORS[c.status] || COMPLAINT_COLORS.open}`}>
                    {(c.status || "open").replace("_", " ")}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Recent Activity Logs */}
      {stats?.recentActivityLogs?.length > 0 && (
        <div className="bg-white/5 mt-6 p-5 border border-white/10 rounded-2xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-white text-base">Recent Activity</h3>
            <Link href="/dashboard/manager/activity-logs" className="font-semibold text-slate-400 hover:text-white text-xs transition">
              View all →
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            {stats.recentActivityLogs.slice(0, 5).map((log: any, idx: number) => (
              <div key={log.id || idx} className="flex items-center gap-3 text-sm">
                <div className="flex-shrink-0 bg-blue-400 rounded-full w-2 h-2" />
                <span className="flex-shrink-0 w-36 font-semibold text-slate-400 text-xs truncate uppercase tracking-wider">
                  {(log.actionType || "").replace(/_/g, " ")}
                </span>
                <span className="flex-1 text-white truncate">{log.targetEntity || "—"}</span>
                <span className="flex-shrink-0 text-slate-600 text-xs">
                  {log.createdAt ? new Date(log.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short" }) : "—"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
