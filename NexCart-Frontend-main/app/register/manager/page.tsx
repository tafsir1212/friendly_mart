"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";

const API = "http://localhost:3000/manager";

const ManagerRegisterPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.password) {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      setLoading(true);
      await axios.post(`${API}/register`, form);
      toast.success("Account created! Please login.");
      window.location.href = "/login/manager";
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-4 min-h-screen">
      <div className="w-full max-w-md">
        <div className="bg-white/10 shadow-2xl backdrop-blur-xl p-8 border border-white/20 rounded-3xl">
          <div className="mb-8 text-center">
            <div className="flex justify-center items-center bg-gradient-to-br from-indigo-600 to-cyan-400 shadow-indigo-500/30 shadow-lg mx-auto mb-4 rounded-2xl w-16 h-16">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h1 className="font-black text-white text-3xl">Create Account</h1>
            <p className="mt-2 text-slate-400">Manager Registration</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { label: "Full Name", key: "name", type: "text", placeholder: "John Manager" },
              { label: "Email Address", key: "email", type: "email", placeholder: "manager@nexcart.com" },
              { label: "Phone Number", key: "phone", type: "text", placeholder: "+8801XXXXXXXXX" },
              { label: "Password", key: "password", type: "password", placeholder: "••••••••" },
            ].map(({ label, key, type, placeholder }) => (
              <div key={key}>
                <label className="block mb-2 font-semibold text-slate-300 text-sm">{label}</label>
                <input
                  type={type}
                  value={(form as any)[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  placeholder={placeholder}
                  className="bg-white/10 px-4 py-3 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full text-white transition placeholder-slate-500"
                />
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-indigo-600 hover:from-indigo-700 to-cyan-500 hover:to-cyan-600 disabled:opacity-60 shadow-lg px-6 py-3 rounded-xl w-full font-bold text-white hover:scale-[1.02] active:scale-[0.98] transition-all transform"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className="mt-6 text-slate-400 text-sm text-center">
            Already have an account?{' '}
            <Link href="/login/manager" className="font-semibold text-indigo-300 hover:text-indigo-200 transition">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ManagerRegisterPage;
