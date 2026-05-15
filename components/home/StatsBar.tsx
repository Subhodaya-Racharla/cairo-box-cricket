"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 10000, suffix: "+", label: "Matches Played", prefix: "", icon: "🏏" },
  { value: 326, suffix: "+", label: "5-Star Reviews", prefix: "", icon: "⭐" },
  { value: 24, suffix: "/7", label: "Always Open", prefix: "", icon: "🕐" },
  { value: 500, suffix: "", label: "Starting From /hr", prefix: "₹", icon: "💰" },
];

function Counter({ value, prefix, suffix, started }: { value: number; prefix: string; suffix: string; started: boolean }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!started) return;
    let cur = 0;
    const steps = 60, dur = 1800;
    const inc = value / steps;
    const t = setInterval(() => {
      cur += inc;
      if (cur >= value) { setN(value); clearInterval(t); }
      else setN(Math.floor(cur));
    }, dur / steps);
    return () => clearInterval(t);
  }, [started, value]);
  return <>{prefix}{n.toLocaleString("en-IN")}{suffix}</>;
}

export default function StatsBar() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} style={{ background: "#0D0F14", borderTop: "1px solid #1A1D26", borderBottom: "1px solid #1A1D26", padding: "40px 16px", position: "relative", overflow: "hidden" }}>
      {/* Top accent line */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(0,255,135,.4), transparent)" }} />

      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "32px 16px" }}
          className="md:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              style={{ textAlign: "center", position: "relative", padding: "0 12px" }}
            >
              {/* Divider */}
              {i > 0 && <div style={{ display: "none" }} className="hidden md:block" />}

              <div style={{ fontSize: 26, marginBottom: 8 }}>{s.icon}</div>
              <div className="text-neon"
                style={{ fontFamily: "var(--font-bebas), Impact, sans-serif", fontSize: "clamp(2.4rem,5vw,3.5rem)", lineHeight: 1, marginBottom: 6 }}>
                <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} started={inView} />
              </div>
              <div style={{ color: "#777", fontSize: 12, letterSpacing: ".04em" }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(0,255,135,.2), transparent)" }} />
    </section>
  );
}
