"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import DateSelector from "@/components/booking/DateSelector";
import SlotGrid from "@/components/booking/SlotGrid";
import BookingModal from "@/components/booking/BookingModal";
import Footer from "@/components/layout/Footer";
import { getDates } from "@/lib/data";

interface Slot {
  id: string;
  hour: number;
  timeLabel: string;
  price: number;
  status: string;
  label: string;
  isPeak: boolean;
  viewers: number;
}

export default function BookPage() {
  const [selectedDay, setSelectedDay] = useState(0);
  const [activeSlot, setActiveSlot] = useState<Slot | null>(null);
  const [justBookedId, setJustBookedId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const dates = getDates();

  const handleBooked = (slotId: string) => {
    setJustBookedId(slotId);
    setToast("Slot booked successfully! Check your WhatsApp for confirmation.");
    setTimeout(() => setToast(null), 5000);
  };

  return (
    <>
      <div className="min-h-screen bg-[#0A0A0A] pt-32 pb-24 md:pb-8">
        <div className="max-w-3xl mx-auto px-4">
          {/* Header */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-[#00FF87] text-xs font-bold tracking-widest uppercase">Cairo Box Cricket</span>
            <h1
              className="text-4xl md:text-5xl font-black text-white mt-1 uppercase"
              style={{ fontFamily: "Impact, sans-serif" }}
            >
              BOOK A SLOT
            </h1>
            <p className="text-gray-400 mt-2 text-sm">
              Select a date and available time slot. Instant confirmation.
            </p>
          </motion.div>

          {/* Date Selector */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-3">Select Date</p>
            <DateSelector selected={selectedDay} onSelect={setSelectedDay} />
          </motion.div>

          {/* Selected date label */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-white font-bold text-sm">
              {dates[selectedDay]?.fullDate}
            </p>
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-[#00FF87]/40 border border-[#00FF87]/60" /> Available</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-red-500/30 border border-red-500/40" /> Booked</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-yellow-400/30 border border-yellow-400/40" /> Peak</span>
            </div>
          </div>

          {/* Slot grid */}
          <motion.div
            key={selectedDay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <SlotGrid
              dayIndex={selectedDay}
              onSlotClick={(slot) => setActiveSlot(slot as Slot)}
              justBookedId={justBookedId}
            />
          </motion.div>
        </div>
      </div>

      {/* Booking modal */}
      <BookingModal
        slot={activeSlot}
        dayIndex={selectedDay}
        onClose={() => setActiveSlot(null)}
        onBooked={handleBooked}
      />

      {/* Success toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            className="fixed bottom-20 md:bottom-6 left-4 right-4 md:left-auto md:right-6 md:w-96 z-50"
          >
            <div className="bg-[#1A1A1A] border border-[#00FF87]/40 rounded-xl px-4 py-3 flex items-center gap-3 shadow-2xl">
              <CheckCircle2 size={20} className="text-[#00FF87] flex-shrink-0" />
              <p className="text-white text-sm">{toast}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}
