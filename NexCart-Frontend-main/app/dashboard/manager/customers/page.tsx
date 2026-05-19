"use client";

import { useEffect, useState } from "react";
import api from "../../../lib/api";
import Cookies from "js-cookie";
import Link from "next/link";

export default function ManagerCustomersPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionMsg, setActionMsg] = useState<string | null>(null);

  const loadCustomers = () => {
    setLoading(true);
    api
      .get("/manager/customers")
      .then((res) => setCustomers(res.data))
      .catch((err) => setError(err.response?.data?.message || "Unable to load customers."))
      .finally(() => setLoading(false));
  };

  const getStatusClasses = (status: string) => {
    if (status === "activated") {
      return "bg-emerald-500/10 text-emerald-300 border-emerald-500/20";
    }
    if (status === "blocked") {
      return "bg-red-500/10 text-red-300 border-red-500/20";
    }
    return "bg-slate-500/10 text-slate-400 border-slate-500/20";
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
      loadCustomers();
      setTimeout(() => setActionMsg(null), 3000);
    } catch (err: any) {
      setActionMsg(err.response?.data?.message || "Action failed.");
      setTimeout(() => setActionMsg(null), 3000);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="font-bold text-white text-2xl">Customers</h2>
          <p className="mt-1 text-slate-400 text-sm">Manage all registered customers.</p>
        </div>
        <span className="bg-blue-500/20 px-3 py-1 border border-blue-500/30 rounded-full font-semibold text-blue-300 text-sm">
          {customers.length} Total
        </span>
      </div>

      {actionMsg && (
        <div className="bg-green-500/20 mb-4 px-4 py-3 border border-green-500/30 rounded-xl text-green-300 text-sm">
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
        <div className="bg-red-500/20 px-4 py-3 border border-red-500/30 rounded-xl text-red-300 text-sm">{error}</div>
      ) : customers.length === 0 ? (
        <div className="py-16 text-slate-500 text-center">No customers found.</div>
      ) : (
        <div className="border border-white/10 rounded-xl overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-white/5 text-slate-400 text-left">
                <th className="px-4 py-3 font-semibold">ID</th>
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Email</th>
                <th className="px-4 py-3 font-semibold">Profile Pic</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {customers.map((c) => (
                <tr key={c.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 text-slate-400">#{c.id}</td>
                  <td className="px-4 py-3 font-medium text-white">{c.name || "—"}</td>
                  <td className="px-4 py-3 text-slate-300">{c.email || "—"}</td>
                  <td className="px-4 py-3">
                    {c.profilePic ? (
                      <img src={c.profilePic} alt="pic" className="border border-white/10 rounded-full w-8 h-8 object-cover" />
                    ) : (
                      <div className="flex justify-center items-center bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full w-8 h-8 font-bold text-white text-xs">
                        {(c.name || "?")[0].toUpperCase()}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold border ${getStatusClasses(c.status)}`}>
                      {c.status === "activated" ? "Active" : c.status === "blocked" ? "Blocked" : "Unknown"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end items-center gap-2">
                      <Link
                        href={`/dashboard/manager/customers/${c.id}`}
                        className="bg-white/5 hover:bg-white/10 px-3 py-1 rounded-lg font-semibold text-white text-xs transition"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => handleAction(c.id, "block")}
                        disabled={c.status === "blocked"}
                        className="bg-red-500/20 hover:bg-red-500/30 disabled:opacity-50 px-3 py-1 border border-red-500/30 rounded-lg font-semibold text-red-400 text-xs transition disabled:cursor-not-allowed"
                      >
                        Block
                      </button>
                      <button
                        onClick={() => handleAction(c.id, "activate")}
                        disabled={c.status === "activated"}
                        className="bg-green-500/20 hover:bg-green-500/30 disabled:opacity-50 px-3 py-1 border border-green-500/30 rounded-lg font-semibold text-green-400 text-xs transition disabled:cursor-not-allowed"
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
