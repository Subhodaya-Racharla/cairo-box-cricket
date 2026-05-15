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

const labelStyles: Record<string, string> = {
  EARLY: "text-sky-400 bg-sky-400/10 border border-sky-400/20",
  DAY:   "text-blue-300 bg-blue-300/10 border border-blue-300/20",
  PEAK:  "text-yellow-400 bg-yellow-400/10 border border-yellow-400/20",
  NIGHT: "text-purple-400 bg-purple-400/10 border border-purple-400/20",
};

export default function SlotGrid({ dayIndex, onSlotClick, justBookedId }: Props) {
  const [slots, setSlots] = useState<Slot[]>(() => generateSlots(dayIndex));

  useEffect(() => { setSlots(generateSlots(dayIndex)); }, [dayIndex]);

  // Live animation: one available slot → just_booked every 30s
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

  const getClass = (slot: Slot) => {
    if (slot.id === justBookedId) return "slot-live";
    if (slot.status === "just_booked") return "slot-live";
    if (slot.status === "booked") return "slot-booked";
    if (slot.isPeak) return "slot-peak";
    return "slot-available";
  };

  const canClick = (slot: Slot) => slot.status === "available" || slot.status === "just_booked";

  return (
    <div className="space-y-2">
      {slots.map((slot, i) => (
        <motion.div
          key={slot.id}
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.016, duration: 0.28, ease: "easeOut" }}
          onClick={() => canClick(slot) && onSlotClick(slot)}
          tabIndex={canClick(slot) ? 0 : undefined}
          role={canClick(slot) ? "button" : undefined}
          onKeyDown={(e) => e.key === "Enter" && canClick(slot) && onSlotClick(slot)}
          className={`rounded-xl px-4 py-3.5 flex items-center gap-4 ${getClass(slot)}`}
        >
          {/* Time + label */}
          <div className="min-w-[110px] md:min-w-[140px]">
            <div className="text-white font-semibold text-sm leading-tight">{slot.timeLabel}</div>
            <span className={`inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-md ${labelStyles[slot.label] || "text-gray-500"}`}>
              {slot.label}
            </span>
          </div>

          {/* Price */}
          <div className="hidden sm:flex items-end gap-0.5 flex-1">
            <span className="text-white font-bold text-base">₹{slot.price}</span>
            <span className="text-gray-500 text-xs pb-0.5">/hr</span>
          </div>

          {/* Viewers */}
          {slot.viewers > 0 && slot.status === "available" && (
            <div className="hidden md:flex items-center gap-1.5 text-[11px] text-orange-400 bg-orange-400/10 border border-orange-400/20 rounded-full px-2.5 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
              {slot.viewers} viewing
            </div>
          )}

          {/* Peak tag */}
          {slot.isPeak && slot.status !== "booked" && (
            <span className="flex-shrink-0 text-[10px] font-black text-yellow-400 bg-yellow-400/10 border border-yellow-400/25 rounded-full px-2.5 py-1">
              🔥 PEAK
            </span>
          )}

          {/* Status chip */}
          <div className="ml-auto flex-shrink-0">
            {slot.status === "booked" && (
              <span className="text-[11px] text-red-400 font-bold bg-red-500/10 border border-red-500/20 rounded-full px-3 py-1">
                BOOKED
              </span>
            )}
            {slot.status === "just_booked" && (
              <span className="text-[11px] text-yellow-400 font-bold bg-yellow-400/10 border border-yellow-400/25 rounded-full px-3 py-1">
                JUST BOOKED
              </span>
            )}
            {slot.status === "available" && (
              <span className="text-[11px] text-[#00FF87] font-bold bg-[#00FF87]/10 border border-[#00FF87]/25 rounded-full px-3 py-1">
                BOOK →
              </span>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
