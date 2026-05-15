"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* --- Background stack --- */}
      {/* 1. Photo */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ backgroundImage: "url(https://images.unsplash.com/photo-1624880357913-a8539238245b?w=1600&q=85)" }}
      />
      {/* 2. Dark overlay */}
      <div className="absolute inset-0 bg-black/65" />
      {/* 3. Gradient vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-[#0A0A0A]" />
      {/* 4. Subtle green glow from bottom-left */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[400px] rounded-full bg-[#00FF87]/8 blur-[120px] pointer-events-none" />
      {/* 5. Subtle blue glow from top-right */}
      <div className="absolute top-0 right-0 w-[500px] h-[400px] rounded-full bg-[#00B4FF]/6 blur-[140px] pointer-events-none" />

      {/* --- Live indicator pill --- */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.5 }}
        className="absolute top-24 right-4 md:top-28 md:right-8 flex items-center gap-2 bg-black/50 backdrop-blur-md border border-red-500/25 rounded-full px-3 py-1.5"
      >
        <span className="live-dot" />
        <span className="text-red-400 text-[11px] font-bold tracking-widest">LIVE</span>
        <span className="text-gray-300 text-[11px]">2 matches now</span>
      </motion.div>

      {/* --- Main content --- */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">

        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-7"
        >
          <span className="inline-flex items-center gap-2 border border-[#00FF87]/30 bg-[#00FF87]/8 text-[#00FF87] text-[11px] font-bold tracking-[0.2em] uppercase px-5 py-2 rounded-full backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF87] animate-pulse" />
            Uppal, Hyderabad · Open 24 hours
          </span>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.35 }}
        >
          <h1 className="text-[clamp(3rem,10vw,7rem)] leading-none tracking-wide text-white mb-6"
            style={{ fontFamily: "var(--font-bebas), Impact, sans-serif" }}>
            <span className="block">HYDERABAD'S</span>
            <span className="block text-gradient-green" style={{ lineHeight: 1.05 }}>PREMIUM</span>
            <span className="block">BOX CRICKET ARENA</span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="text-gray-300 text-lg md:text-xl mb-10 max-w-lg mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.55 }}
        >
          Book your slot in <span className="text-[#00FF87] font-bold">30 seconds.</span>{" "}
          Floodlit nights, premium turf, zero hassle.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.7 }}
        >
          <Link href="/book" className="btn-neon w-full sm:w-auto inline-flex items-center justify-center gap-3 px-9 py-4 text-[15px]">
            🏏 BOOK NOW — FREE
          </Link>
          <button className="btn-outline w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-[15px] backdrop-blur-sm">
            ▶ &nbsp;WATCH TOUR
          </button>
        </motion.div>

        {/* Trust row */}
        <motion.div
          className="mt-14 flex items-center justify-center gap-8 flex-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
        >
          {[
            { icon: "⭐", val: "3.9/5", sub: "326 Reviews" },
            { icon: "🕐", val: "24/7", sub: "Always Open" },
            { icon: "💰", val: "₹600", sub: "Starting price/hr" },
          ].map(({ icon, val, sub }) => (
            <div key={val} className="flex items-center gap-2.5">
              <span className="text-xl">{icon}</span>
              <div>
                <div className="text-white font-bold text-sm leading-tight">{val}</div>
                <div className="text-gray-500 text-[11px]">{sub}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-500"
        animate={{ y: [0, 7, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-[10px] tracking-widest uppercase">Scroll</span>
        <ChevronDown size={18} />
      </motion.div>
    </section>
  );
}
