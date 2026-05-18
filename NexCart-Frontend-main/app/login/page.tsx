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
    bg: "bg-red-50",
    text: "text-red-600",
    icon: "🛡️",
  },
  {
    title: "Seller",
    description:
      "Manage products, orders, and your online shop.",
    href: "/login/seller",
    color: "from-green-500 to-green-600",
    bg: "bg-green-50",
    text: "text-green-600",
    icon: "🏪",
  },
  {
    title: "Rider",
    description:
      "View assigned deliveries and update delivery status.",
    href: "/login/rider",
    color: "from-yellow-500 to-yellow-600",
    bg: "bg-yellow-50",
    text: "text-yellow-600",
    icon: "🏍️",
  },
  {
    title: "Manager",
    description: "Access operations dashboard and manage users.",
    href: "/login/manager",
    color: "from-indigo-500 to-indigo-600",
    bg: "bg-indigo-50",
    text: "text-indigo-600",
    icon: "🧑‍💼",
  },
  {
    title: "Customer",
    description: "Browse products, manage orders, and track purchases.",
    href: "/login/customer",
    color: "from-blue-500 to-blue-600",
    bg: "bg-blue-50",
    text: "text-blue-600",
    icon: "🛒",
  },
];

export default function LoginPage() {

  useEffect(() => {
    const token = Cookies.get("token");
    const role = Cookies.get("role");

    // Redirect if already logged in
    if (token && role) {
      window.location.href = `/dashboard/${role}`;
    }
  }, []);

  return (
    <main className="bg-gradient-to-br from-slate-100 via-white to-slate-200 px-6 py-12 min-h-screen">
      <section className="flex justify-center items-center mx-auto max-w-6xl min-h-[80vh]">
        <div className="bg-white/80 shadow-2xl backdrop-blur-md p-6 md:p-10 border border-slate-200 rounded-3xl w-full">

          {/* Header */}
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <span className="inline-flex bg-slate-900 mb-4 px-4 py-1 rounded-full font-medium text-white text-sm">
              NexCart Login
            </span>

            <h1 className="font-bold text-slate-900 text-3xl md:text-4xl tracking-tight">
              Select Your Login Role
            </h1>
          </div>

          {/* Role Cards */}
          <div className="gap-5 grid sm:grid-cols-2 lg:grid-cols-4">
            {roles.map((role) => (
              <Link
                key={role.title}
                href={role.href}
                className="group bg-white shadow-sm hover:shadow-xl p-5 border border-slate-200 hover:border-slate-300 rounded-2xl transition-all hover:-translate-y-1 duration-300"
              >
                <div
                  className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${role.bg} text-2xl`}
                >
                  {role.icon}
                </div>

                <h2 className="font-semibold text-slate-900 text-xl">
                  {role.title}
                </h2>

                <p className="mt-2 min-h-[72px] text-slate-600 text-sm leading-6">
                  {role.description}
                </p>

                <div
                  className={`mt-6 flex items-center justify-center rounded-xl bg-gradient-to-r ${role.color} px-4 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 group-hover:shadow-lg`}
                >
                  Continue as {role.title}
                </div>
              </Link>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-10 text-slate-500 text-sm text-center">
            New to NexCart? Choose your role and register from the login page.
          </div>

        </div>
      </section>
    </main>
  );
}
