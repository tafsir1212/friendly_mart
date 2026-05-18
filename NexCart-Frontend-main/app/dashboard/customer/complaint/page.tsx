"use client";

import { useEffect, useState } from "react";
import api from "../../../lib/api";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const STATUS_STYLES: Record<string, string> = {
  open:        "bg-yellow-100 text-yellow-700 border-yellow-200",
  in_progress: "bg-blue-100 text-blue-700 border-blue-200",
  resolved:    "bg-green-100 text-green-700 border-green-200",
  closed:      "bg-slate-100 text-slate-500 border-slate-200",
};

export default function CustomerComplaintPage() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerId, setCustomerId] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [tab, setTab] = useState<"submit" | "history">("submit");
  const [complaints, setComplaints] = useState<any[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    const role = Cookies.get("role");
    if (!token || role !== "customer") {
      window.location.href = "/login/customer";
      return;
    }
    const name = Cookies.get("customerName") || Cookies.get("name") || "";
    const email = Cookies.get("customerEmail") || Cookies.get("email") || "";
    const id = Number(Cookies.get("customerId") || Cookies.get("userId") || 0);
    setCustomerName(name);
    setCustomerEmail(email);
    setCustomerId(id || null);
    setAuthChecked(true);

    // Load complaint history if we have a customerId
    if (id) {
      loadHistory(id);
    }
  }, []);

  const loadHistory = (id: number) => {
    setHistoryLoading(true);
    api
      .get(`/manager/complaints/by-customer/${id}`)
      .then((res) => setComplaints(res.data))
      .catch(() => {}) // silent
      .finally(() => setHistoryLoading(false));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!subject.trim() || !message.trim()) {
      toast.error("Please enter a subject and message.");
      return;
    }
    setLoading(true);
    try {
      await api.post("/manager/complaints", {
        customerId: customerId || 0,
        customerName: customerName || "Customer",
        customerEmail: customerEmail || "unknown@email.com",
        subject: subject.trim(),
        message: message.trim(),
      });
      toast.success("Your complaint has been submitted successfully! The manager will review it.");
      setSubject("");
      setMessage("");
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
      // Refresh history
      if (customerId) loadHistory(customerId);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to submit complaint. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f4f6fb] px-4 md:px-8 py-10 min-h-screen">
      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-full px-4 py-1.5 mb-4">
            <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="text-indigo-700 text-sm font-semibold">Support Center</span>
          </div>
          <h1 className="font-extrabold text-slate-900 text-3xl leading-tight">Customer Support</h1>
          <p className="mt-2 text-slate-500">Submit complaints and track their status in real-time.</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setTab("submit")}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition ${
              tab === "submit"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            Submit Complaint
          </button>
          <button
            onClick={() => setTab("history")}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition flex items-center gap-2 ${
              tab === "history"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            My Complaints
            {complaints.length > 0 && (
              <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${tab === "history" ? "bg-white/20 text-white" : "bg-indigo-100 text-indigo-600"}`}>
                {complaints.length}
              </span>
            )}
          </button>
        </div>

        {/* ── Submit Tab ── */}
        {tab === "submit" && authChecked && (
          <div>
            {/* Success Banner */}
            {submitted && (
              <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-2xl px-5 py-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-green-800">Complaint Submitted!</p>
                  <p className="text-green-600 text-sm">The manager has been notified and will respond shortly.</p>
                </div>
              </div>
            )}

            <div className="bg-white shadow-sm border border-slate-200 rounded-3xl p-8">
              {/* Customer Info Preview */}
              {(customerName || customerEmail) && (
                <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {(customerName || "C")[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="text-slate-900 font-semibold text-sm">{customerName || "Customer"}</p>
                    <p className="text-slate-500 text-xs">{customerEmail || "—"}</p>
                  </div>
                  <span className="ml-auto text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-semibold border border-indigo-200">
                    Verified Customer
                  </span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block mb-2 font-semibold text-slate-700 text-sm">
                    Subject <span className="text-red-400">*</span>
                  </label>
                  <input
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Delivery issue, wrong item received..."
                    className="bg-slate-50 px-4 py-3 border border-slate-200 focus:border-indigo-500 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-100 w-full text-slate-900 transition"
                  />
                </div>
                <div>
                  <label className="block mb-2 font-semibold text-slate-700 text-sm">
                    Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={7}
                    placeholder="Explain the issue in detail so the manager can respond quickly. Include order ID, date, and any relevant information."
                    className="bg-slate-50 px-4 py-3 border border-slate-200 focus:border-indigo-500 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-100 w-full text-slate-900 resize-none transition"
                  />
                  <p className="text-slate-400 text-xs mt-1">{message.length} characters</p>
                </div>

                {/* Info Note */}
                <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-2xl px-4 py-3">
                  <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-blue-700 text-sm">
                    Your complaint will be sent directly to the manager dashboard. Track the status in <strong>My Complaints</strong>.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading || !subject.trim() || !message.trim()}
                  className="w-full inline-flex justify-center items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-200 px-6 py-3.5 rounded-2xl font-semibold text-white text-sm transition"
                >
                  {loading ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      Submit Complaint
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ── History Tab ── */}
        {tab === "history" && (
          <div>
            {historyLoading ? (
              <div className="flex items-center gap-3 text-slate-500 py-10 justify-center">
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Loading your complaints...
              </div>
            ) : complaints.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm">
                <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="font-semibold text-slate-600">No complaints yet</p>
                <p className="text-slate-400 text-sm mt-1">You haven't submitted any complaints.</p>
                <button
                  onClick={() => setTab("submit")}
                  className="mt-4 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition"
                >
                  Submit a Complaint
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {complaints.map((c) => (
                  <div key={c.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <span className="text-slate-400 text-xs font-mono">#{c.id}</span>
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border capitalize ${STATUS_STYLES[c.status] || STATUS_STYLES.open}`}>
                            {(c.status || "open").replace("_", " ")}
                          </span>
                          <span className="text-slate-400 text-xs ml-auto">
                            {c.createdAt ? new Date(c.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—"}
                          </span>
                        </div>
                        <h3 className="text-slate-900 font-semibold text-base mb-1">{c.subject || "No subject"}</h3>
                        <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">{c.message || "—"}</p>
                      </div>
                    </div>
                    {/* Status info */}
                    {c.status === "resolved" && (
                      <div className="mt-3 flex items-center gap-2 bg-green-50 border border-green-100 rounded-xl px-3 py-2">
                        <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-green-700 text-xs font-medium">This complaint has been resolved by the manager.</p>
                      </div>
                    )}
                    {c.status === "in_progress" && (
                      <div className="mt-3 flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-xl px-3 py-2">
                        <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <p className="text-blue-700 text-xs font-medium">The manager is currently reviewing your complaint.</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
