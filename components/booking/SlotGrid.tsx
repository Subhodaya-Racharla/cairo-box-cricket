"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { generateSlots } from "@/lib/data";

interface Slot {
  id: string;
  hour: number;
  timeLabel: string;
  timeStart: string;
  price: number;
  status: string;
  label: string;
  isPeak: boolean;
  viewers: number;
}

interface Props {
  dayIndex: number;
  onSlotClick: (slot: Slot) => void;
  justBookedId: string | null;
}

const labelStyle: Record<string, { color: string; bg: string }> = {
  EARLY: { color: "#38bdf8", bg: "rgba(56,189,248,.15)"  },
  DAY:   { color: "#93c5fd", bg: "rgba(147,197,253,.15)" },
  PEAK:  { color: "#fbbf24", bg: "rgba(251,191,36,.15)"  },
  NIGHT: { color: "#c084fc", bg: "rgba(192,132,252,.15)" },
};

export default function SlotGrid({ dayIndex, onSlotClick, justBookedId }: Props) {
  const [slots, setSlots] = useState<Slot[]>(() => generateSlots(dayIndex));

  useEffect(() => { setSlots(generateSlots(dayIndex)); }, [dayIndex]);

  useEffect(() => {
    const id = setInterval(() => {
      setSlots((prev) => {
        const avail = prev.filter((s) => s.status === "available");
        if (!avail.length) return prev;
        const pick = avail[Math.floor(Math.random() * avail.length)];
        return prev.map((s) => s.id === pick.id ? { ...s, status: "just_booked" } : s);
      });
      setTimeout(() => setSlots((prev) => prev.map((s) => s.status === "just_booked" ? { ...s, status: "booked" } : s)), 4500);
    }, 30000);
    return () => clearInterval(id);
  }, []);

  const canClick = (slot: Slot) => slot.status === "available" || slot.status === "just_booked";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {slots.map((slot, i) => {
        const isLive = slot.id === justBookedId || slot.status === "just_booked";
        const isBooked = slot.status === "booked";

        let bg = "#131720";
        let border = "#1E2232";
        let statusEl = null;

        if (isLive) {
          bg = "rgba(255,184,0,.08)";
          border = "rgba(255,184,0,.5)";
          statusEl = <span style={{ fontSize: 11, color: "#fbbf24", fontWeight: 700, background: "rgba(251,191,36,.12)", border: "1px solid rgba(251,191,36,.3)", borderRadius: 999, padding: "5px 14px", whiteSpace: "nowrap" }}>JUST BOOKED</span>;
        } else if (isBooked) {
          bg = "#0F0E14";
          border = "rgba(248,113,113,.2)";
          statusEl = <span style={{ fontSize: 11, color: "#f87171", fontWeight: 700, background: "rgba(248,113,113,.08)", border: "1px solid rgba(248,113,113,.2)", borderRadius: 999, padding: "5px 14px", whiteSpace: "nowrap" }}>BOOKED</span>;
        } else if (slot.isPeak) {
          bg = "#141208";
          border = "rgba(255,184,0,.35)";
          statusEl = <span style={{ fontSize: 11, color: "#00FF87", fontWeight: 700, background: "rgba(0,255,135,.1)", border: "1px solid rgba(0,255,135,.3)", borderRadius: 999, padding: "5px 14px", whiteSpace: "nowrap" }}>BOOK →</span>;
        } else {
          bg = "#0B1410";
          border = "rgba(0,255,135,.25)";
          statusEl = <span style={{ fontSize: 11, color: "#00FF87", fontWeight: 700, background: "rgba(0,255,135,.1)", border: "1px solid rgba(0,255,135,.3)", borderRadius: 999, padding: "5px 14px", whiteSpace: "nowrap" }}>BOOK →</span>;
        }

        const lc = labelStyle[slot.label] ?? { color: "#888", bg: "rgba(255,255,255,.08)" };

        return (
          <motion.div
            key={slot.id}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.015, duration: 0.25 }}
            onClick={() => canClick(slot) && onSlotClick(slot)}
            style={{
              background: bg,
              border: `1.5px solid ${border}`,
              borderRadius: 14,
              padding: "14px 18px",
              display: "flex",
              alignItems: "center",
              gap: 14,
              cursor: canClick(slot) ? "pointer" : "not-allowed",
              opacity: isBooked ? 0.6 : 1,
              animation: isLive ? "liveSl 2s ease-in-out infinite" : undefined,
              transition: "border-color .18s, background .18s",
            }}
          >
            {/* Time + label inline */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0, flex: "0 0 auto" }}>
              <span style={{ color: isBooked ? "#666" : "#fff", fontWeight: 700, fontSize: 14, whiteSpace: "nowrap" }}>
                {slot.timeLabel}
              </span>
              <span style={{
                fontSize: 10, fontWeight: 700, letterSpacing: "0.05em",
                padding: "2px 7px", borderRadius: 5,
                color: lc.color, background: lc.bg,
                whiteSpace: "nowrap",
              }}>
                {slot.label}
              </span>
            </div>

            {/* Spacer */}
            <div style={{ flex: 1 }} />

            {/* Price */}
            <span style={{ color: isBooked ? "#444" : "#ccc", fontWeight: 600, fontSize: 14, whiteSpace: "nowrap" }}>
              ₹{slot.price}<span style={{ color: "#444", fontSize: 11, fontWeight: 400 }}>/hr</span>
            </span>

            {/* Viewers */}
            {slot.viewers > 0 && !isBooked && (
              <span style={{ fontSize: 11, color: "#fb923c", background: "rgba(251,146,60,.1)", border: "1px solid rgba(251,146,60,.2)", borderRadius: 999, padding: "3px 9px", whiteSpace: "nowrap" }}>
                👁 {slot.viewers}
              </span>
            )}

            {/* Peak badge */}
            {slot.isPeak && !isBooked && (
              <span style={{ fontSize: 10, fontWeight: 800, color: "#fbbf24", background: "rgba(251,191,36,.1)", border: "1px solid rgba(251,191,36,.2)", borderRadius: 999, padding: "3px 9px", whiteSpace: "nowrap" }}>
                🔥 PEAK
              </span>
            )}

            {/* Status */}
            {statusEl}
          </motion.div>
        );
      })}
    </div>
  );
}
