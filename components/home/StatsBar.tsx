"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 10000, suffix: "+", label: "Matches Played", prefix: "" },
  { value: 326, suffix: "+", label: "5-Star Reviews", prefix: "" },
  { value: 24, suffix: "/7", label: "Always Open", prefix: "" },
  { value: 500, suffix: "", label: "Starting From", prefix: "₹" },
];

function Counter({ value, prefix, suffix, started }: { value: number; prefix: string; suffix: string; started: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;
    const duration = 1800;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) { setCount(value); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, value]);

  return (
    <span>
      {prefix}{count.toLocaleString("en-IN")}{suffix}
    </span>
  );
}

export default function StatsBar() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="bg-[#111111] border-y border-[#2A2A2A] py-8 md:py-10">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-black gradient-text-green mb-1" style={{ fontFamily: "Impact, sans-serif" }}>
                <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} started={inView} />
              </div>
              <div className="text-gray-400 text-sm">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
