"use client";

import { useEffect, useState } from "react";
import api from "../../../lib/api";
import Cookies from "js-cookie";

export default function ManagerSellersPage() {
  const [sellers, setSellers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionMsg, setActionMsg] = useState<string | null>(null);

  const loadSellers = () => {
    api
      .get("/manager/sellers")
      .then((res) => setSellers(res.data))
      .catch((err) => setError(err.response?.data?.message || "Unable to load sellers."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const token = Cookies.get("token");
    const role = Cookies.get("role");
    if (!token || role !== "manager") {
      window.location.href = "/login/manager";
      return;
    }
    loadSellers();
  }, []);

  const handleAction = async (id: number, action: "block" | "activate") => {
    try {
      await api.patch(`/manager/sellers/${id}/${action}`);
      setActionMsg(`Seller successfully ${action === "block" ? "blocked" : "activated"}.`);
      setTimeout(() => setActionMsg(null), 3000);
    } catch (err: any) {
      setActionMsg(err.response?.data?.message || "Action failed.");
      setTimeout(() => setActionMsg(null), 3000);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-bold text-white text-2xl">Sellers</h2>
          <p className="mt-1 text-slate-400 text-sm">Manage all registered sellers and their shops.</p>
        </div>
        <span className="bg-cyan-500/20 px-3 py-1 rounded-full text-cyan-300 text-sm font-semibold border border-cyan-500/30">
          {sellers.length} Total
        </span>
      </div>

      {actionMsg && (
        <div className="mb-4 px-4 py-3 bg-green-500/20 border border-green-500/30 rounded-xl text-green-300 text-sm">
          {actionMsg}
        </div>
      )}

      {loading ? (
        <div className="flex items-center gap-3 text-slate-400">
          <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          Loading sellers...
        </div>
      ) : error ? (
        <div className="px-4 py-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300 text-sm">{error}</div>
      ) : sellers.length === 0 ? (
        <div className="text-center py-16 text-slate-500">No sellers found.</div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-white/5 text-slate-400 text-left">
                <th className="px-4 py-3 font-semibold">ID</th>
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Email</th>
                <th className="px-4 py-3 font-semibold">Shop</th>
                <th className="px-4 py-3 font-semibold">Products</th>
                <th className="px-4 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {sellers.map((s) => (
                <tr key={s.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 text-slate-400">#{s.id}</td>
                  <td className="px-4 py-3 text-white font-medium">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {(s.name || "?")[0].toUpperCase()}
                      </div>
                      {s.name || "—"}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-300">{s.email || "—"}</td>
                  <td className="px-4 py-3 text-slate-300">{s.shop?.name || s.shopName || "—"}</td>
                  <td className="px-4 py-3">
                    <span className="bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full text-xs font-semibold border border-blue-500/20">
                      {Array.isArray(s.products) ? s.products.length : 0} items
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleAction(s.id, "block")}
                        className="px-3 py-1 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30 text-xs font-semibold transition"
                      >
                        Block
                      </button>
                      <button
                        onClick={() => handleAction(s.id, "activate")}
                        className="px-3 py-1 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/30 text-xs font-semibold transition"
                      >
                        Activate
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
