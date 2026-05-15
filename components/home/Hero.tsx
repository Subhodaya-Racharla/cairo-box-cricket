"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* BG photo */}
      <div className="absolute inset-0"
        style={{ backgroundImage: "url(https://images.unsplash.com/photo-1624880357913-a8539238245b?w=1600&q=80)", backgroundSize: "cover", backgroundPosition: "center" }} />
      {/* Dark gradient overlay */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,rgba(0,0,0,.55) 0%,rgba(0,0,0,.62) 50%,#08080A 100%)" }} />
      {/* Neon glow blobs */}
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[300px] rounded-full pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(0,255,135,.09) 0%, transparent 70%)", filter: "blur(40px)" }} />
      <div className="absolute top-0 right-0 w-[400px] h-[350px] rounded-full pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(0,180,255,.07) 0%, transparent 70%)", filter: "blur(60px)" }} />

      {/* Live pill */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
        className="absolute top-24 right-4 md:top-28 md:right-8 flex items-center gap-2 rounded-full px-3 py-1.5"
        style={{ background: "rgba(0,0,0,.55)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,60,60,.25)" }}>
        <span className="live-dot" />
        <span style={{ color: "#ff5555", fontSize: 11, fontWeight: 700, letterSpacing: ".12em" }}>LIVE</span>
        <span style={{ color: "#ccc", fontSize: 11 }}>2 matches in progress</span>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 text-center">

        {/* Eyebrow */}
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .2 }} className="mb-6">
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            border: "1px solid rgba(0,255,135,.3)", background: "rgba(0,255,135,.08)",
            color: "#00FF87", fontSize: 11, fontWeight: 700, letterSpacing: ".2em",
            textTransform: "uppercase", padding: "8px 20px", borderRadius: 999,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00FF87", animation: "ldPulse 1.5s ease-in-out infinite" }} />
            Uppal, Hyderabad &nbsp;·&nbsp; Open 24 Hours
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .35, duration: .65 }}
          style={{ fontFamily: "var(--font-bebas), Impact, sans-serif", fontSize: "clamp(3rem, 10vw, 7.5rem)", lineHeight: 1, letterSpacing: ".03em", marginBottom: 24 }}
        >
          <span style={{ display: "block", color: "#fff" }}>HYDERABAD'S</span>
          <span className="text-neon" style={{ display: "block", lineHeight: 1.05 }}>PREMIUM</span>
          <span style={{ display: "block", color: "#fff" }}>BOX CRICKET ARENA</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .55 }}
          style={{ color: "#bbb", fontSize: "clamp(15px,2.5vw,19px)", marginBottom: 40, maxWidth: 520, margin: "0 auto 40px" }}
        >
          Book your slot in <span style={{ color: "#00FF87", fontWeight: 700 }}>30 seconds.</span>{" "}
          Floodlit nights, premium turf, zero hassle.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .7 }}
          style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", marginBottom: 56 }}
        >
          <Link href="/book" className="btn-neon" style={{ fontSize: 15, padding: "16px 36px" }}>
            🏏 BOOK NOW — FREE
          </Link>
          <button className="btn-ghost" style={{ fontSize: 15, padding: "15px 32px" }}>
            ▶ &nbsp;WATCH TOUR
          </button>
        </motion.div>

        {/* Trust row */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
          style={{ display: "flex", justifyContent: "center", gap: 36, flexWrap: "wrap" }}
        >
          {[["⭐", "3.9 / 5", "326 reviews"], ["🕐", "24 / 7", "Always open"], ["💰", "₹600", "Starting/hr"]].map(([icon, val, sub]) => (
            <div key={val} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 22 }}>{icon}</span>
              <div>
                <div style={{ color: "#fff", fontWeight: 700, fontSize: 14, lineHeight: 1.2 }}>{val}</div>
                <div style={{ color: "#666", fontSize: 11 }}>{sub}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll arrow */}
      <motion.div
        className="absolute bottom-8 left-1/2"
        style={{ transform: "translateX(-50%)", color: "#444", display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}
        animate={{ y: [0, 7, 0] }} transition={{ duration: 2, repeat: Infinity }}
      >
        <span style={{ fontSize: 10, letterSpacing: ".15em", textTransform: "uppercase" }}>Scroll</span>
        <ChevronDown size={18} />
      </motion.div>
    </section>
  );
}
