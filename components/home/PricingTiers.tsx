"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Check, Sun, Calendar, Zap } from "lucide-react";
import { pricingTiers } from "@/lib/data";

const iconMap: Record<string, React.ElementType> = { sun: Sun, calendar: Calendar, zap: Zap };

export default function PricingTiers() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-16 md:py-24 px-4 max-w-7xl mx-auto">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
      >
        <span className="text-[#00FF87] text-xs font-bold tracking-widest uppercase">Transparent Pricing</span>
        <h2 className="text-4xl md:text-5xl font-black text-white mt-2 uppercase" style={{ fontFamily: "Impact, sans-serif" }}>
          SIMPLE PRICING
        </h2>
        <p className="text-gray-400 mt-3">No hidden charges. Pay what you see.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {pricingTiers.map((tier, i) => {
          const Icon = iconMap[tier.icon] || Zap;
          return (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className={`relative rounded-2xl p-6 flex flex-col ${
                tier.popular
                  ? "bg-gradient-to-b from-[#00FF87]/10 to-[#1A1A1A] border-2 border-[#00FF87] shadow-[0_0_40px_rgba(0,255,135,0.15)]"
                  : "bg-[#1A1A1A] border border-[#2A2A2A]"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-[#00FF87] text-black text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest shadow-lg">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                tier.popular ? "bg-[#00FF87]/20 text-[#00FF87]" : "bg-[#2A2A2A] text-gray-400"
              }`}>
                <Icon size={22} />
              </div>

              <h3 className="text-white font-bold text-lg mb-1">{tier.name}</h3>
              <p className="text-gray-500 text-xs mb-4">{tier.hours}</p>

              <div className="mb-6">
                <span className={`text-4xl font-black ${tier.popular ? "text-[#00FF87]" : "text-white"}`}
                  style={{ fontFamily: "Impact, sans-serif" }}>
                  ₹{tier.price}
                </span>
                <span className="text-gray-400 text-sm">/hr</span>
              </div>

              <ul className="space-y-2 mb-8 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-300">
                    <Check size={14} className={tier.popular ? "text-[#00FF87]" : "text-gray-500"} />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href="/book"
                className={`w-full text-center font-bold py-3 rounded-xl text-sm uppercase tracking-wider transition-all ${
                  tier.popular
                    ? "bg-[#00FF87] text-black hover:bg-[#00e07a] shadow-[0_0_20px_rgba(0,255,135,0.3)]"
                    : "bg-[#2A2A2A] text-white hover:bg-[#333] border border-[#3A3A3A]"
                }`}
              >
                Book This Slot
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
