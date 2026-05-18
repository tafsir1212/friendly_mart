"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ShoppingBag,
  MapPin,
  Star,
  Users,
  Package,
  Truck,
  Shield,
  Leaf,
  ArrowRight,
  CheckCircle,
  Store,
  Smartphone,
  Dumbbell,
  Shirt,
  Home,
  Sparkles,
  Watch,
  ChevronRight,
  Heart,
  Award,
  Clock,
} from "lucide-react";

const stats = [
  { value: "500+", label: "Products", icon: Package },
  { value: "50K+", label: "Happy Customers", icon: Users },
  { value: "3+", label: "Trusted Sellers", icon: Store },
  { value: "98%", label: "Satisfaction", icon: Star },
];

const categories = [
  {
    name: "Electronics",
    icon: Smartphone,
    count: 4,
    emoji: "📱",
  },
  {
    name: "Sports",
    icon: Dumbbell,
    count: 3,
    emoji: "⚽",
  },
  {
    name: "Beauty",
    icon: Sparkles,
    count: 4,
    emoji: "✨",
  },
  {
    name: "Fashion",
    icon: Shirt,
    count: 3,
    emoji: "👕",
  },
  {
    name: "Home & Living",
    icon: Home,
    count: 3,
    emoji: "🏠",
  },
  {
    name: "Smartwatch",
    icon: Watch,
    count: 2,
    emoji: "⌚",
  },
];

const featured = [
  {
    name: "Smart Watch Pro",
    price: "৳4,200",
    category: "Electronics",
    seller: "Friendly Mart",
    emoji: "⌚",
  },
  {
    name: "Wireless Headphones",
    price: "৳3,500",
    category: "Electronics",
    seller: "Friendly Mart",
    emoji: "🎧",
  },
  {
    name: "Dumbbell Set 10KG",
    price: "৳2,900",
    category: "Sports",
    seller: "Friendly Mart",
    emoji: "🏋️",
  },
  {
    name: "Premium Perfume",
    price: "৳3,500",
    category: "Beauty",
    seller: "Friendly Mart",
    emoji: "🌸",
  },
  {
    name: "Casual Sneakers",
    price: "৳3,200",
    category: "Fashion",
    seller: "Friendly Mart",
    emoji: "👟",
  },
  {
    name: "Football Training Ball",
    price: "৳1,600",
    category: "Sports",
    seller: "Friendly Mart",
    emoji: "⚽",
  },
];

const values = [
  {
    icon: Shield,
    title: "Trusted Quality",
    desc: "All products are verified and quality checked.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    desc: "Lightning fast delivery all over Bangladesh.",
  },
  {
    icon: Heart,
    title: "Customer First",
    desc: "Friendly support available whenever you need.",
  },
  {
    icon: Leaf,
    title: "Affordable Pricing",
    desc: "Premium products with budget friendly prices.",
  },
  {
    icon: Award,
    title: "Premium Experience",
    desc: "Modern shopping experience with trusted sellers.",
  },
  {
    icon: Clock,
    title: "Easy Returns",
    desc: "Simple return and replacement process.",
  },
];

