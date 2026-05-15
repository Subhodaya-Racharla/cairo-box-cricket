"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Play, ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1624880357913-a8539238245b?w=1600&q=80)",
        }}
      />
      {/* Overlays */}
      <div className="absolute inset-0 bg-black/70" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#0A0A0A]" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />

      {/* Live indicator */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2 }}
        className="absolute top-24 right-4 md:top-28 md:right-8 flex items-center gap-2 bg-black/60 backdrop-blur-md border border-red-500/30 rounded-full px-3 py-1.5"
      >
        <span className="live-dot" />
        <span className="text-red-400 text-xs font-bold tracking-wider">LIVE</span>
        <span className="text-white text-xs">2 matches in progress</span>
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="inline-block bg-[#00FF87]/10 border border-[#00FF87]/30 text-[#00FF87] text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6">
            🏏 Uppal, Hyderabad · Open 24/7
          </span>
        </motion.div>

        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase leading-none tracking-tight mb-6"
          style={{ fontFamily: "Impact, sans-serif" }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
        >
          <span className="block text-white">HYDERABAD'S</span>
          <span className="block gradient-text-green">PREMIUM</span>
          <span className="block text-white">BOX CRICKET ARENA</span>
        </motion.h1>

        <motion.p
          className="text-gray-300 text-lg md:text-xl mb-10 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
        >
          Book your slot in{" "}
          <span className="text-[#00FF87] font-bold">30 seconds.</span>{" "}
          Open 24/7. From ₹600/hr.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <Link
            href="/book"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#00FF87] hover:bg-[#00e07a] text-black font-black px-8 py-4 rounded-xl text-base uppercase tracking-wider transition-all duration-200 shadow-[0_0_30px_rgba(0,255,135,0.4)] hover:shadow-[0_0_50px_rgba(0,255,135,0.6)]"
          >
            BOOK NOW
            <span className="bg-black/20 rounded-full px-2 py-0.5 text-xs font-bold">FREE</span>
          </Link>
          <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/30 hover:border-white/60 text-white font-bold px-8 py-4 rounded-xl text-base uppercase tracking-wider transition-all duration-200 hover:bg-white/5 backdrop-blur-sm">
            <Play size={16} className="fill-white" />
            WATCH TOUR
          </button>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          className="flex items-center justify-center gap-6 mt-12 flex-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {[
            { label: "326+ Reviews", val: "⭐ 3.9" },
            { label: "Open Always", val: "🕐 24/7" },
            { label: "From Only", val: "₹600/hr" },
          ].map(({ label, val }) => (
            <div key={label} className="text-center">
              <div className="text-white font-bold text-sm">{val}</div>
              <div className="text-gray-500 text-xs">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll arrow */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-500"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown size={28} />
      </motion.div>
    </section>
  );
}
