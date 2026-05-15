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
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start = 0;
    const duration = 1800;
    const steps = 60;
    const inc = value / steps;
    const t = setInterval(() => {
      start += inc;
      if (start >= value) { setCount(value); clearInterval(t); }
      else setCount(Math.floor(start));
    }, duration / steps);
    return () => clearInterval(t);
  }, [started, value]);
  return <>{prefix}{count.toLocaleString("en-IN")}{suffix}</>;
}

export default function StatsBar() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative bg-[#0D0D0D] border-y border-[#1E1E1E] py-10">
      {/* Subtle green top border accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00FF87]/40 to-transparent" />

      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.55, ease: "easeOut" }}
              className="relative text-center group"
            >
              {/* Divider on desktop */}
              {i > 0 && (
                <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 h-10 w-px bg-[#2A2A2A]" />
              )}
              <div className="text-2xl mb-2">{s.icon}</div>
              <div
                className="text-4xl md:text-5xl font-normal text-gradient-green leading-none mb-1.5"
                style={{ fontFamily: "var(--font-bebas), Impact, sans-serif" }}
              >
                <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} started={inView} />
              </div>
              <div className="text-gray-400 text-xs tracking-wide">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00FF87]/20 to-transparent" />
    </section>
  );
}
