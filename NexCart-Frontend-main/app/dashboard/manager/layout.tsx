"use client";

import React from "react";
import ManagerSidebar from "./ManagerSidebar";

export default function ManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 min-h-screen">
      <ManagerSidebar />
      <main className="flex-1 p-6 md:p-10 overflow-auto">
        {/* Top bar */}
        <header className="flex justify-between items-center mb-6">
          <h1 className="font-black text-white text-3xl">Manager Console</h1>
          {/* Placeholder for future profile dropdown / logout */}
          <button
            onClick={() => {
              // clear auth cookies and redirect to login
              document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
              document.cookie = "role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
              window.location.href = "/login/manager";
            }}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white transition"
          >
            Logout
          </button>
        </header>
        {children}
      </main>
    </div>
  );
}
