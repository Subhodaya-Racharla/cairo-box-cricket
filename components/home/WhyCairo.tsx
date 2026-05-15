"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Zap, Sun, Car, Package } from "lucide-react";
import { whyCairoFeatures } from "@/lib/data";

const iconMap: Record<string, React.ElementType> = { Zap, Sun, Car, Package };
const colorMap: Record<string, { icon: string; glow: string; border: string; bg: string }> = {
  green:  { icon: "text-[#00FF87]", glow: "shadow-[0_0_30px_rgba(0,255,135,0.15)]",  border: "border-[#00FF87]/20", bg: "bg-[#00FF87]/8" },
  yellow: { icon: "text-yellow-400", glow: "shadow-[0_0_30px_rgba(255,184,0,0.15)]", border: "border-yellow-400/20", bg: "bg-yellow-400/8" },
  blue:   { icon: "text-[#00B4FF]",  glow: "shadow-[0_0_30px_rgba(0,180,255,0.15)]", border: "border-[#00B4FF]/20", bg: "bg-[#00B4FF]/8" },
  purple: { icon: "text-purple-400", glow: "shadow-[0_0_30px_rgba(168,85,247,0.15)]",border: "border-purple-400/20", bg: "bg-purple-400/8" },
};

export default function WhyCairo() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-20 md:py-28 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
        >
          <p className="text-[#00FF87] text-[11px] font-bold tracking-[0.25em] uppercase mb-3">Why Choose Cairo</p>
          <h2 className="text-5xl md:text-6xl text-white" style={{ fontFamily: "var(--font-bebas), Impact, sans-serif" }}>
            THE CAIRO DIFFERENCE
          </h2>
          <p className="text-gray-400 mt-4 max-w-lg mx-auto text-sm leading-relaxed">
            We're not just a cricket ground — we're where Hyderabad comes to play seriously.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {whyCairoFeatures.map((f, i) => {
            const Icon = iconMap[f.icon] || Zap;
            const col = colorMap[f.color];
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`relative group rounded-2xl p-6 bg-[#111111] border ${col.border} card-lift overflow-hidden`}
              >
                {/* Background glow on hover */}
                <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${col.glow} bg-transparent`} />

                <div className={`relative w-12 h-12 rounded-xl ${col.bg} border ${col.border} flex items-center justify-center mb-5`}>
                  <Icon size={22} className={col.icon} />
                </div>
                <h3 className="relative text-white font-bold text-lg mb-2 leading-snug">{f.title}</h3>
                <p className="relative text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
