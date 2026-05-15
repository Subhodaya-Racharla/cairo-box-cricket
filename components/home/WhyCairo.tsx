"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Zap, Sun, Car, Package } from "lucide-react";
import { whyCairoFeatures } from "@/lib/data";

const iconMap: Record<string, React.ElementType> = { Zap, Sun, Car, Package };
const colorMap: Record<string, string> = {
  green: "text-[#00FF87] bg-[#00FF87]/10 border-[#00FF87]/20",
  yellow: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  blue: "text-[#00B4FF] bg-[#00B4FF]/10 border-[#00B4FF]/20",
  purple: "text-purple-400 bg-purple-400/10 border-purple-400/20",
};

export default function WhyCairo() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-16 md:py-24 px-4 max-w-7xl mx-auto">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <span className="text-[#00FF87] text-xs font-bold tracking-widest uppercase">Why Choose Us</span>
        <h2
          className="text-4xl md:text-5xl font-black text-white mt-2 uppercase"
          style={{ fontFamily: "Impact, sans-serif" }}
        >
          THE CAIRO DIFFERENCE
        </h2>
        <p className="text-gray-400 mt-3 max-w-xl mx-auto">
          We're not just a cricket ground — we're where Hyderabad comes to play seriously.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {whyCairoFeatures.map((f, i) => {
          const Icon = iconMap[f.icon] || Zap;
          const cls = colorMap[f.color];
          return (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#3A3A3A] rounded-2xl p-6 card-hover group cursor-default"
            >
              <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-4 ${cls}`}>
                <Icon size={22} />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
