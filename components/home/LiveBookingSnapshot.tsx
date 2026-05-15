"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const snapSlots = [
  { time: "6:00 AM", status: "available", price: 600 },
  { time: "7:00 AM", status: "booked", price: 600 },
  { time: "8:00 AM", status: "booked", price: 800 },
  { time: "9:00 AM", status: "available", price: 800 },
  { time: "12:00 PM", status: "booked", price: 800 },
  { time: "6:00 PM", status: "available", price: 1200, peak: true },
  { time: "7:00 PM", status: "just_booked", price: 1200, peak: true },
  { time: "8:00 PM", status: "available", price: 1200, peak: true },
  { time: "9:00 PM", status: "booked", price: 1500, peak: true },
  { time: "10:00 PM", status: "available", price: 1500 },
  { time: "11:00 PM", status: "available", price: 1500 },
  { time: "12:00 AM", status: "available", price: 1500 },
];

const statusConfig = {
  available: { bg: "bg-[#00FF87]/5 border-[#00FF87]/40", text: "text-[#00FF87]", label: "Available" },
  booked: { bg: "bg-red-500/5 border-red-500/30", text: "text-red-400", label: "Booked" },
  just_booked: { bg: "bg-yellow-400/10 border-yellow-400/40", text: "text-yellow-400", label: "Just Booked" },
};

export default function LiveBookingSnapshot() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-16 md:py-20 px-4 bg-[#0D0D0D]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <div>
            <span className="text-[#00FF87] text-xs font-bold tracking-widest uppercase">Live Availability</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mt-1 uppercase" style={{ fontFamily: "Impact, sans-serif" }}>
              TODAY'S SLOTS
            </h2>
            <p className="text-gray-400 mt-2">
              <span className="text-[#00FF87] font-bold">47 bookings</span> this week. Don't miss your slot.
            </p>
          </div>
          <Link href="/book" className="inline-block bg-[#00FF87] text-black font-bold px-6 py-3 rounded-xl text-sm hover:bg-[#00e07a] transition-colors shrink-0">
            VIEW ALL SLOTS →
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {snapSlots.map((slot, i) => {
            const cfg = statusConfig[slot.status as keyof typeof statusConfig];
            return (
              <motion.div
                key={slot.time}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                className={`border rounded-xl p-3 ${cfg.bg} ${slot.status === "just_booked" ? "animate-pulse" : ""}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-white text-xs font-bold">{slot.time}</span>
                  {slot.peak && <span className="text-[10px] text-yellow-400 font-bold">🔥 PEAK</span>}
                </div>
                <div className={`text-xs font-semibold ${cfg.text}`}>{cfg.label}</div>
                <div className="text-gray-500 text-xs mt-0.5">₹{slot.price}/hr</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
