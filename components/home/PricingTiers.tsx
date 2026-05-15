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
    <section ref={ref} className="py-20 md:py-28 px-4 bg-[#0D0D0D] relative overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#00FF87]/4 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <p className="text-[#00FF87] text-[11px] font-bold tracking-[0.25em] uppercase mb-3">Transparent Pricing</p>
          <h2 className="text-5xl md:text-6xl text-white" style={{ fontFamily: "var(--font-bebas), Impact, sans-serif" }}>
            SIMPLE PRICING
          </h2>
          <p className="text-gray-400 mt-4 text-sm">No hidden charges. Pay exactly what you see.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pricingTiers.map((tier, i) => {
            const Icon = iconMap[tier.icon] || Zap;
            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 36 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className={`relative rounded-2xl p-7 flex flex-col overflow-hidden ${
                  tier.popular
                    ? "bg-gradient-to-b from-[#00FF87]/10 to-[#111111] border-2 border-[#00FF87] shadow-[0_0_60px_rgba(0,255,135,0.12)]"
                    : "bg-[#111111] border border-[#222222]"
                }`}
              >
                {tier.popular && (
                  <>
                    {/* Glow top-edge */}
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00FF87] to-transparent" />
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                      <span className="bg-[#00FF87] text-black text-[10px] font-black px-5 py-1.5 rounded-full uppercase tracking-[0.18em] shadow-[0_4px_20px_rgba(0,255,135,0.4)]">
                        MOST POPULAR
                      </span>
                    </div>
                  </>
                )}

                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 ${
                  tier.popular ? "bg-[#00FF87]/15 text-[#00FF87]" : "bg-[#1E1E1E] text-gray-400"
                }`}>
                  <Icon size={20} />
                </div>

                <h3 className="text-white font-bold text-lg mb-1">{tier.name}</h3>
                <p className="text-gray-500 text-xs mb-6 leading-relaxed">{tier.hours}</p>

                <div className="mb-7 flex items-end gap-1">
                  <span
                    className={`text-5xl leading-none font-normal ${tier.popular ? "text-[#00FF87]" : "text-white"}`}
                    style={{ fontFamily: "var(--font-bebas), Impact, sans-serif" }}
                  >
                    ₹{tier.price}
                  </span>
                  <span className="text-gray-500 text-sm pb-1">/hr</span>
                </div>

                <ul className="space-y-2.5 mb-8 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-gray-300">
                      <span className={`flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center ${
                        tier.popular ? "bg-[#00FF87]/15 text-[#00FF87]" : "bg-[#2A2A2A] text-gray-500"
                      }`}>
                        <Check size={10} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/book"
                  className={`w-full text-center font-bold py-3.5 rounded-xl text-sm uppercase tracking-wider transition-all ${
                    tier.popular
                      ? "btn-neon"
                      : "bg-[#1E1E1E] hover:bg-[#2A2A2A] text-gray-200 border border-[#2A2A2A]"
                  }`}
                >
                  Book This Slot
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
