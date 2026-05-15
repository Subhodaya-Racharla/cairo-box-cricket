"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Check } from "lucide-react";
import { pricingTiers } from "@/lib/data";

const tierAccent = ["#00B4FF", "#00FF87", "#FFB800"];
const tierBg    = ["rgba(0,180,255,.06)", "rgba(0,255,135,.06)", "rgba(255,184,0,.06)"];
const tierBdr   = ["rgba(0,180,255,.25)", "rgba(0,255,135,.4)",  "rgba(255,184,0,.35)"];

export default function PricingTiers() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} style={{ padding: "80px 16px", position: "relative", overflow: "hidden", background: "#0D0F14" }}>
      {/* Ambient glow */}
      <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 700, height: 280, borderRadius: "50%", background: "rgba(0,255,135,.04)", filter: "blur(80px)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1000, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          style={{ textAlign: "center", marginBottom: 56 }}>
          <span className="section-label">Transparent Pricing</span>
          <h2 style={{ fontFamily: "var(--font-bebas), Impact, sans-serif", fontSize: "clamp(2.8rem,6vw,4.5rem)", color: "#fff", display: "block", lineHeight: 1 }}>
            SIMPLE PRICING
          </h2>
          <p style={{ color: "#888", marginTop: 12, fontSize: 14 }}>No hidden charges. Pay exactly what you see.</p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
          {pricingTiers.map((tier, i) => {
            const accent = tierAccent[i];
            const bg     = tierBg[i];
            const bdr    = tierBdr[i];
            return (
              <motion.div key={tier.id}
                initial={{ opacity: 0, y: 36 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.12 }}
                style={{
                  position: "relative",
                  background: tier.popular ? `linear-gradient(160deg, ${bg} 0%, #111318 60%)` : "#111318",
                  border: `${tier.popular ? "2px" : "1px"} solid ${tier.popular ? bdr : "#1E2028"}`,
                  borderRadius: 22,
                  padding: "32px 28px",
                  display: "flex", flexDirection: "column",
                  boxShadow: tier.popular ? `0 0 60px ${bg}` : "none",
                }}
              >
                {/* Popular badge */}
                {tier.popular && (
                  <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", zIndex: 2 }}>
                    <span style={{
                      background: accent, color: "#000",
                      fontSize: 10, fontWeight: 900,
                      padding: "5px 18px", borderRadius: 999,
                      letterSpacing: ".18em", textTransform: "uppercase",
                      boxShadow: `0 4px 20px rgba(0,255,135,.45)`,
                      whiteSpace: "nowrap",
                    }}>MOST POPULAR</span>
                  </div>
                )}

                {/* Top color accent bar */}
                <div style={{ height: 3, borderRadius: 4, background: `linear-gradient(90deg, ${accent}, transparent)`, marginBottom: 24 }} />

                <div style={{ marginBottom: 6 }}>
                  <h3 style={{ color: "#fff", fontWeight: 700, fontSize: 18, marginBottom: 4 }}>{tier.name}</h3>
                  <p style={{ color: "#666", fontSize: 12 }}>{tier.hours}</p>
                </div>

                <div style={{ margin: "24px 0", display: "flex", alignItems: "flex-end", gap: 4 }}>
                  <span style={{ fontFamily: "var(--font-bebas), Impact, sans-serif", fontSize: 58, lineHeight: 1, color: accent }}>₹{tier.price}</span>
                  <span style={{ color: "#666", fontSize: 13, paddingBottom: 8 }}>/hr</span>
                </div>

                <ul style={{ marginBottom: 28, flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
                  {tier.features.map((f) => (
                    <li key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "#ccc" }}>
                      <span style={{ width: 18, height: 18, borderRadius: "50%", background: `${accent}18`, border: `1px solid ${accent}44`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Check size={10} style={{ color: accent }} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <Link href="/book" style={{
                  display: "block", textAlign: "center",
                  background: tier.popular ? accent : "#1A1D26",
                  color: tier.popular ? "#000" : "#ccc",
                  fontWeight: 700, fontSize: 13, letterSpacing: ".08em",
                  textTransform: "uppercase", padding: "14px",
                  borderRadius: 12,
                  border: tier.popular ? "none" : "1px solid #2A2D38",
                  transition: "opacity .18s",
                  boxShadow: tier.popular ? `0 0 24px ${bg}` : "none",
                }}>
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
