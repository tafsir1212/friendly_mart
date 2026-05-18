"use client";

import { useEffect, useState } from "react";
import api from "../../../lib/api";
import Cookies from "js-cookie";

const ACTION_STYLES: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  BLOCK_CUSTOMER:    { bg: "bg-red-500/10",    text: "text-red-400",    border: "border-red-500/20",    dot: "bg-red-400" },
  ACTIVATE_CUSTOMER: { bg: "bg-green-500/10",  text: "text-green-400",  border: "border-green-500/20",  dot: "bg-green-400" },
  BLOCK_SELLER:      { bg: "bg-red-500/10",    text: "text-red-400",    border: "border-red-500/20",    dot: "bg-red-400" },
  ACTIVATE_SELLER:   { bg: "bg-green-500/10",  text: "text-green-400",  border: "border-green-500/20",  dot: "bg-green-400" },
  UPDATE_COMPLAINT_STATUS: { bg: "bg-yellow-500/10", text: "text-yellow-300", border: "border-yellow-500/20", dot: "bg-yellow-400" },
  UPDATE_ORDER_STATUS:     { bg: "bg-blue-500/10",   text: "text-blue-300",   border: "border-blue-500/20",   dot: "bg-blue-400" },
  RELEASE_PAYMENT:   { bg: "bg-cyan-500/10",   text: "text-cyan-300",   border: "border-cyan-500/20",   dot: "bg-cyan-400" },
};

const ACTION_ICONS: Record<string, JSX.Element> = {
  BLOCK_CUSTOMER: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
    </svg>
  ),
  ACTIVATE_CUSTOMER: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  UPDATE_COMPLAINT_STATUS: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  UPDATE_ORDER_STATUS: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  ),
  RELEASE_PAYMENT: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
  ),
};

function getDefaultStyle() {
  return { bg: "bg-slate-500/10", text: "text-slate-400", border: "border-slate-500/20", dot: "bg-slate-400" };
}

export default function ManagerActivityLogsPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const token = Cookies.get("token");
    const role = Cookies.get("role");
    if (!token || role !== "manager") {
      window.location.href = "/login/manager";
      return;
    }
    api
      .get("/manager/activity-logs")
      .then((res) => setLogs(res.data))
      .catch((err) => setError(err.response?.data?.message || "Unable to load activity logs."))
      .finally(() => setLoading(false));
  }, []);

  const filtered = logs.filter(
    (log) =>
      !search ||
      log.actionType?.toLowerCase().includes(search.toLowerCase()) ||
      log.targetEntity?.toLowerCase().includes(search.toLowerCase()) ||
      log.details?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h2 className="font-bold text-white text-2xl">Activity Logs</h2>
          <p className="mt-1 text-slate-400 text-sm">A chronological history of all manager actions.</p>
        </div>
        <span className="bg-slate-500/20 px-3 py-1 rounded-full text-slate-300 text-sm font-semibold border border-slate-500/30">
          {logs.length} Total Actions
        </span>
      </div>

      {/* Search */}
      <div className="mb-5">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search actions, targets, or details..."
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-400"
        />
      </div>

      {loading ? (
        <div className="flex items-center gap-3 text-slate-400">
          <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          Loading activity logs...
        </div>
      ) : error ? (
        <div className="px-4 py-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300 text-sm">{error}</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-slate-500">
          <svg className="w-12 h-12 mx-auto mb-3 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
          No activity logs found.
        </div>
      ) : (
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-white/10" />

          <div className="flex flex-col gap-0">
            {filtered.map((log, idx) => {
              const style = ACTION_STYLES[log.actionType] || getDefaultStyle();
              const icon = ACTION_ICONS[log.actionType] || (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              );
              return (
                <div key={log.id || idx} className="flex gap-4 pl-2 pb-4">
                  {/* Timeline Dot */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className={`w-9 h-9 rounded-xl ${style.bg} border ${style.border} flex items-center justify-center ${style.text}`}>
                      {icon}
                    </div>
                  </div>

                  {/* Log Card */}
                  <div className={`flex-1 ${style.bg} border ${style.border} rounded-2xl px-4 py-3 hover:brightness-110 transition`}>
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <div>
                        <span className={`text-xs font-bold uppercase tracking-wider ${style.text}`}>
                          {(log.actionType || "ACTION").replace(/_/g, " ")}
                        </span>
                        <p className="text-white font-medium text-sm mt-0.5">{log.targetEntity || "—"}</p>
                        {log.details && (
                          <p className="text-slate-400 text-xs mt-1">{log.details}</p>
                        )}
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-slate-500 text-xs">
                          {log.createdAt
                            ? new Date(log.createdAt).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })
                            : "—"}
                        </div>
                        <div className="text-slate-600 text-xs mt-0.5">
                          {log.createdAt
                            ? new Date(log.createdAt).toLocaleTimeString("en-GB", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : ""}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
