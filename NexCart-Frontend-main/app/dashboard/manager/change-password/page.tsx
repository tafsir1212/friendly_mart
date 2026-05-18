"use client";

import { useEffect, useState } from "react";
import api from "../../../lib/api";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export default function ManagerChangePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    const role = Cookies.get("role");
    if (!token || role !== "manager") {
      window.location.href = "/login/manager";
      return;
    }
    setAuthChecked(true);
  }, []);

  const strength = (() => {
    if (newPassword.length === 0) return 0;
    let s = 0;
    if (newPassword.length >= 6) s++;
    if (newPassword.length >= 10) s++;
    if (/[A-Z]/.test(newPassword)) s++;
    if (/[0-9]/.test(newPassword)) s++;
    if (/[^a-zA-Z0-9]/.test(newPassword)) s++;
    return s;
  })();

  const strengthLabel = ["", "Very Weak", "Weak", "Fair", "Strong", "Very Strong"][strength];
  const strengthColor = ["", "bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-blue-500", "bg-green-500"][strength];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirmation must match.");
      return;
    }

    setLoading(true);
    try {
      await api.patch("/manager/change-password", {
        currentPassword,
        newPassword,
        confirmPassword,
      });
      toast.success("Password changed successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Unable to change password.");
    } finally {
      setLoading(false);
    }
  };

  const EyeToggle = ({ show, onToggle }: { show: boolean; onToggle: () => void }) => (
    <button type="button" onClick={onToggle} className="text-slate-500 hover:text-white transition">
      {show ? (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
        </svg>
      ) : (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )}
    </button>
  );

  return (
    <div className="max-w-xl">
      {/* Header */}
      <div className="mb-6">
        <h2 className="font-bold text-white text-2xl">Change Password</h2>
        <p className="mt-1 text-slate-400 text-sm">Update your account password to keep it secure.</p>
      </div>

      {/* Success Banner */}
      {success && (
        <div className="flex items-center gap-3 bg-green-500/20 border border-green-500/30 rounded-2xl px-4 py-3 mb-5">
          <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-green-300 text-sm font-medium">Password updated successfully!</p>
        </div>
      )}

      {authChecked && (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Current Password */}
            <div>
              <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showCurrent ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter your current password"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 pr-11 text-white text-sm focus:outline-none focus:border-blue-400 transition placeholder-slate-600"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <EyeToggle show={showCurrent} onToggle={() => setShowCurrent(!showCurrent)} />
                </div>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNew ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Min. 6 characters"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 pr-11 text-white text-sm focus:outline-none focus:border-blue-400 transition placeholder-slate-600"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <EyeToggle show={showNew} onToggle={() => setShowNew(!showNew)} />
                </div>
              </div>
              {/* Strength meter */}
              {newPassword.length > 0 && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all ${i <= strength ? strengthColor : "bg-white/10"}`}
                      />
                    ))}
                  </div>
                  <p className={`text-xs font-semibold ${["", "text-red-400", "text-orange-400", "text-yellow-400", "text-blue-400", "text-green-400"][strength]}`}>
                    {strengthLabel}
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat your new password"
                  className={`w-full bg-white/10 border rounded-xl px-4 py-3 pr-11 text-white text-sm focus:outline-none transition placeholder-slate-600 ${
                    confirmPassword && confirmPassword !== newPassword
                      ? "border-red-500/50 focus:border-red-400"
                      : confirmPassword && confirmPassword === newPassword
                      ? "border-green-500/50 focus:border-green-400"
                      : "border-white/20 focus:border-blue-400"
                  }`}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <EyeToggle show={showConfirm} onToggle={() => setShowConfirm(!showConfirm)} />
                </div>
              </div>
              {confirmPassword && confirmPassword !== newPassword && (
                <p className="text-red-400 text-xs mt-1.5">Passwords do not match.</p>
              )}
              {confirmPassword && confirmPassword === newPassword && (
                <p className="text-green-400 text-xs mt-1.5">✓ Passwords match.</p>
              )}
            </div>

            {/* Tips */}
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl px-4 py-3">
              <p className="text-blue-300 text-xs font-semibold mb-1.5">Password Tips</p>
              <ul className="text-slate-400 text-xs space-y-1">
                <li>• At least 6 characters long</li>
                <li>• Mix uppercase and lowercase letters</li>
                <li>• Include numbers and special characters</li>
              </ul>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !currentPassword || !newPassword || !confirmPassword || newPassword !== confirmPassword}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl text-sm transition shadow-lg shadow-blue-500/20"
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Changing password...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                  Change Password
                </>
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
