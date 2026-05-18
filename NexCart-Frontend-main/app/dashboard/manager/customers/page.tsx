"use client";

import { useEffect, useState } from "react";
import api from "../../../lib/api";
import Cookies from "js-cookie";

export default function ManagerCustomersPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionMsg, setActionMsg] = useState<string | null>(null);

  const loadCustomers = () => {
    api
      .get("/manager/customers")
      .then((res) => setCustomers(res.data))
      .catch((err) => setError(err.response?.data?.message || "Unable to load customers."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const token = Cookies.get("token");
    const role = Cookies.get("role");
    if (!token || role !== "manager") {
      window.location.href = "/login/manager";
      return;
    }
    loadCustomers();
  }, []);

  const handleAction = async (id: number, action: "block" | "activate") => {
    try {
      await api.patch(`/manager/customers/${id}/${action}`);
      setActionMsg(`Customer successfully ${action === "block" ? "blocked" : "activated"}.`);
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
          <h2 className="font-bold text-white text-2xl">Customers</h2>
          <p className="mt-1 text-slate-400 text-sm">Manage all registered customers.</p>
        </div>
        <span className="bg-blue-500/20 px-3 py-1 rounded-full text-blue-300 text-sm font-semibold border border-blue-500/30">
          {customers.length} Total
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
          Loading customers...
        </div>
      ) : error ? (
        <div className="px-4 py-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300 text-sm">{error}</div>
      ) : customers.length === 0 ? (
        <div className="text-center py-16 text-slate-500">No customers found.</div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-white/5 text-slate-400 text-left">
                <th className="px-4 py-3 font-semibold">ID</th>
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Email</th>
                <th className="px-4 py-3 font-semibold">Profile Pic</th>
                <th className="px-4 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {customers.map((c) => (
                <tr key={c.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 text-slate-400">#{c.id}</td>
                  <td className="px-4 py-3 text-white font-medium">{c.name || "—"}</td>
                  <td className="px-4 py-3 text-slate-300">{c.email || "—"}</td>
                  <td className="px-4 py-3">
                    {c.profilePic ? (
                      <img src={c.profilePic} alt="pic" className="w-8 h-8 rounded-full object-cover border border-white/10" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white text-xs font-bold">
                        {(c.name || "?")[0].toUpperCase()}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleAction(c.id, "block")}
                        className="px-3 py-1 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30 text-xs font-semibold transition"
                      >
                        Block
                      </button>
                      <button
                        onClick={() => handleAction(c.id, "activate")}
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
