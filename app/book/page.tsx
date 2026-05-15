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
      <div style={{ minHeight: "100vh", background: "#08080A", paddingTop: 128, paddingBottom: 96 }}>
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}>

          {/* Header */}
          <motion.div
            style={{ marginBottom: 36 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span style={{ color: "#00FF87", fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>
              Cairo Box Cricket
            </span>
            <h1 style={{
              fontFamily: "var(--font-bebas), Impact, sans-serif",
              fontSize: "clamp(3rem, 10vw, 5rem)",
              color: "#fff", lineHeight: 1, marginTop: 6, marginBottom: 10, display: "block",
            }}>
              BOOK A SLOT
            </h1>
            <p style={{ color: "#666", fontSize: 14, lineHeight: 1.6 }}>
              Select a date and available time slot. Instant confirmation.
            </p>
          </motion.div>

          {/* Date Selector */}
          <motion.div
            style={{ marginBottom: 32 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <p style={{ color: "#555", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14 }}>
              Select Date
            </p>
            <DateSelector selected={selectedDay} onSelect={setSelectedDay} />
          </motion.div>

          {/* Date label + legend */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
            <p style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>
              {dates[selectedDay]?.fullDate}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 11, color: "#666" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 10, height: 10, borderRadius: 2, background: "rgba(0,255,135,.3)", border: "1px solid rgba(0,255,135,.5)", display: "inline-block" }} />
                Available
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 10, height: 10, borderRadius: 2, background: "rgba(248,113,113,.25)", border: "1px solid rgba(248,113,113,.35)", display: "inline-block" }} />
                Booked
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 10, height: 10, borderRadius: 2, background: "rgba(251,191,36,.25)", border: "1px solid rgba(251,191,36,.35)", display: "inline-block" }} />
                Peak
              </span>
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
            style={{ position: "fixed", bottom: 80, left: 16, right: 16, zIndex: 50 }}
            className="md:bottom-6 md:left-auto md:right-6 md:w-96"
          >
            <div style={{ background: "#1A1D26", border: "1px solid rgba(0,255,135,.35)", borderRadius: 16, padding: "14px 18px", display: "flex", alignItems: "center", gap: 12, boxShadow: "0 8px 32px rgba(0,0,0,.5)" }}>
              <CheckCircle2 size={20} color="#00FF87" style={{ flexShrink: 0 }} />
              <p style={{ color: "#fff", fontSize: 14 }}>{toast}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}
