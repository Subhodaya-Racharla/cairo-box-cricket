"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Zap, Sun, Car, Package } from "lucide-react";
import { whyCairoFeatures } from "@/lib/data";

const iconMap: Record<string, React.ElementType> = { Zap, Sun, Car, Package };

const accents = [
  { icon: "#00FF87", glow: "rgba(0,255,135,.2)",  bg: "rgba(0,255,135,.08)",  border: "rgba(0,255,135,.25)" },
  { icon: "#FFB800", glow: "rgba(255,184,0,.2)",  bg: "rgba(255,184,0,.08)",  border: "rgba(255,184,0,.25)" },
  { icon: "#00B4FF", glow: "rgba(0,180,255,.2)",  bg: "rgba(0,180,255,.08)",  border: "rgba(0,180,255,.25)" },
  { icon: "#C084FC", glow: "rgba(192,132,252,.2)", bg: "rgba(192,132,252,.08)", border: "rgba(192,132,252,.25)" },
];

export default function WhyCairo() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} style={{ padding: "80px 16px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          style={{ textAlign: "center", marginBottom: 56 }}
        >
          <span className="section-label">Why Choose Cairo</span>
          <h2 style={{ fontFamily: "var(--font-bebas), Impact, sans-serif", fontSize: "clamp(2.8rem,6vw,4.5rem)", color: "#fff", lineHeight: 1, display: "block" }}>
            THE CAIRO DIFFERENCE
          </h2>
          <p style={{ color: "#888", marginTop: 14, maxWidth: 500, margin: "14px auto 0", fontSize: 14, lineHeight: 1.7 }}>
            We're not just a cricket ground — we're where Hyderabad comes to play seriously.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 20 }}>
          {whyCairoFeatures.map((f, i) => {
            const Icon = iconMap[f.icon] || Zap;
            const a = accents[i % accents.length];
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                style={{
                  background: "#111318",
                  border: "1px solid #1E2028",
                  borderRadius: 20,
                  padding: "28px 24px",
                  transition: "border-color .2s, transform .2s, box-shadow .2s",
                  cursor: "default",
                }}
                whileHover={{ y: -4, boxShadow: `0 20px 48px rgba(0,0,0,.5), 0 0 40px ${a.glow}`, borderColor: a.border }}
              >
                {/* Icon */}
                <div style={{
                  width: 48, height: 48, borderRadius: 14,
                  background: a.bg, border: `1px solid ${a.border}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: 20,
                }}>
                  <Icon size={22} style={{ color: a.icon }} />
                </div>

                <h3 style={{ color: "#fff", fontWeight: 700, fontSize: 18, marginBottom: 10, lineHeight: 1.3 }}>
                  {f.title}
                </h3>
                <p style={{ color: "#888", fontSize: 14, lineHeight: 1.7 }}>
                  {f.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
