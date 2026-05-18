"use client";

import { useEffect, useState } from "react";
import api from "../../../lib/api";
import Cookies from "js-cookie";

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  accepted: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  partial: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  rider_assigned: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  out_for_delivery: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  delivered: "bg-green-500/20 text-green-300 border-green-500/30",
  cancelled: "bg-red-500/20 text-red-400 border-red-500/30",
};

const STATUS_OPTIONS = [
  "pending",
  "accepted",
  "partial",
  "rider_assigned",
  "out_for_delivery",
  "delivered",
  "cancelled",
];

export default function ManagerOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [actionMsg, setActionMsg] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    const token = Cookies.get("token");
    const role = Cookies.get("role");
    if (!token || role !== "manager") {
      window.location.href = "/login/manager";
      return;
    }
    api
      .get("/manager/orders")
      .then((res) => setOrders(res.data))
      .catch((err) => setError(err.response?.data?.message || "Unable to load orders."))
      .finally(() => setLoading(false));
  }, []);

  const handleStatusChange = async (id: number, status: string) => {
    setUpdatingId(id);
    try {
      await api.patch(`/manager/orders/${id}/status`, { status });
      setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
      setActionMsg(`Order #${id} status updated to "${status}".`);
      setTimeout(() => setActionMsg(null), 3000);
    } catch (err: any) {
      setActionMsg(err.response?.data?.message || "Failed to update status.");
      setTimeout(() => setActionMsg(null), 3000);
    } finally {
      setUpdatingId(null);
    }
  };

  const filtered = orders.filter((o) => {
    const matchSearch =
      !search ||
      String(o.id).includes(search) ||
      o.customer?.name?.toLowerCase().includes(search.toLowerCase()) ||
      o.customer?.email?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || o.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const statusCount = (s: string) => orders.filter((o) => o.status === s).length;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h2 className="font-bold text-white text-2xl">Orders</h2>
          <p className="mt-1 text-slate-400 text-sm">Manage and update all customer orders.</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="bg-yellow-500/20 px-3 py-1 rounded-full text-yellow-300 text-xs font-semibold border border-yellow-500/30">
            {statusCount("pending")} Pending
          </span>
          <span className="bg-orange-500/20 px-3 py-1 rounded-full text-orange-300 text-xs font-semibold border border-orange-500/30">
            {statusCount("out_for_delivery")} Out for Delivery
          </span>
          <span className="bg-green-500/20 px-3 py-1 rounded-full text-green-300 text-xs font-semibold border border-green-500/30">
            {statusCount("delivered")} Delivered
          </span>
          <span className="bg-slate-500/20 px-3 py-1 rounded-full text-slate-300 text-xs font-semibold border border-slate-500/30">
            {orders.length} Total
          </span>
        </div>
      </div>

      {/* Action Message */}
      {actionMsg && (
        <div className="mb-4 px-4 py-3 bg-green-500/20 border border-green-500/30 rounded-xl text-green-300 text-sm">
          {actionMsg}
        </div>
      )}

      {/* Search & Filter */}
      <div className="flex gap-3 mb-5 flex-wrap">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by order ID or customer..."
          className="flex-1 min-w-[200px] bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-400"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-400"
        >
          <option value="all" className="bg-slate-800">All Status</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s} className="bg-slate-800">
              {s.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="flex items-center gap-3 text-slate-400">
          <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          Loading orders...
        </div>
      ) : error ? (
        <div className="px-4 py-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300 text-sm">{error}</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-slate-500">
          <svg className="w-12 h-12 mx-auto mb-3 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          No orders found.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((order) => (
            <div
              key={order.id}
              className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all"
            >
              {/* Order Row */}
              <div
                className="flex items-center gap-4 px-5 py-4 cursor-pointer"
                onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}
              >
                {/* Order ID */}
                <div className="text-slate-400 font-mono text-sm w-14 flex-shrink-0">#{order.id}</div>

                {/* Customer */}
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {(order.customer?.name || "?")[0].toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <div className="text-white text-sm font-medium truncate">{order.customer?.name || "Unknown"}</div>
                    <div className="text-slate-500 text-xs truncate">{order.customer?.email || "—"}</div>
                  </div>
                </div>

                {/* Items */}
                <div className="hidden sm:block text-slate-400 text-xs w-20 flex-shrink-0">
                  {Array.isArray(order.orderItems) ? order.orderItems.length : 0} item(s)
                </div>

                {/* Status Badge */}
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-semibold border capitalize flex-shrink-0 ${
                    STATUS_COLORS[order.status] || STATUS_COLORS.pending
                  }`}
                >
                  {(order.status || "pending").replace(/_/g, " ")}
                </span>

                {/* Date */}
                <div className="hidden md:block text-slate-500 text-xs w-24 flex-shrink-0 text-right">
                  {order.createdAt ? new Date(order.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—"}
                </div>

                {/* Change Status */}
                <select
                  value={order.status || "pending"}
                  disabled={updatingId === order.id}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  className="bg-white/10 text-white border border-white/20 rounded-lg px-2 py-1.5 text-xs font-semibold focus:outline-none focus:border-blue-400 cursor-pointer hover:bg-white/15 transition disabled:opacity-50 flex-shrink-0"
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s} className="bg-slate-800">
                      {s.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                    </option>
                  ))}
                </select>

                {/* Expand chevron */}
                <svg
                  className={`w-4 h-4 text-slate-500 transition-transform flex-shrink-0 ${expandedId === order.id ? "rotate-180" : ""}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {/* Expanded Order Items */}
              {expandedId === order.id && Array.isArray(order.orderItems) && order.orderItems.length > 0 && (
                <div className="border-t border-white/10 px-5 py-4 bg-white/3">
                  <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3">Order Items</p>
                  <div className="flex flex-col gap-2">
                    {order.orderItems.map((item: any, idx: number) => (
                      <div key={idx} className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-2.5">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          {idx + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-white text-sm font-medium truncate">{item.product?.name || "Product"}</div>
                          <div className="text-slate-500 text-xs">Qty: {item.quantity || 1} · Seller: {item.seller?.name || "—"}</div>
                        </div>
                        <div className="text-green-400 font-bold text-sm flex-shrink-0">
                          ৳{Number(item.price || 0).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
