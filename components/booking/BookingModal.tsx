"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Check, Loader2 } from "lucide-react";
import { equipmentAddOns, businessInfo, getDates } from "@/lib/data";

interface Slot {
  id: string;
  hour: number;
  timeLabel: string;
  price: number;
  status: string;
  label: string;
  isPeak: boolean;
}

interface Props {
  slot: Slot | null;
  dayIndex: number;
  onClose: () => void;
  onBooked: (slotId: string) => void;
}

type Stage = "details" | "payment" | "success";

function ConfettiPiece({ color, delay }: { color: string; delay: number }) {
  const x = (Math.random() - 0.5) * 400;
  return (
    <motion.div
      className="absolute top-1/2 left-1/2 w-2.5 h-2.5 rounded-sm"
      style={{ background: color }}
      initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
      animate={{ x, y: 300 + Math.random() * 200, rotate: 720, opacity: 0 }}
      transition={{ duration: 1.2, delay, ease: "easeOut" }}
    />
  );
}

const CONFETTI_COLORS = ["#00FF87", "#00B4FF", "#FFB800", "#FF6B6B", "#A78BFA"];

export default function BookingModal({ slot, dayIndex, onClose, onBooked }: Props) {
  const [players, setPlayers] = useState(6);
  const [addOns, setAddOns] = useState<string[]>([]);
  const [stage, setStage] = useState<Stage>("details");
  const [bookingId, setBookingId] = useState("");
  const [confetti, setConfetti] = useState(false);

  const dates = getDates();
  const dateInfo = dates[dayIndex];

  useEffect(() => {
    if (stage === "details") { setAddOns([]); setPlayers(6); setConfetti(false); }
  }, [slot]);

  if (!slot) return null;

  const addOnTotal = addOns.reduce((sum, id) => {
    const a = equipmentAddOns.find((e) => e.id === id);
    return sum + (a?.price ?? 0);
  }, 0);
  const total = slot.price + addOnTotal;

  const toggleAddOn = (id: string) =>
    setAddOns((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  const handlePayOnline = () => {
    setStage("payment");
    setTimeout(() => {
      const id = "CBC" + Math.floor(100000 + Math.random() * 900000);
      setBookingId(id);
      setStage("success");
      setConfetti(true);
      onBooked(slot.id);
    }, 2200);
  };

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(
      `Hi, I want to book Cairo Box Cricket on ${dateInfo?.fullDate} at ${slot.timeLabel} for ${players} players. Price: ₹${total}. Please confirm.`
    );
    window.open(`https://wa.me/${businessInfo.whatsapp}?text=${msg}`, "_blank");
  };

  return (
    <AnimatePresence>
      {slot && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={stage !== "payment" ? onClose : undefined}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-50 flex flex-col bg-[#111111] md:rounded-2xl md:border md:border-[#2A2A2A] md:w-full md:max-w-md md:max-h-[90vh] overflow-y-auto shadow-2xl"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-[#2A2A2A] sticky top-0 bg-[#111111] z-10">
              <div>
                <h2 className="text-white font-bold text-lg">
                  {stage === "success" ? "Booking Confirmed! 🎉" : "Book This Slot"}
                </h2>
                <p className="text-gray-500 text-xs mt-0.5">{dateInfo?.fullDate}</p>
              </div>
              {stage !== "payment" && (
                <button onClick={onClose} className="w-8 h-8 rounded-full bg-[#2A2A2A] flex items-center justify-center hover:bg-[#3A3A3A] transition-colors">
                  <X size={15} />
                </button>
              )}
            </div>

            <div className="p-5 flex-1 overflow-y-auto">
              {/* ---- DETAILS STAGE ---- */}
              {stage === "details" && (
                <div className="space-y-6">
                  {/* Slot summary */}
                  <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white font-bold">{slot.timeLabel}</div>
                        <div className="text-gray-500 text-xs mt-0.5">{slot.isPeak ? "🔥 Peak Hours" : slot.label + " Slot"}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[#00FF87] font-black text-2xl" style={{ fontFamily: "Impact, sans-serif" }}>₹{slot.price}</div>
                        <div className="text-gray-500 text-xs">/hr</div>
                      </div>
                    </div>
                  </div>

                  {/* Player count */}
                  <div>
                    <label className="text-white font-semibold text-sm block mb-3">Number of Players</label>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setPlayers((p) => Math.max(4, p - 1))}
                        className="w-10 h-10 rounded-full bg-[#2A2A2A] hover:bg-[#3A3A3A] flex items-center justify-center transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="text-white font-black text-3xl min-w-[40px] text-center" style={{ fontFamily: "Impact, sans-serif" }}>{players}</span>
                      <button
                        onClick={() => setPlayers((p) => Math.min(12, p + 1))}
                        className="w-10 h-10 rounded-full bg-[#2A2A2A] hover:bg-[#3A3A3A] flex items-center justify-center transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                      <span className="text-gray-500 text-sm">players (max 12)</span>
                    </div>
                  </div>

                  {/* Add-ons */}
                  <div>
                    <label className="text-white font-semibold text-sm block mb-3">Add-ons (Optional)</label>
                    <div className="space-y-2">
                      {equipmentAddOns.map((addon) => {
                        const checked = addOns.includes(addon.id);
                        return (
                          <label
                            key={addon.id}
                            className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                              checked
                                ? "border-[#00FF87]/50 bg-[#00FF87]/5"
                                : "border-[#2A2A2A] bg-[#1A1A1A] hover:border-[#3A3A3A]"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                                checked ? "bg-[#00FF87] border-[#00FF87]" : "border-[#3A3A3A]"
                              }`}>
                                {checked && <Check size={11} className="text-black" />}
                              </div>
                              <span className="text-gray-200 text-sm">{addon.name}</span>
                            </div>
                            <span className="text-gray-400 text-sm font-semibold">+₹{addon.price}</span>
                            <input type="checkbox" className="hidden" checked={checked} onChange={() => toggleAddOn(addon.id)} />
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Total */}
                  <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-4">
                    <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                      <span>Slot (1 hour)</span><span>₹{slot.price}</span>
                    </div>
                    {addOnTotal > 0 && (
                      <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                        <span>Add-ons</span><span>₹{addOnTotal}</span>
                      </div>
                    )}
                    <div className="border-t border-[#2A2A2A] pt-2 flex items-center justify-between">
                      <span className="text-white font-bold">Total</span>
                      <span className="text-[#00FF87] font-black text-xl" style={{ fontFamily: "Impact, sans-serif" }}>₹{total}</span>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="space-y-3">
                    <button
                      onClick={handlePayOnline}
                      className="w-full bg-[#00FF87] hover:bg-[#00e07a] text-black font-black py-4 rounded-xl text-sm uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(0,255,135,0.3)]"
                    >
                      BOOK & PAY ONLINE — ₹{total}
                    </button>
                    <button
                      onClick={handleWhatsApp}
                      className="w-full border border-[#25D366]/50 hover:bg-[#25D366]/10 text-white font-bold py-4 rounded-xl text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                    >
                      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#25D366]">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      BOOK VIA WHATSAPP
                    </button>
                  </div>
                </div>
              )}

              {/* ---- PAYMENT STAGE ---- */}
              {stage === "payment" && (
                <div className="flex flex-col items-center justify-center py-16 gap-6">
                  <div className="w-20 h-20 rounded-full border-4 border-[#00FF87]/30 border-t-[#00FF87] flex items-center justify-center">
                    <Loader2 size={36} className="text-[#00FF87] animate-spin" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-white font-bold text-lg">Processing Payment</h3>
                    <p className="text-gray-400 text-sm mt-1">Connecting to payment gateway...</p>
                  </div>
                  {/* Fake Razorpay UI */}
                  <div className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-4 space-y-3">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <div className="w-8 h-5 bg-[#2A2A2A] rounded shimmer" />
                      <span>Razorpay Secure Payment</span>
                    </div>
                    <div className="h-10 bg-[#2A2A2A] rounded-lg shimmer" />
                    <div className="grid grid-cols-2 gap-2">
                      <div className="h-10 bg-[#2A2A2A] rounded-lg shimmer" />
                      <div className="h-10 bg-[#2A2A2A] rounded-lg shimmer" />
                    </div>
                  </div>
                </div>
              )}

              {/* ---- SUCCESS STAGE ---- */}
              {stage === "success" && (
                <div className="relative">
                  {/* Confetti */}
                  {confetti && (
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                      {Array.from({ length: 24 }).map((_, i) => (
                        <ConfettiPiece
                          key={i}
                          color={CONFETTI_COLORS[i % CONFETTI_COLORS.length]}
                          delay={i * 0.04}
                        />
                      ))}
                    </div>
                  )}

                  <div className="flex flex-col items-center py-8 gap-6 relative z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                      className="w-20 h-20 rounded-full bg-[#00FF87]/20 border-2 border-[#00FF87] flex items-center justify-center shadow-[0_0_30px_rgba(0,255,135,0.4)]"
                    >
                      <Check size={36} className="text-[#00FF87]" />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-center"
                    >
                      <h3 className="text-white font-black text-2xl">Booking Confirmed!</h3>
                      <p className="text-gray-400 text-sm mt-1">See you on the pitch 🏏</p>
                    </motion.div>

                    {/* Booking card */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="w-full bg-[#1A1A1A] border border-[#00FF87]/20 rounded-2xl p-5 space-y-3"
                    >
                      <div className="flex items-center justify-between text-xs text-gray-500 uppercase tracking-wider">
                        <span>Booking ID</span>
                        <span className="text-[#00FF87] font-bold">{bookingId}</span>
                      </div>
                      <div className="border-t border-[#2A2A2A] pt-3 space-y-2">
                        {[
                          { l: "Ground", v: "Cairo Box Cricket" },
                          { l: "Date", v: dateInfo?.fullDate ?? "" },
                          { l: "Time", v: slot.timeLabel },
                          { l: "Players", v: String(players) },
                          { l: "Amount Paid", v: `₹${total}` },
                        ].map(({ l, v }) => (
                          <div key={l} className="flex items-center justify-between text-sm">
                            <span className="text-gray-500">{l}</span>
                            <span className="text-white font-semibold">{v}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>

                    {/* WhatsApp confirmation card */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                      className="w-full bg-[#25D366]/10 border border-[#25D366]/30 rounded-2xl p-4"
                    >
                      <div className="flex items-start gap-3">
                        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#25D366] flex-shrink-0 mt-0.5">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        <div>
                          <p className="text-[#25D366] font-bold text-sm">WhatsApp Confirmation Sent</p>
                          <p className="text-gray-300 text-xs mt-1 italic">
                            "Booking confirmed! See you on the pitch. Slot: {slot.timeLabel} on {dateInfo?.shortDate}. Booking ID: {bookingId}. — Cairo Box Cricket 🏏"
                          </p>
                        </div>
                      </div>
                    </motion.div>

                    <button
                      onClick={onClose}
                      className="w-full bg-[#1A1A1A] hover:bg-[#2A2A2A] border border-[#2A2A2A] text-gray-300 font-bold py-3 rounded-xl text-sm transition-colors"
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
