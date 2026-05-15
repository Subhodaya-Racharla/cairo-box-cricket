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

const labelColors: Record<string, string> = {
  EARLY: "text-blue-400 bg-blue-400/10",
  DAY: "text-sky-400 bg-sky-400/10",
  PEAK: "text-yellow-400 bg-yellow-400/10",
  NIGHT: "text-purple-400 bg-purple-400/10",
};

export default function SlotGrid({ dayIndex, onSlotClick, justBookedId }: Props) {
  const [slots, setSlots] = useState<Slot[]>(() => generateSlots(dayIndex));

  useEffect(() => {
    setSlots(generateSlots(dayIndex));
  }, [dayIndex]);

  // Randomly animate one available slot to "just booked" every 30s
  useEffect(() => {
    const timer = setInterval(() => {
      setSlots((prev) => {
        const available = prev.filter((s) => s.status === "available");
        if (available.length === 0) return prev;
        const pick = available[Math.floor(Math.random() * available.length)];
        return prev.map((s) =>
          s.id === pick.id ? { ...s, status: "just_booked" } : s
        );
      });
      setTimeout(() => {
        setSlots((prev) =>
          prev.map((s) => (s.status === "just_booked" ? { ...s, status: "booked" } : s))
        );
      }, 4000);
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  const getSlotStyle = (slot: Slot) => {
    if (slot.id === justBookedId || slot.status === "just_booked") {
      return "border-yellow-400 bg-yellow-400/10 shadow-[0_0_15px_rgba(255,184,0,0.25)] cursor-default";
    }
    if (slot.status === "booked") {
      return "border-red-500/40 bg-red-500/5 opacity-60 cursor-not-allowed";
    }
    if (slot.isPeak) {
      return "border-yellow-400/50 bg-yellow-400/5 hover:border-yellow-400 hover:bg-yellow-400/10 hover:shadow-[0_0_15px_rgba(255,184,0,0.2)] cursor-pointer transition-all duration-200";
    }
    return "border-[#00FF87]/30 bg-[#00FF87]/5 hover:border-[#00FF87] hover:bg-[#00FF87]/10 hover:shadow-[0_0_15px_rgba(0,255,135,0.2)] hover:-translate-y-0.5 cursor-pointer transition-all duration-200";
  };

  const handleClick = (slot: Slot) => {
    if (slot.status === "available" || slot.status === "just_booked") {
      onSlotClick(slot);
    }
  };

  return (
    <div className="space-y-2">
      {slots.map((slot, i) => (
        <motion.div
          key={slot.id}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.018, duration: 0.3 }}
          onClick={() => handleClick(slot)}
          onKeyDown={(e) => e.key === "Enter" && handleClick(slot)}
          role={slot.status === "available" ? "button" : undefined}
          tabIndex={slot.status === "available" ? 0 : undefined}
          className={`border rounded-xl p-3 md:p-4 flex items-center gap-3 md:gap-4 ${getSlotStyle(slot)}`}
        >
          {/* Time */}
          <div className="min-w-[100px] md:min-w-[130px]">
            <div className="text-white font-bold text-sm">{slot.timeLabel}</div>
            <div className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md inline-block mt-0.5 ${labelColors[slot.label] || "text-gray-400"}`}>
              {slot.label}
            </div>
          </div>

          {/* Price */}
          <div className="hidden sm:block flex-1">
            <span className="text-white font-bold">₹{slot.price}</span>
            <span className="text-gray-500 text-xs">/hr</span>
          </div>

          {/* Viewers badge */}
          {slot.viewers > 0 && slot.status === "available" && (
            <div className="hidden md:flex items-center gap-1 text-xs text-orange-400 bg-orange-400/10 border border-orange-400/20 rounded-full px-2 py-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
              {slot.viewers} viewing
            </div>
          )}

          {/* Peak badge */}
          {slot.isPeak && slot.status !== "booked" && (
            <div className="flex-shrink-0 text-[10px] font-black text-yellow-400 bg-yellow-400/10 border border-yellow-400/20 rounded-full px-2 py-0.5">
              🔥 PEAK
            </div>
          )}

          {/* Status chip */}
          <div className="ml-auto flex-shrink-0">
            {slot.status === "booked" && (
              <span className="text-xs text-red-400 font-bold bg-red-500/10 border border-red-500/20 rounded-full px-3 py-1">
                BOOKED
              </span>
            )}
            {slot.status === "just_booked" && (
              <span className="text-xs text-yellow-400 font-bold bg-yellow-400/10 border border-yellow-400/20 rounded-full px-3 py-1">
                JUST BOOKED
              </span>
            )}
            {slot.status === "available" && (
              <span className="text-xs text-[#00FF87] font-bold bg-[#00FF87]/10 border border-[#00FF87]/20 rounded-full px-3 py-1">
                BOOK →
              </span>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
