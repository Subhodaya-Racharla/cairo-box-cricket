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

const labelColor: Record<string, { color: string; bg: string; border: string }> = {
  EARLY: { color: "#38bdf8", bg: "rgba(56,189,248,.1)",  border: "rgba(56,189,248,.2)"  },
  DAY:   { color: "#93c5fd", bg: "rgba(147,197,253,.1)", border: "rgba(147,197,253,.2)" },
  PEAK:  { color: "#fbbf24", bg: "rgba(251,191,36,.1)",  border: "rgba(251,191,36,.2)"  },
  NIGHT: { color: "#c084fc", bg: "rgba(192,132,252,.1)", border: "rgba(192,132,252,.2)" },
};

const slotBg: Record<string, { bg: string; border: string; cursor: string; opacity: number }> = {
  available:   { bg: "rgba(0,255,135,.05)",  border: "rgba(0,255,135,.3)",  cursor: "pointer",    opacity: 1   },
  just_booked: { bg: "rgba(255,184,0,.07)",  border: "rgba(255,184,0,.55)", cursor: "pointer",    opacity: 1   },
  booked:      { bg: "rgba(255,60,60,.03)",  border: "rgba(255,60,60,.18)", cursor: "not-allowed", opacity: 0.5 },
};
const peakAvailBg = { bg: "rgba(255,184,0,.05)", border: "rgba(255,184,0,.3)", cursor: "pointer", opacity: 1 };

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
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {slots.map((slot, i) => {
        const isJustBooked = slot.id === justBookedId || slot.status === "just_booked";
        const st = isJustBooked
          ? slotBg.just_booked
          : slot.status === "booked"
          ? slotBg.booked
          : slot.isPeak
          ? peakAvailBg
          : slotBg.available;
        const lc = labelColor[slot.label] ?? { color: "#666", bg: "transparent", border: "transparent" };

        return (
          <motion.div
            key={slot.id}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.016, duration: 0.28, ease: "easeOut" }}
            onClick={() => canClick(slot) && onSlotClick(slot)}
            tabIndex={canClick(slot) ? 0 : undefined}
            role={canClick(slot) ? "button" : undefined}
            onKeyDown={(e) => e.key === "Enter" && canClick(slot) && onSlotClick(slot)}
            style={{
              background: st.bg,
              border: `1.5px solid ${st.border}`,
              borderRadius: 14,
              padding: "16px 20px",
              display: "flex",
              alignItems: "center",
              gap: 16,
              cursor: st.cursor,
              opacity: st.opacity,
              animation: isJustBooked ? "liveSl 2s ease-in-out infinite" : undefined,
              transition: "border-color .18s, background .18s, transform .18s, box-shadow .18s",
            }}
            whileHover={canClick(slot) ? { y: -2, boxShadow: `0 6px 24px ${st.border}` } : undefined}
          >
            {/* Time + label */}
            <div style={{ minWidth: 130 }}>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 14, lineHeight: 1.3 }}>{slot.timeLabel}</div>
              <span style={{
                display: "inline-block", marginTop: 5,
                fontSize: 10, fontWeight: 700, letterSpacing: "0.06em",
                padding: "3px 8px", borderRadius: 6,
                color: lc.color, background: lc.bg, border: `1px solid ${lc.border}`,
              }}>
                {slot.label}
              </span>
            </div>

            {/* Price */}
            <div style={{ display: "flex", alignItems: "flex-end", gap: 2, flex: 1 }}>
              <span style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>₹{slot.price}</span>
              <span style={{ color: "#555", fontSize: 12, paddingBottom: 2 }}>/hr</span>
            </div>

            {/* Viewers badge */}
            {slot.viewers > 0 && slot.status === "available" && (
              <div style={{
                display: "flex", alignItems: "center", gap: 6,
                fontSize: 11, color: "#fb923c",
                background: "rgba(251,146,60,.1)", border: "1px solid rgba(251,146,60,.2)",
                borderRadius: 999, padding: "4px 10px",
              }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#fb923c", display: "inline-block" }} className="animate-pulse" />
                {slot.viewers} viewing
              </div>
            )}

            {/* Peak tag */}
            {slot.isPeak && slot.status !== "booked" && (
              <span style={{
                fontSize: 10, fontWeight: 800, color: "#fbbf24",
                background: "rgba(251,191,36,.1)", border: "1px solid rgba(251,191,36,.25)",
                borderRadius: 999, padding: "4px 10px", flexShrink: 0,
              }}>
                🔥 PEAK
              </span>
            )}

            {/* Status chip */}
            <div style={{ marginLeft: "auto", flexShrink: 0 }}>
              {slot.status === "booked" && (
                <span style={{ fontSize: 11, color: "#f87171", fontWeight: 700, background: "rgba(248,113,113,.1)", border: "1px solid rgba(248,113,113,.2)", borderRadius: 999, padding: "5px 12px" }}>
                  BOOKED
                </span>
              )}
              {isJustBooked && (
                <span style={{ fontSize: 11, color: "#fbbf24", fontWeight: 700, background: "rgba(251,191,36,.1)", border: "1px solid rgba(251,191,36,.25)", borderRadius: 999, padding: "5px 12px" }}>
                  JUST BOOKED
                </span>
              )}
              {slot.status === "available" && (
                <span style={{ fontSize: 11, color: "#00FF87", fontWeight: 700, background: "rgba(0,255,135,.1)", border: "1px solid rgba(0,255,135,.25)", borderRadius: 999, padding: "5px 12px" }}>
                  BOOK →
                </span>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
