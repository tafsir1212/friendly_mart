"use client";

import Link from "next/link";
import Cookies from "js-cookie";
import { useEffect } from "react";

const roles = [
  {
    title: "Admin",
    description: "Control users, products, orders, and platform settings.",
    href: "/login/admin",
    color: "from-red-500 to-red-600",
    icon: "🔐",
  },
  {
    title: "Seller",
    description: "Manage products, orders, and your online shop.",
    href: "/login/seller",
    color: "from-green-500 to-green-600",
    icon: "📦",
  },
  {
    title: "Manager",
    description: "Access operations dashboard and manage users.",
    href: "/login/manager",
    color: "from-indigo-500 to-indigo-600",
    icon: "📊",
  },
  {
    title: "Customer",
    description: "Browse products, manage orders, and track purchases.",
    href: "/login/customer",
    color: "from-blue-500 to-blue-600",
    icon: "🛍️",
  },
];

export default function LoginPage() {
  useEffect(() => {
    const token = Cookies.get("token");
    const role = Cookies.get("role");

    if (token && role) {
      window.location.href = `/dashboard/${role}`;
    }
  }, []);

  return (
    <main className="flex justify-center items-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-6 py-14 min-h-screen text-white">
      <section className="w-full max-w-3xl">

        {/* HEADER */}
        <div className="mb-10 text-center">
          <span className="bg-white/10 px-4 py-1 border border-white/10 rounded-full text-sm">
            Friendly Mart Login Portal
          </span>

          <h1 className="mt-5 font-bold text-4xl md:text-5xl">
            Select Your Role
          </h1>

          <p className="mt-3 text-white/60 text-sm">
            Choose a role to continue your personalized dashboard experience
          </p>
        </div>

        {/* ROLE LIST */}
        <div className="space-y-4">
          {roles.map((role) => (
            <Link key={role.title} href={role.href} className="group block relative">

              {/* glow */}
              <div
                className={`absolute -inset-0.5 bg-gradient-to-r ${role.color} rounded-2xl blur opacity-0 group-hover:opacity-40 transition`}
              />

              {/* card */}
              <div className="relative flex items-center gap-5 bg-slate-900/80 backdrop-blur-xl p-5 border border-white/10 rounded-2xl hover:scale-[1.01] transition">

                {/* icon */}
                <div
                  className={`w-14 h-14 flex items-center justify-center rounded-xl text-2xl bg-gradient-to-r ${role.color}`}
                >
                  {role.icon}
                </div>

                {/* text */}
                <div className="flex-1">
                  <h2 className="font-semibold text-lg">{role.title}</h2>
                  <p className="mt-1 text-white/50 text-sm">
                    {role.description}
                  </p>
                </div>

                {/* arrow */}
                <div className="text-white/30 group-hover:text-white text-xl transition group-hover:translate-x-1">
                  →
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* FOOTER */}
        <p className="mt-10 text-white/40 text-sm text-center">
          Select a role to continue securely into Friendly Mart system
        </p>

      </section>
    </main>
  );
}