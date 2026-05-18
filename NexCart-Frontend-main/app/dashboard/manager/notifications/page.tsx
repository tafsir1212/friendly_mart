"use client";

import { useEffect, useState } from "react";
import api from "../../../lib/api";
import Cookies from "js-cookie";

export default function ManagerNotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [markingRead, setMarkingRead] = useState(false);
  const [marked, setMarked] = useState(false);

  const loadNotifications = () => {
    setLoading(true);
    api
      .get("/manager/notifications")
      .then((res) => setNotifications(res.data))
      .catch((err) => setError(err.response?.data?.message || "Unable to load notifications."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const token = Cookies.get("token");
    const role = Cookies.get("role");
    if (!token || role !== "manager") {
      window.location.href = "/login/manager";
      return;
    }
    loadNotifications();
  }, []);

  const handleMarkAllRead = async () => {
    setMarkingRead(true);
    try {
      await api.patch("/manager/notifications/read");
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setMarked(true);
      setTimeout(() => setMarked(false), 3000);
    } catch {
      // silent fail
    } finally {
      setMarkingRead(false);
    }
  };

  const unread = notifications.filter((n) => !n.isRead).length;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h2 className="font-bold text-white text-2xl">Notifications</h2>
          <p className="mt-1 text-slate-400 text-sm">Stay updated with system alerts and activity.</p>
        </div>
        <div className="flex items-center gap-3">
          {unread > 0 && (
            <span className="bg-blue-500/20 px-3 py-1 rounded-full text-blue-300 text-sm font-semibold border border-blue-500/30">
              {unread} Unread
            </span>
          )}
          {notifications.length > 0 && (
            <button
              onClick={handleMarkAllRead}
              disabled={markingRead || unread === 0}
              className="px-4 py-2 rounded-xl bg-white/10 text-white text-sm font-semibold hover:bg-white/15 transition disabled:opacity-40 border border-white/10"
            >
              {markingRead ? "Marking..." : "Mark All Read"}
            </button>
          )}
        </div>
      </div>

      {marked && (
        <div className="mb-4 px-4 py-3 bg-green-500/20 border border-green-500/30 rounded-xl text-green-300 text-sm">
          All notifications marked as read.
        </div>
      )}

      {loading ? (
        <div className="flex items-center gap-3 text-slate-400">
          <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          Loading notifications...
        </div>
      ) : error ? (
        <div className="px-4 py-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300 text-sm">{error}</div>
      ) : notifications.length === 0 ? (
        <div className="text-center py-20 text-slate-500">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
          <p className="font-semibold text-slate-600">You're all caught up!</p>
          <p className="text-sm mt-1">No notifications to display.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {notifications.map((notif, idx) => (
            <div
              key={notif.id || idx}
              className={`flex items-start gap-4 p-4 rounded-2xl border transition-all ${
                notif.isRead
                  ? "bg-white/3 border-white/5 opacity-70"
                  : "bg-white/8 border-blue-500/20 shadow-md shadow-blue-500/5"
              }`}
            >
              {/* Icon */}
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  notif.isRead ? "bg-slate-700/40" : "bg-blue-500/20 border border-blue-500/30"
                }`}
              >
                <svg
                  className={`w-5 h-5 ${notif.isRead ? "text-slate-500" : "text-blue-400"}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className={`text-sm font-semibold ${notif.isRead ? "text-slate-400" : "text-white"}`}>
                    {notif.title || notif.message || "Notification"}
                  </p>
                  {!notif.isRead && (
                    <span className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0 animate-pulse" />
                  )}
                </div>
                {notif.message && notif.title && (
                  <p className="text-slate-400 text-xs leading-relaxed">{notif.message}</p>
                )}
                <p className="text-slate-600 text-xs mt-1.5">
                  {notif.createdAt
                    ? new Date(notif.createdAt).toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "—"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
