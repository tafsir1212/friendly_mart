"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "../../../../lib/api";
import Cookies from "js-cookie";
import Link from "next/link";

export default function ManagerCustomerDetailPage() {
  const params = useParams() as { id?: string };
  const id = params?.id;
  const router = useRouter();
  const [customer, setCustomer] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionMsg, setActionMsg] = useState<string | null>(null);

  const getStatusClasses = (status: string) => {
    if (status === "activated") return "bg-emerald-500/10 text-emerald-300 border-emerald-500/20";
    if (status === "blocked") return "bg-red-500/10 text-red-300 border-red-500/20";
    return "bg-slate-500/10 text-slate-400 border-slate-500/20";
  };

  useEffect(() => {
    const token = Cookies.get("token");
    const role = Cookies.get("role");
    if (!token || role !== "manager") {
      window.location.href = "/login/manager";
      return;
    }
    if (!id) {
      router.push("/dashboard/manager/customers");
      return;
    }

    setLoading(true);
    api
      .get(`/manager/customers/${id}`)
      .then((res) => setCustomer(res.data))
      .catch((err) => setError(err.response?.data?.message || "Unable to load customer."))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAction = async (action: "block" | "activate") => {
    if (!id) return;
    try {
      await api.patch(`/manager/customers/${id}/${action}`);
      setActionMsg(`Customer ${action === "block" ? "blocked" : "activated"} successfully.`);
      // refresh
      const res = await api.get(`/manager/customers/${id}`);
      setCustomer(res.data);
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
          <h2 className="font-bold text-white text-2xl">Customer Profile</h2>
          <p className="mt-1 text-slate-400 text-sm">Manager view of customer details.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/dashboard/manager/customers" className="text-slate-300 text-sm hover:underline">
            ← Back to list
          </Link>
        </div>
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
          Loading customer...
        </div>
      ) : error ? (
        <div className="bg-red-500/20 px-4 py-3 border border-red-500/30 rounded-xl text-red-300 text-sm">{error}</div>
      ) : !customer ? (
        <div className="py-16 text-slate-500 text-center">Customer not found.</div>
      ) : (
        <div className="bg-white/5 p-6 border border-white/10 rounded-xl">
          <div className="flex items-start gap-6">
            <div>
              {customer.profilePic ? (
                <img
                  src={`http://localhost:3000/uploads/profile/${customer.profilePic}`}
                  alt="pic"
                  className="border border-white/10 rounded-full w-20 h-20 object-cover"
                />
              ) : (
                <div className="flex justify-center items-center bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full w-20 h-20 font-bold text-white text-xl">
                  {(customer.name || "?")[0].toUpperCase()}
                </div>
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-white text-xl">{customer.name || "—"}</h3>
              <p className="mt-1 text-slate-300">{customer.email || "—"}</p>
              <p className="mt-1 text-slate-300">{customer.phone || "—"}</p>

              <div className="flex items-center gap-3 mt-4">
                <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold border ${getStatusClasses(customer.status)}`}>
                  {customer.status === "activated" ? "Active" : customer.status === "blocked" ? "Blocked" : "Unknown"}
                </span>

                <div className="flex items-center gap-2 ml-auto">
                  <button
                    onClick={() => handleAction("block")}
                    disabled={customer.status === "blocked"}
                    className="bg-red-500/20 hover:bg-red-500/30 disabled:opacity-50 px-3 py-1 border border-red-500/30 rounded-lg font-semibold text-red-400 text-xs transition disabled:cursor-not-allowed"
                  >
                    Block
                  </button>
                  <button
                    onClick={() => handleAction("activate")}
                    disabled={customer.status === "activated"}
                    className="bg-green-500/20 hover:bg-green-500/30 disabled:opacity-50 px-3 py-1 border border-green-500/30 rounded-lg font-semibold text-green-400 text-xs transition disabled:cursor-not-allowed"
                  >
                    Activate
                  </button>
                </div>
              </div>
            </div>
          </div>

          {customer.address && (
            <div className="mt-6">
              <h4 className="font-semibold text-slate-300 text-sm">Address</h4>
              <p className="mt-1 text-slate-300 text-sm">{customer.address}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
