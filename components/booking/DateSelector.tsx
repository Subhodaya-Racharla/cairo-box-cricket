"use client";
import { motion } from "framer-motion";
import { getDates } from "@/lib/data";

interface Props {
  selected: number;
  onSelect: (i: number) => void;
}

export default function DateSelector({ selected, onSelect }: Props) {
  const dates = getDates();

  return (
    <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 8 }} className="scrollbar-hide">
      {dates.map((d) => {
        const active = selected === d.index;
        return (
          <motion.button
            key={d.index}
            onClick={() => onSelect(d.index)}
            whileTap={{ scale: 0.95 }}
            style={{
              flexShrink: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: 72,
              height: 86,
              borderRadius: 18,
              border: active ? "2px solid #00FF87" : "2px solid #2A2A2A",
              background: active ? "#00FF87" : "#1A1A1A",
              cursor: "pointer",
              transition: "all 0.18s",
              boxShadow: active ? "0 0 20px rgba(0,255,135,.35)" : "none",
              gap: 2,
            }}
          >
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: active ? "rgba(0,0,0,.6)" : "#666" }}>
              {d.isToday ? "TODAY" : d.day}
            </span>
            <span style={{ fontFamily: "var(--font-bebas), Impact, sans-serif", fontSize: 28, lineHeight: 1, color: active ? "#000" : "#fff" }}>
              {d.date}
            </span>
            <span style={{ fontSize: 10, color: active ? "rgba(0,0,0,.5)" : "#555" }}>{d.month}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
