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
    <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-hide snap-x">
      {dates.map((d) => {
        const active = selected === d.index;
        return (
          <motion.button
            key={d.index}
            onClick={() => onSelect(d.index)}
            whileTap={{ scale: 0.95 }}
            className={`flex-shrink-0 snap-start flex flex-col items-center justify-center w-16 h-20 rounded-2xl border-2 transition-all duration-200 ${
              active
                ? "bg-[#00FF87] border-[#00FF87] text-black shadow-[0_0_20px_rgba(0,255,135,0.35)]"
                : "bg-[#1A1A1A] border-[#2A2A2A] text-gray-300 hover:border-[#3A3A3A]"
            }`}
          >
            <span className={`text-[10px] font-bold uppercase tracking-widest ${active ? "text-black/60" : "text-gray-500"}`}>
              {d.isToday ? "TODAY" : d.day}
            </span>
            <span className={`text-2xl font-black leading-none ${active ? "text-black" : "text-white"}`}
              style={{ fontFamily: "Impact, sans-serif" }}>
              {d.date}
            </span>
            <span className={`text-[10px] ${active ? "text-black/60" : "text-gray-600"}`}>{d.month}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
