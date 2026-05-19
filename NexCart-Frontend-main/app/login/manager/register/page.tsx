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
  <div className="relative min-h-screen overflow-hidden bg-[#030712]">
    {/* BACKGROUND */}
    <div className="absolute inset-0">
      <div className="absolute left-[-120px] top-[-120px] h-[320px] w-[320px] rounded-full bg-cyan-500/20 blur-[120px]" />

      <div className="absolute bottom-[-140px] right-[-140px] h-[340px] w-[340px] rounded-full bg-indigo-500/20 blur-[140px]" />

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:70px_70px]" />
    </div>

    <div className="relative z-10 flex min-h-screen items-center justify-center px-5 py-10">
      <div
        className="
          grid w-full max-w-6xl overflow-hidden
          rounded-[40px]
          border border-white/10
          bg-white/[0.04]
          backdrop-blur-2xl
          lg:grid-cols-2
        "
      >
        {/* LEFT SIDE */}
        <div className="relative hidden overflow-hidden lg:flex">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-sky-500/10 to-indigo-500/20" />

          <div className="absolute right-[-100px] top-[-100px] h-[260px] w-[260px] rounded-full bg-cyan-400/20 blur-[120px]" />

          <div className="relative z-10 flex flex-col justify-between p-14">
            {/* TOP */}
            <div>
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl">
                  <svg
                    className="h-8 w-8 text-cyan-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                </div>

                <div>
                  <h1 className="text-3xl font-black text-white">
                    NexCart
                  </h1>

                  <p className="mt-1 text-sm text-cyan-100/70">
                    Manager Portal
                  </p>
                </div>
              </div>

              <div className="mt-24">
                <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 py-2 text-xs font-black uppercase tracking-[0.25em] text-cyan-300">
                  Registration
                </span>

                <h2 className="mt-8 text-6xl font-black leading-[1] tracking-tight text-white">
                  Build Your
                  <br />
                  Manager Account
                </h2>

                <p className="mt-8 max-w-lg text-lg leading-relaxed text-slate-300">
                  Access powerful analytics, inventory
                  management and customer operations
                  from a premium admin dashboard.
                </p>
              </div>
            </div>

            {/* FEATURES */}
            <div className="space-y-4">
              {[
                "Advanced sales analytics",
                "Manage products & orders",
                "Secure enterprise dashboard",
              ].map((item) => (
                <div
                  key={item}
                  className="
                    flex items-center gap-4
                    rounded-2xl
                    border border-white/10
                    bg-white/[0.05]
                    px-5 py-4
                    backdrop-blur-xl
                  "
                >
                  <div className="h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.8)]" />

                  <span className="font-medium text-white">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="relative flex flex-col justify-center p-8 sm:p-12 lg:p-16">
          {/* MOBILE LOGO */}
          <div className="mb-10 flex items-center gap-4 lg:hidden">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-500/20 bg-cyan-500/10">
              <svg
                className="h-7 w-7 text-cyan-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            </div>

            <div>
              <h1 className="text-2xl font-black text-white">
                Friendly Mart
              </h1>

              <p className="text-sm text-slate-400">
                Manager Portal
              </p>
            </div>
          </div>

          {/* HEADER */}
          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
              Create Account
            </span>

            <h2 className="mt-4 text-5xl font-black tracking-tight text-white">
              Register
            </h2>

            <p className="mt-4 max-w-md text-base leading-relaxed text-slate-400">
              Create your manager account and start
              managing operations professionally.
            </p>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="mt-12 space-y-6"
          >
            {[
              {
                label: "Full Name",
                key: "name",
                type: "text",
                placeholder: "John Manager",
              },
              {
                label: "Email Address",
                key: "email",
                type: "email",
                placeholder: "manager@nexcart.com",
              },
              {
                label: "Phone Number",
                key: "phone",
                type: "text",
                placeholder: "+8801XXXXXXXXX",
              },
              {
                label: "Password",
                key: "password",
                type: "password",
                placeholder: "••••••••",
              },
            ].map(
              ({
                label,
                key,
                type,
                placeholder,
              }) => (
                <div key={key}>
                  <label className="mb-3 block text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                    {label}
                  </label>

                  <input
                    type={type}
                    value={(form as any)[key]}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        [key]: e.target.value,
                      })
                    }
                    placeholder={placeholder}
                    className="
                      h-16 w-full rounded-2xl
                      border border-white/10
                      bg-white/[0.03]
                      px-5
                      text-white
                      outline-none
                      transition-all duration-300
                      placeholder:text-slate-500
                      focus:border-cyan-400/40
                      focus:bg-cyan-500/[0.03]
                    "
                  />
                </div>
              )
            )}

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="
                group flex h-16 w-full items-center
                justify-center gap-3 rounded-2xl
                bg-cyan-400
                text-base font-black text-black
                transition-all duration-300
                hover:scale-[1.02]
                hover:bg-cyan-300
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {loading ? (
                <>
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-black border-t-transparent" />
                  Creating Account...
                </>
              ) : (
                <>
                  Create Manager Account

                  <svg
                    className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* FOOTER */}
          <div className="mt-10 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/10" />

            <span className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Already Registered
            </span>

            <div className="h-px flex-1 bg-white/10" />
          </div>

          <p className="mt-8 text-center text-base text-slate-400">
            Already have an account?{" "}
            <Link
              href="/login/manager"
              className="font-bold text-cyan-400 transition hover:text-cyan-300"
            >
              Sign In →
            </Link>
          </p>
        </div>
      </div>
    </div>
  </div>
);
};

export default ManagerRegisterPage;
