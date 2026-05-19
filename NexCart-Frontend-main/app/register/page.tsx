import Link from "next/link";

const roles = [
  {
    title: "Admin",
    href: "/register/admin",
    icon: "🛡️",
    color: "from-red-500 to-pink-500",
  },
  {
    title: "Seller",
    href: "/register/seller",
    icon: "🏪",
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Manager",
    href: "/register/manager",
    icon: "🧑‍💼",
    color: "from-indigo-500 to-blue-500",
  },
  {
    title: "Customer",
    href: "/register/customer",
    icon: "🛒",
    color: "from-blue-500 to-sky-500",
  },
];

export default function RegisterPage() {
  return (
    <main className="flex justify-center items-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-6 py-14 min-h-screen text-white">

      <div className="w-full max-w-4xl text-center">

        {/* HEADER */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 border border-white/10 rounded-full text-sm">
            🚀 Friendly Mart Registration Portal
          </div>

          <h1 className="mt-6 font-bold text-4xl md:text-5xl">
            Choose Your Account Type
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-white/60 text-sm">
            Select a role to continue. Each role gives you a different dashboard experience.
          </p>
        </div>

        {/* CENTER ROLE GRID (NEW STYLE) */}
        <div className="gap-6 grid sm:grid-cols-2">

          {roles.map((role) => (
            <Link
              key={role.title}
              href={role.href}
              className="group relative"
            >
              {/* glow */}
              <div
                className={`absolute -inset-0.5 bg-gradient-to-r ${role.color} rounded-2xl blur opacity-0 group-hover:opacity-50 transition`}
              />

              {/* card */}
              <div className="relative bg-slate-900/80 backdrop-blur-xl p-8 border border-white/10 rounded-2xl transition-all hover:-translate-y-2">

                {/* icon */}
                <div
                  className={`w-16 h-16 mx-auto flex items-center justify-center text-2xl rounded-2xl bg-gradient-to-r ${role.color}`}
                >
                  {role.icon}
                </div>

                {/* title */}
                <h3 className="mt-5 font-semibold text-xl">
                  {role.title}
                </h3>

                <p className="mt-2 text-white/50 text-sm">
                  Continue as {role.title} and access your dashboard
                </p>

                {/* button feel */}
                <div className="inline-flex items-center gap-2 mt-6 text-white/60 group-hover:text-white transition">
                  Enter Platform
                  <span className="transition group-hover:translate-x-1">→</span>
                </div>
              </div>
            </Link>
          ))}

        </div>

        {/* FOOTER NOTE */}
        <p className="mt-12 text-white/40 text-sm">
          Secure registration system • Friendly Mart
        </p>

      </div>
    </main>
  );
}