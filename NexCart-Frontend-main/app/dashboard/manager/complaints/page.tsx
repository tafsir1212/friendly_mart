"use client";

import { useEffect, useState } from "react";
import api from "../../../lib/api";
import Cookies from "js-cookie";

const STATUS_COLORS: Record<string, string> = {
  open: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  in_progress: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  resolved: "bg-green-500/20 text-green-300 border-green-500/30",
  closed: "bg-slate-500/20 text-slate-400 border-slate-500/30",
};

export default function ManagerComplaintsPage() {
  const [complaints, setComplaints] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionMsg, setActionMsg] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const loadComplaints = () => {
    api
      .get("/manager/complaints")
      .then((res) => setComplaints(res.data))
      .catch((err) => setError(err.response?.data?.message || "Unable to load complaints."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const token = Cookies.get("token");
    const role = Cookies.get("role");
    if (!token || role !== "manager") {
      window.location.href = "/login/manager";
      return;
    }
    loadComplaints();
  }, []);

  const handleStatusChange = async (id: number, status: string) => {
    setUpdatingId(id);
    try {
      await api.patch(`/manager/complaints/${id}/status`, { status });
      setComplaints((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status } : c))
      );
      setActionMsg(`Complaint #${id} status updated to "${status}".`);
      setTimeout(() => setActionMsg(null), 3000);
    } catch (err: any) {
      setActionMsg(err.response?.data?.message || "Failed to update status.");
      setTimeout(() => setActionMsg(null), 3000);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-bold text-white text-2xl">Customer Complaints</h2>
          <p className="mt-1 text-slate-400 text-sm">Review and manage complaints submitted by customers.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-yellow-500/20 px-3 py-1 rounded-full text-yellow-300 text-sm font-semibold border border-yellow-500/30">
            {complaints.filter((c) => c.status === "open").length} Open
          </span>
          <span className="bg-slate-500/20 px-3 py-1 rounded-full text-slate-300 text-sm font-semibold border border-slate-500/30">
            {complaints.length} Total
          </span>
        </div>
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
          Loading complaints...
        </div>
      ) : error ? (
        <div className="px-4 py-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300 text-sm">{error}</div>
      ) : complaints.length === 0 ? (
        <div className="text-center py-16 text-slate-500">
          <svg className="w-12 h-12 mx-auto mb-3 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          No complaints found. All clear!
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {complaints.map((c) => (
            <div
              key={c.id}
              className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all"
            >
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-slate-400 text-xs font-mono">#{c.id}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-semibold border capitalize ${STATUS_COLORS[c.status] || STATUS_COLORS.open}`}
                    >
                      {c.status?.replace("_", " ") || "open"}
                    </span>
                    <span className="text-slate-500 text-xs ml-auto">
                      {c.createdAt ? new Date(c.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—"}
                    </span>
                  </div>
                  <h3 className="text-white font-semibold text-base mb-1">{c.subject || "No subject"}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-3">{c.message || "—"}</p>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span>
                      <span className="text-slate-400">Customer:</span> {c.customerName || "Unknown"} ({c.customerEmail || "—"})
                    </span>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <select
                    value={c.status || "open"}
                    disabled={updatingId === c.id}
                    onChange={(e) => handleStatusChange(c.id, e.target.value)}
                    className="bg-white/10 text-white border border-white/20 rounded-lg px-3 py-2 text-xs font-semibold focus:outline-none focus:border-blue-400 cursor-pointer hover:bg-white/15 transition disabled:opacity-50"
                  >
                    <option value="open" className="bg-slate-800">Open</option>
                    <option value="in_progress" className="bg-slate-800">In Progress</option>
                    <option value="resolved" className="bg-slate-800">Resolved</option>
                    <option value="closed" className="bg-slate-800">Closed</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