export default function AboutPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts =
    activeCategory === "All"
      ? featured
      : featured.filter((p) => p.category === activeCategory);

  return (
    <div className="bg-[#020617] min-h-screen overflow-hidden text-white">

      {/* HERO */}
      <section className="relative px-6 py-28 overflow-hidden">

        {/* Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.18),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.18),transparent_35%)]" />

        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px),linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

        <div className="relative items-center gap-20 grid lg:grid-cols-2 mx-auto max-w-7xl">

          {/* LEFT */}
          <div>

            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md mb-8 px-4 py-2 border border-white/10 rounded-full font-semibold text-indigo-300 text-sm">
              <Sparkles size={15} />
              Bangladesh Premium Marketplace
            </div>

            <h1 className="font-black text-5xl md:text-7xl leading-[1.05] tracking-tight">
              Welcome to{" "}
              <span className="bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent">
                Friendly Mart
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-slate-400 text-lg leading-relaxed">
              Friendly Mart is a modern ecommerce marketplace connecting trusted
              sellers with shoppers across Bangladesh through a premium digital
              shopping experience.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mt-10">

              <Link
                href="/products"
                className="group flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 shadow-2xl shadow-indigo-900/40 px-7 py-4 rounded-2xl font-bold text-white hover:scale-[1.03] transition-all duration-300"
              >
                Explore Products
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/register/customer"
                className="flex items-center gap-2 bg-white/5 hover:bg-white/10 backdrop-blur-md px-7 py-4 border border-white/10 rounded-2xl font-semibold text-white transition-all"
              >
                Join Friendly Mart
              </Link>

            </div>

            {/* Features */}
            <div className="gap-4 grid grid-cols-2 sm:grid-cols-4 mt-14">

              {[
                "Trusted Sellers",
                "Fast Delivery",
                "Secure Payment",
                "Premium Quality",
              ].map((item) => (
                <div
                  key={item}
                  className="bg-white/[0.04] backdrop-blur-md p-4 border border-white/10 rounded-2xl"
                >
                  <CheckCircle
                    size={18}
                    className="mb-3 text-indigo-400"
                  />

                  <p className="font-semibold text-slate-200 text-sm">
                    {item}
                  </p>
                </div>
              ))}

            </div>

          </div>

          {/* RIGHT */}
          <div className="relative">

            <div className="-top-10 -right-10 absolute bg-indigo-500/20 blur-3xl rounded-full w-72 h-72" />
            <div className="bottom-0 left-0 absolute bg-purple-500/20 blur-3xl rounded-full w-60 h-60" />

            <div className="gap-5 grid grid-cols-2">

              {categories.slice(0, 4).map((card) => (
                <div
                  key={card.name}
                  className="group bg-white/[0.04] backdrop-blur-xl p-7 border border-white/10 hover:border-indigo-500/40 rounded-3xl transition-all hover:-translate-y-2 duration-300"
                >

                  <div className="mb-5 text-5xl group-hover:scale-110 transition-transform">
                    {card.emoji}
                  </div>

                  <h3 className="font-bold text-white text-xl">
                    {card.name}
                  </h3>

                  <p className="mt-2 text-slate-400 text-sm">
                    {card.count}+ Products
                  </p>

                </div>
              ))}

            </div>

          </div>

        </div>
      </section>

      {/* STATS */}
      <section className="bg-[#0f172a] py-14 border-white/5 border-y">

        <div className="gap-6 grid grid-cols-2 md:grid-cols-4 mx-auto px-6 max-w-6xl">

          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white/[0.03] backdrop-blur-md p-7 border border-white/5 rounded-3xl text-center"
            >

              <div className="flex justify-center items-center bg-gradient-to-br from-indigo-500 to-purple-600 shadow-indigo-900/30 shadow-lg mx-auto mb-5 rounded-2xl w-14 h-14">
                <stat.icon size={24} className="text-white" />
              </div>

              <h3 className="font-black text-white text-4xl">
                {stat.value}
              </h3>

              <p className="mt-2 font-medium text-slate-400 text-sm">
                {stat.label}
              </p>

            </div>
          ))}

        </div>

      </section>

      {/* CATEGORIES */}
      <section className="px-6 py-24">

        <div className="mx-auto max-w-6xl">

          <div className="mb-14 text-center">

            <p className="mb-4 font-bold text-indigo-400 text-xs uppercase tracking-[0.3em]">
              Categories
            </p>

            <h2 className="font-black text-4xl md:text-5xl">
              Shop By Category
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-slate-400">
              Explore premium categories available on Friendly Mart.
            </p>

          </div>

          <div className="gap-5 grid grid-cols-2 md:grid-cols-3">

            {categories.map((cat) => (
              <div
                key={cat.name}
                className="group bg-white/[0.04] p-6 border border-white/10 hover:border-indigo-500/40 rounded-3xl transition-all hover:-translate-y-2 duration-300"
              >

                <div className="mb-5 text-5xl">
                  {cat.emoji}
                </div>

                <h3 className="font-bold text-lg">
                  {cat.name}
                </h3>

                <p className="mt-2 text-slate-400 text-sm">
                  {cat.count} Products
                </p>

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* FEATURED PRODUCTS */}
      <section className="bg-[#0f172a] px-6 py-24">

        <div className="mx-auto max-w-7xl">

          <div className="mb-14 text-center">

            <p className="mb-4 font-bold text-indigo-400 text-xs uppercase tracking-[0.3em]">
              Featured
            </p>

            <h2 className="font-black text-4xl md:text-5xl">
              Trending Products
            </h2>

          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">

            {["All", "Electronics", "Sports", "Beauty", "Fashion"].map(
              (item) => (
                <button
                  key={item}
                  onClick={() => setActiveCategory(item)}
                  className={`px-5 py-2 rounded-2xl text-sm font-bold transition-all
                    ${
                      activeCategory === item
                        ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                        : "bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10"
                    }
                  `}
                >
                  {item}
                </button>
              )
            )}

          </div>

          {/* Products */}
          <div className="gap-6 grid md:grid-cols-2 lg:grid-cols-3">

            {filteredProducts.map((product) => (
              <div
                key={product.name}
                className="group bg-white/[0.04] border border-white/10 hover:border-indigo-500/40 rounded-3xl overflow-hidden transition-all hover:-translate-y-2 duration-300"
              >

                <div className="flex justify-center items-center bg-gradient-to-br from-slate-900 to-slate-800 h-52 text-7xl">
                  {product.emoji}
                </div>

                <div className="p-6">

                  <div className="flex justify-between items-center mb-3">

                    <span className="bg-indigo-500/10 px-3 py-1 border border-indigo-500/20 rounded-full font-bold text-indigo-300 text-xs">
                      {product.category}
                    </span>

                    <span className="font-black text-indigo-400">
                      {product.price}
                    </span>

                  </div>

                  <h3 className="font-bold text-xl">
                    {product.name}
                  </h3>

                  <p className="flex items-center gap-2 mt-3 text-slate-400 text-sm">
                    <Store size={14} />
                    {product.seller}
                  </p>

                </div>

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* VALUES */}
      <section className="px-6 py-24">

        <div className="mx-auto max-w-7xl">

          <div className="mb-14 text-center">

            <p className="mb-4 font-bold text-indigo-400 text-xs uppercase tracking-[0.3em]">
              Why Choose Us
            </p>

            <h2 className="font-black text-4xl md:text-5xl">
              Friendly Mart Experience
            </h2>

          </div>

          <div className="gap-6 grid md:grid-cols-2 lg:grid-cols-3">

            {values.map((value) => (
              <div
                key={value.title}
                className="bg-white/[0.04] p-7 border border-white/10 hover:border-indigo-500/40 rounded-3xl transition-all hover:-translate-y-2 duration-300"
              >

                <div className="flex justify-center items-center bg-gradient-to-br from-indigo-500 to-purple-600 mb-6 rounded-2xl w-14 h-14">
                  <value.icon size={24} />
                </div>

                <h3 className="font-bold text-xl">
                  {value.title}
                </h3>

                <p className="mt-3 text-slate-400 text-sm leading-relaxed">
                  {value.desc}
                </p>

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="relative px-6 py-28 overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-700" />

        <div className="relative mx-auto max-w-4xl text-center">

          <ShoppingBag
            size={52}
            className="mx-auto mb-6 text-indigo-200"
          />

          <h2 className="font-black text-4xl md:text-5xl">
            Ready To Shop?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-indigo-100 text-lg leading-relaxed">
            Join Friendly Mart today and explore premium products from
            trusted sellers across Bangladesh.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-10">

            <Link
              href="/register/customer"
              className="bg-white hover:bg-indigo-50 shadow-2xl px-8 py-4 rounded-2xl font-black text-indigo-700 transition-all duration-300"
            >
              Create Account
            </Link>

            <Link
              href="/products"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md px-8 py-4 border border-white/20 rounded-2xl font-bold text-white transition-all duration-300"
            >
              Browse Products
            </Link>

          </div>

        </div>

      </section>

    </div>
  );
}