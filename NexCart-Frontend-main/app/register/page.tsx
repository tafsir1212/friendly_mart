import Link from "next/link";

const roles = [
  {
    title: "Admin",
    href: "/register/admin",
    icon: "🛡️",
    border: "border-red-200",
    bg: "bg-red-50",
    text: "text-red-700",
  },

  {
    title: "Seller",
    href: "/register/seller",
    icon: "🏪",
    border: "border-green-200",
    bg: "bg-green-50",
    text: "text-green-700",
  },
  {
    title: "Rider",
    href: "/register/rider",
    icon: "🏍️",
    border: "border-yellow-200",
    bg: "bg-yellow-50",
    text: "text-yellow-700",
  },
  {
    title: "Manager",
    href: "/register/manager",
    icon: "🧑‍💼",
    border: "border-indigo-200",
    bg: "bg-indigo-50",
    text: "text-indigo-700",
  },
  {
    title: "Customer",
    href: "/register/customer",
    icon: "🛒",
    border: "border-blue-200",
    bg: "bg-blue-50",
    text: "text-blue-700",
  },
];

export default function RegisterPage() {
  return (
    <main className="bg-gradient-to-br from-slate-50 via-white to-blue-50 px-6 py-12 min-h-screen text-slate-900">
      <section className="items-center gap-10 grid lg:grid-cols-2 mx-auto max-w-7xl min-h-[85vh]">
        {/* Left Section */}
        <div className="max-w-xl">
          <span className="inline-flex bg-white shadow-sm px-4 py-1 border border-blue-100 rounded-full font-medium text-blue-700 text-sm">
            Create Your NexCart Account
          </span>

          <h1 className="mt-6 font-bold text-slate-900 text-4xl md:text-5xl leading-tight tracking-tight">
            Start your journey with the right account type.
          </h1>

          <div className="gap-4 grid sm:grid-cols-3 mt-8">
            <div className="bg-white shadow-sm p-4 border border-slate-200 rounded-2xl">
              <h3 className="font-bold text-slate-900 text-2xl">4</h3>
              <p className="mt-1 text-slate-500 text-sm">Account Roles</p>
            </div>

            <div className="bg-white shadow-sm p-4 border border-slate-200 rounded-2xl">
              <h3 className="font-bold text-slate-900 text-2xl">Fast</h3>
              <p className="mt-1 text-slate-500 text-sm">Registration</p>
            </div>

            <div className="bg-white shadow-sm p-4 border border-slate-200 rounded-2xl">
              <h3 className="font-bold text-slate-900 text-2xl">Secure</h3>
              <p className="mt-1 text-slate-500 text-sm">Account Setup</p>
            </div>
          </div>

          <p className="mt-8 text-slate-500 text-sm">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-blue-700 hover:underline"
            >
              Login here
            </Link>
          </p>
        </div>

        {/* Right Section */}
        <div className="bg-white/90 shadow-2xl shadow-slate-200/70 backdrop-blur-md p-5 md:p-8 border border-slate-200 rounded-3xl text-slate-900">
          <div className="mb-6">
            <h2 className="font-bold text-slate-900 text-2xl">
              Choose registration role
            </h2>
            <p className="mt-2 text-slate-500 text-sm">
              Pick the role that matches your activity on NexCart.
            </p>
          </div>

          <div className="gap-4 grid">
            {roles.map((role) => (
              <Link
                key={role.title}
                href={role.href}
                className={`group flex items-center gap-4 rounded-2xl border ${role.border} ${role.bg} p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
              >
                <div className="flex justify-center items-center bg-white shadow-sm rounded-2xl w-14 h-14 text-2xl">
                  {role.icon}
                </div>

                <div className="flex-1">
                  <h3 className={`text-lg font-bold ${role.text}`}>
                    {role.title}
                  </h3>
                </div>

                <span className="text-slate-400 group-hover:text-slate-900 text-xl transition group-hover:translate-x-1">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
