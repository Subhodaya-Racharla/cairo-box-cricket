"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const snapSlots = [
  { time: "6:00 AM",  status: "available",   price: 600,  peak: false },
  { time: "7:00 AM",  status: "booked",       price: 600,  peak: false },
  { time: "8:00 AM",  status: "booked",       price: 800,  peak: false },
  { time: "9:00 AM",  status: "available",    price: 800,  peak: false },
  { time: "12:00 PM", status: "booked",       price: 800,  peak: false },
  { time: "6:00 PM",  status: "available",    price: 1200, peak: true  },
  { time: "7:00 PM",  status: "just_booked",  price: 1200, peak: true  },
  { time: "8:00 PM",  status: "available",    price: 1200, peak: true  },
  { time: "9:00 PM",  status: "booked",       price: 1500, peak: true  },
  { time: "10:00 PM", status: "available",    price: 1500, peak: false },
  { time: "11:00 PM", status: "available",    price: 1500, peak: false },
  { time: "12:00 AM", status: "available",    price: 1500, peak: false },
];

const statusStyle: Record<string, { bg: string; bdr: string; label: string; labelColor: string }> = {
  available:   { bg: "rgba(0,255,135,.05)",  bdr: "rgba(0,255,135,.3)",  label: "Available",   labelColor: "#00FF87" },
  booked:      { bg: "rgba(255,60,60,.04)",  bdr: "rgba(255,60,60,.2)",  label: "Booked",      labelColor: "#ff5555" },
  just_booked: { bg: "rgba(255,184,0,.07)",  bdr: "rgba(255,184,0,.4)",  label: "Just Booked", labelColor: "#FFB800" },
};

export default function LiveBookingSnapshot() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} style={{ padding: "80px 16px", background: "#08080A" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 16, marginBottom: 36 }}>
          <div>
            <span className="section-label">Live Availability</span>
            <h2 style={{ fontFamily: "var(--font-bebas), Impact, sans-serif", fontSize: "clamp(2.8rem,6vw,4rem)", color: "#fff", display: "block", lineHeight: 1 }}>
              TODAY'S SLOTS
            </h2>
            <p style={{ color: "#888", marginTop: 8, fontSize: 14 }}>
              <span style={{ color: "#00FF87", fontWeight: 700 }}>47 bookings</span> this week. Don't miss your slot.
            </p>
          </div>
          <Link href="/book" className="btn-neon" style={{ fontSize: 13 }}>
            VIEW ALL SLOTS →
          </Link>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))", gap: 10 }}>
          {snapSlots.map((s, i) => {
            const st = statusStyle[s.status];
            return (
              <motion.div key={s.time}
                initial={{ opacity: 0, scale: .95 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: i * 0.05 }}
                style={{
                  background: st.bg,
                  border: `1px solid ${st.bdr}`,
                  borderRadius: 14,
                  padding: "14px 16px",
                  animation: s.status === "just_booked" ? "liveSl 2s ease-in-out infinite" : undefined,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <span style={{ color: "#fff", fontWeight: 700, fontSize: 13 }}>{s.time}</span>
                  {s.peak && <span style={{ fontSize: 10, color: "#FFB800", fontWeight: 700 }}>🔥 PEAK</span>}
                </div>
                <div style={{ color: st.labelColor, fontSize: 12, fontWeight: 700, marginBottom: 3 }}>{st.label}</div>
                <div style={{ color: "#555", fontSize: 11 }}>₹{s.price}/hr</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
