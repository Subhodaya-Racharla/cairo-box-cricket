"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { fakeBookingNotifications } from "@/lib/data";

export default function JustBookedToast() {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const show = () => {
      setCurrent((p) => (p + 1) % fakeBookingNotifications.length);
      setVisible(true);
      setTimeout(() => setVisible(false), 3500);
    };
    const timer = setInterval(show, 45000);
    // first show after 12s
    const first = setTimeout(show, 12000);
    return () => { clearInterval(timer); clearTimeout(first); };
  }, []);

  const notif = fakeBookingNotifications[current];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key={current}
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-24 md:bottom-8 left-4 right-4 md:left-auto md:right-24 md:w-80 z-50 pointer-events-none"
        >
          <div className="bg-[#1A1A1A] border border-[#00FF87]/30 rounded-xl px-4 py-3 flex items-center gap-3 shadow-2xl shadow-black/60">
            <div className="w-8 h-8 rounded-full bg-[#00FF87]/10 border border-[#00FF87]/30 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 size={16} className="text-[#00FF87]" />
            </div>
            <div>
              <p className="text-white text-sm font-semibold">
                🏏 {notif.name} just booked <span className="text-[#00FF87]">{notif.slot}</span>
              </p>
              <p className="text-gray-400 text-xs">{notif.team} · just now</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
