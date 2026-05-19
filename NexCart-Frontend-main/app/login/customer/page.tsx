"use client";

import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { z } from "zod";
import { Mail, Lock, Eye, EyeOff, ShoppingBag, ArrowRight } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export default function CustomerLoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    const role = Cookies.get("role");
    if (token && role) window.location.href = `/dashboard/${role}`;
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = loginSchema.safeParse(formData);
    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      toast.error("Please fix the form errors");
      return;
    }

    setErrors({});

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:3000/customer/login", {
        email: formData.email,
        password: formData.password,
      });

      Cookies.set("token", res.data.token);
      Cookies.set("role", "customer");
      // Save customer info for use in complaint form and other pages
      if (res.data.customer) {
        Cookies.set("customerId", String(res.data.customer.id || ""));
        Cookies.set("customerName", res.data.customer.name || "");
        Cookies.set("customerEmail", res.data.customer.email || formData.email);
      } else {
        Cookies.set("customerEmail", formData.email);
      }
      toast.success("Welcome back! 🎉");
      window.location.href = "/dashboard/customer";
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

 return (
  <div className="relative min-h-screen overflow-hidden bg-[#050816]">
    {/* BACKGROUND */}
    <div className="absolute inset-0">
      <div className="absolute top-[-120px] left-[-120px] h-[320px] w-[320px] rounded-full bg-cyan-500/15 blur-[120px]" />

      <div className="absolute bottom-[-120px] right-[-120px] h-[320px] w-[320px] rounded-full bg-indigo-500/15 blur-[120px]" />

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:80px_80px]" />
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
        <div className="relative hidden overflow-hidden p-12 lg:flex lg:flex-col lg:justify-between">
          {/* gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-sky-500/10 to-indigo-500/20" />

          {/* glow */}
          <div className="absolute top-[-100px] right-[-100px] h-[280px] w-[280px] rounded-full bg-cyan-400/20 blur-[120px]" />

          <div className="relative z-10">
            {/* LOGO */}
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl">
                <ShoppingBag
                  size={30}
                  className="text-cyan-300"
                />
              </div>

              <div>
                <h1 className="text-3xl font-black tracking-tight text-white">
                  Friendly Mart
                </h1>

                <p className="mt-1 text-sm text-cyan-100/70">
                  Smart shopping platform
                </p>
              </div>
            </div>

            {/* HERO */}
            <div className="mt-20">
              <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 py-2 text-xs font-black uppercase tracking-[0.25em] text-cyan-300">
                Customer Portal
              </span>

              <h2 className="mt-8 text-6xl font-black leading-[1] tracking-tight text-white">
                Welcome
                <br />
                Back.
              </h2>

              <p className="mt-8 max-w-lg text-lg leading-relaxed text-slate-300">
                Access your orders, track shipments,
                manage your cart and enjoy a seamless
                premium shopping experience.
              </p>
            </div>
          </div>

          {/* FEATURES */}
          <div className="relative z-10 mt-10 space-y-4">
            {[
              "Fast worldwide delivery",
              "Secure encrypted payments",
              "24/7 premium customer support",
            ].map((item) => (
              <div
                key={item}
                className="
                  flex items-center gap-4
                  rounded-2xl
                  border border-white/10
                  bg-white/[0.06]
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

        {/* RIGHT SIDE */}
        <div className="relative flex flex-col justify-center p-8 sm:p-12 lg:p-16">
          {/* MOBILE LOGO */}
          <div className="mb-10 flex items-center gap-4 lg:hidden">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-500/20 bg-cyan-500/10">
              <ShoppingBag
                size={24}
                className="text-cyan-400"
              />
            </div>

            <div>
              <h1 className="text-2xl font-black text-white">
                NexCart
              </h1>

              <p className="text-sm text-slate-400">
                Shopping Platform
              </p>
            </div>
          </div>

          {/* FORM HEADER */}
          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
              Login
            </span>

            <h2 className="mt-4 text-5xl font-black tracking-tight text-white">
              Sign In
            </h2>

            <p className="mt-4 max-w-md text-base leading-relaxed text-slate-400">
              Continue your shopping journey with
              secure access to your customer account.
            </p>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="mt-12 space-y-6"
          >
            {/* EMAIL */}
            <div>
              <label className="mb-3 block text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                  className={`
                    h-16 w-full rounded-2xl
                    border bg-white/[0.03]
                    pl-14 pr-5
                    text-white
                    outline-none
                    transition-all duration-300
                    placeholder:text-slate-500
                    focus:border-cyan-400/40
                    focus:bg-cyan-500/[0.03]
                    ${
                      errors?.email
                        ? "border-red-500/30"
                        : "border-white/10"
                    }
                  `}
                />
              </div>

              {errors?.email && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.email[0]}
                </p>
              )}
            </div>

            {/* PASSWORD */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                  Password
                </label>

                <a
                  href="#"
                  className="text-sm font-semibold text-cyan-400 hover:text-cyan-300"
                >
                  Forgot Password?
                </a>
              </div>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  type={
                    showPassword ? "text" : "password"
                  }
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      password: e.target.value,
                    })
                  }
                  className={`
                    h-16 w-full rounded-2xl
                    border bg-white/[0.03]
                    pl-14 pr-14
                    text-white
                    outline-none
                    transition-all duration-300
                    placeholder:text-slate-500
                    focus:border-cyan-400/40
                    focus:bg-cyan-500/[0.03]
                    ${
                      errors?.password
                        ? "border-red-500/30"
                        : "border-white/10"
                    }
                  `}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-cyan-400"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              {errors?.password && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.password[0]}
                </p>
              )}
            </div>

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
                  Signing In...
                </>
              ) : (
                <>
                  Access Dashboard

                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </>
              )}
            </button>
          </form>

          {/* FOOTER */}
          <div className="mt-10 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/10" />

            <span className="text-xs uppercase tracking-[0.2em] text-slate-500">
              New Customer
            </span>

            <div className="h-px flex-1 bg-white/10" />
          </div>

          <p className="mt-8 text-center text-base text-slate-400">
            Don&apos;t have an account?{" "}
            <Link
              href="/register/customer"
              className="font-bold text-cyan-400 transition hover:text-cyan-300"
            >
              Create Account →
            </Link>
          </p>
        </div>
      </div>
    </div>
  </div>
);
}