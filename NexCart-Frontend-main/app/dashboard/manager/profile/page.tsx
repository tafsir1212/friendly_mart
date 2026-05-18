"use client";

import { useEffect, useState } from "react";
import api from "../../../lib/api";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export default function ManagerProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "" });

  const loadProfile = () => {
    setLoading(true);
    api
      .get("/manager/profile")
      .then((res) => {
        setProfile(res.data);
        setFormData({ name: res.data.name || "", phone: res.data.phone || "" });
      })
      .catch((err) => setError(err.response?.data?.message || "Unable to load profile."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const token = Cookies.get("token");
    const role = Cookies.get("role");
    if (!token || role !== "manager") {
      window.location.href = "/login/manager";
      return;
    }
    loadProfile();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await api.put("/manager/profile", formData);
      setProfile(res.data);
      toast.success("Profile updated successfully.");
      setEditing(false);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center gap-3 text-slate-400">
        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
        Loading profile...
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 py-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300 text-sm">{error}</div>
    );
  }

  return (
    <div className="max-w-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-bold text-white text-2xl">Profile</h2>
          <p className="mt-1 text-slate-400 text-sm">Your manager account information.</p>
        </div>
        {!editing && (
          <button
            onClick={() => setEditing(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition shadow-lg shadow-blue-500/20"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit Profile
          </button>
        )}
      </div>

      {/* Avatar Card */}
      <div className="bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl p-6 mb-5 flex items-center gap-5 shadow-xl shadow-blue-500/20 relative overflow-hidden">
        <div className="absolute -top-6 -right-6 w-32 h-32 bg-white/10 rounded-full" />
        <div className="absolute -bottom-8 right-20 w-24 h-24 bg-white/5 rounded-full" />
        <div className="relative z-10 w-16 h-16 rounded-2xl bg-white/20 border-2 border-white/30 flex items-center justify-center text-white text-3xl font-black shadow-lg flex-shrink-0">
          {(profile?.name || "M")[0].toUpperCase()}
        </div>
        <div className="relative z-10">
          <p className="text-white text-xl font-extrabold">{profile?.name || "—"}</p>
          <p className="text-blue-100 text-sm">{profile?.email || "—"}</p>
          <span className="mt-2 inline-flex items-center gap-1 bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/30">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Verified Manager
          </span>
        </div>
      </div>

      {/* Info / Edit Form */}
      {!editing ? (
        <div className="bg-white/5 border border-white/10 rounded-2xl divide-y divide-white/5">
          {[
            { label: "Full Name", value: profile?.name, icon: "👤" },
            { label: "Email Address", value: profile?.email, icon: "✉️" },
            { label: "Phone Number", value: profile?.phone || "—", icon: "📞" },
            { label: "Manager ID", value: `#${profile?.id}`, icon: "🆔" },
            {
              label: "Account Status",
              value: (
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-green-500/20 text-green-300 border border-green-500/30">
                  {profile?.status || "Active"}
                </span>
              ),
              icon: "🟢",
            },
          ].map(({ label, value, icon }) => (
            <div key={label} className="flex items-center gap-4 px-5 py-4">
              <span className="text-lg w-7 flex-shrink-0">{icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">{label}</p>
                <p className="text-white font-medium mt-0.5">{value || "—"}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <form onSubmit={handleSave} className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
          <div>
            <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Full Name</label>
            <input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-400 transition"
              placeholder="Your full name"
            />
          </div>
          <div>
            <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Phone Number</label>
            <input
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-400 transition"
              placeholder="Your phone number"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold py-2.5 rounded-xl text-sm transition"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={() => { setEditing(false); setFormData({ name: profile?.name || "", phone: profile?.phone || "" }); }}
              className="flex-1 bg-white/10 hover:bg-white/15 text-slate-300 font-semibold py-2.5 rounded-xl text-sm transition border border-white/10"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
