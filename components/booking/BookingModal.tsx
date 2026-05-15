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
      style={{ position: "absolute", top: "50%", left: "50%", width: 10, height: 10, borderRadius: 2, background: color }}
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
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.75)", backdropFilter: "blur(6px)", zIndex: 50 }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={stage !== "payment" ? onClose : undefined}
          />

          {/* Modal */}
          <motion.div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 50,
              display: "flex",
              flexDirection: "column",
              background: "#111318",
              overflowY: "auto",
            }}
            className="md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-2xl md:border md:border-[#2A2A2A] md:w-full md:max-w-md md:max-h-[90vh] shadow-2xl"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* ── Header ── */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "22px 24px", borderBottom: "1px solid #222530",
              position: "sticky", top: 0, background: "#111318", zIndex: 10,
            }}>
              <div>
                <h2 style={{ color: "#fff", fontWeight: 700, fontSize: 18, lineHeight: 1.2 }}>
                  {stage === "success" ? "Booking Confirmed! 🎉" : "Book This Slot"}
                </h2>
                <p style={{ color: "#666", fontSize: 12, marginTop: 4 }}>{dateInfo?.fullDate}</p>
              </div>
              {stage !== "payment" && (
                <button onClick={onClose} style={{
                  width: 34, height: 34, borderRadius: "50%", background: "#222530",
                  border: "none", display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", color: "#aaa", flexShrink: 0,
                }}>
                  <X size={15} />
                </button>
              )}
            </div>

            {/* ── Content ── */}
            <div style={{ padding: "24px", flex: 1, overflowY: "auto" }}>

              {/* ──── DETAILS ──── */}
              {stage === "details" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

                  {/* Slot summary */}
                  <div style={{ background: "#1A1D26", border: "1px solid #2A2D38", borderRadius: 16, padding: "20px 22px" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div>
                        <div style={{ color: "#fff", fontWeight: 700, fontSize: 17, marginBottom: 6 }}>{slot.timeLabel}</div>
                        <div style={{ color: "#666", fontSize: 12 }}>{slot.isPeak ? "🔥 Peak Hours" : slot.label + " Slot"}</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontFamily: "var(--font-bebas), Impact, sans-serif", color: "#00FF87", fontSize: 36, lineHeight: 1 }}>₹{slot.price}</div>
                        <div style={{ color: "#555", fontSize: 12, marginTop: 2 }}>/hr</div>
                      </div>
                    </div>
                  </div>

                  {/* Player count */}
                  <div>
                    <p style={{ color: "#fff", fontWeight: 600, fontSize: 14, marginBottom: 14 }}>Number of Players</p>
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                      <button
                        onClick={() => setPlayers((p) => Math.max(4, p - 1))}
                        style={{ width: 42, height: 42, borderRadius: "50%", background: "#1A1D26", border: "1px solid #2A2D38", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#ccc", flexShrink: 0 }}
                      >
                        <Minus size={16} />
                      </button>
                      <span style={{ fontFamily: "var(--font-bebas), Impact, sans-serif", color: "#fff", fontSize: 38, lineHeight: 1, minWidth: 44, textAlign: "center" }}>{players}</span>
                      <button
                        onClick={() => setPlayers((p) => Math.min(12, p + 1))}
                        style={{ width: 42, height: 42, borderRadius: "50%", background: "#1A1D26", border: "1px solid #2A2D38", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#ccc", flexShrink: 0 }}
                      >
                        <Plus size={16} />
                      </button>
                      <span style={{ color: "#666", fontSize: 13 }}>players (max 12)</span>
                    </div>
                  </div>

                  {/* Add-ons */}
                  <div>
                    <p style={{ color: "#fff", fontWeight: 600, fontSize: 14, marginBottom: 14 }}>Add-ons (Optional)</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      {equipmentAddOns.map((addon) => {
                        const checked = addOns.includes(addon.id);
                        return (
                          <label
                            key={addon.id}
                            style={{
                              display: "flex", alignItems: "center", justifyContent: "space-between",
                              padding: "14px 16px", borderRadius: 14, cursor: "pointer",
                              border: checked ? "1.5px solid rgba(0,255,135,.4)" : "1px solid #2A2D38",
                              background: checked ? "rgba(0,255,135,.05)" : "#1A1D26",
                              transition: "border-color .15s, background .15s",
                            }}
                          >
                            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                              <div style={{
                                width: 20, height: 20, borderRadius: 6, flexShrink: 0,
                                border: checked ? "2px solid #00FF87" : "2px solid #3A3D4A",
                                background: checked ? "#00FF87" : "transparent",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                transition: "all .15s",
                              }}>
                                {checked && <Check size={11} color="#000" />}
                              </div>
                              <span style={{ color: checked ? "#fff" : "#ccc", fontSize: 14 }}>{addon.name}</span>
                            </div>
                            <span style={{ color: "#888", fontSize: 14, fontWeight: 600 }}>+₹{addon.price}</span>
                            <input type="checkbox" style={{ display: "none" }} checked={checked} onChange={() => toggleAddOn(addon.id)} />
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Total */}
                  <div style={{ background: "#1A1D26", border: "1px solid #2A2D38", borderRadius: 16, padding: "20px 22px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "#666", marginBottom: 10 }}>
                      <span>Slot (1 hour)</span><span>₹{slot.price}</span>
                    </div>
                    {addOnTotal > 0 && (
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "#666", marginBottom: 10 }}>
                        <span>Add-ons</span><span>₹{addOnTotal}</span>
                      </div>
                    )}
                    <div style={{ borderTop: "1px solid #2A2D38", paddingTop: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>Total</span>
                      <span style={{ fontFamily: "var(--font-bebas), Impact, sans-serif", color: "#00FF87", fontSize: 30, lineHeight: 1 }}>₹{total}</span>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <button
                      onClick={handlePayOnline}
                      style={{
                        width: "100%", background: "#00FF87", color: "#000",
                        fontWeight: 800, fontSize: 14, letterSpacing: "0.08em",
                        textTransform: "uppercase", padding: "17px 24px",
                        borderRadius: 14, border: "none", cursor: "pointer",
                        boxShadow: "0 0 24px rgba(0,255,135,.35)", transition: "background .15s",
                      }}
                    >
                      BOOK & PAY ONLINE — ₹{total}
                    </button>
                    <button
                      onClick={handleWhatsApp}
                      style={{
                        width: "100%", background: "transparent", color: "#fff",
                        fontWeight: 700, fontSize: 14, letterSpacing: "0.06em",
                        textTransform: "uppercase", padding: "16px 24px",
                        borderRadius: 14, border: "1.5px solid rgba(37,211,102,.4)",
                        cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                        transition: "background .15s",
                      }}
                    >
                      <svg viewBox="0 0 24 24" style={{ width: 16, height: 16, fill: "#25D366", flexShrink: 0 }}>
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      BOOK VIA WHATSAPP
                    </button>
                  </div>
                </div>
              )}

              {/* ──── PAYMENT ──── */}
              {stage === "payment" && (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "48px 0", gap: 24 }}>
                  <div style={{ width: 80, height: 80, borderRadius: "50%", border: "4px solid rgba(0,255,135,.25)", borderTopColor: "#00FF87", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Loader2 size={36} color="#00FF87" className="animate-spin" />
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <h3 style={{ color: "#fff", fontWeight: 700, fontSize: 18 }}>Processing Payment</h3>
                    <p style={{ color: "#666", fontSize: 13, marginTop: 6 }}>Connecting to payment gateway...</p>
                  </div>
                  <div style={{ width: "100%", background: "#1A1D26", border: "1px solid #2A2D38", borderRadius: 16, padding: "20px 22px", display: "flex", flexDirection: "column", gap: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "#666" }}>
                      <div style={{ width: 36, height: 20, background: "#2A2D38", borderRadius: 4 }} className="shimmer" />
                      <span>Razorpay Secure Payment</span>
                    </div>
                    <div style={{ height: 40, background: "#2A2D38", borderRadius: 10 }} className="shimmer" />
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                      <div style={{ height: 40, background: "#2A2D38", borderRadius: 10 }} className="shimmer" />
                      <div style={{ height: 40, background: "#2A2D38", borderRadius: 10 }} className="shimmer" />
                    </div>
                  </div>
                </div>
              )}

              {/* ──── SUCCESS ──── */}
              {stage === "success" && (
                <div style={{ position: "relative" }}>
                  {confetti && (
                    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
                      {Array.from({ length: 24 }).map((_, i) => (
                        <ConfettiPiece key={i} color={CONFETTI_COLORS[i % CONFETTI_COLORS.length]} delay={i * 0.04} />
                      ))}
                    </div>
                  )}

                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "32px 0", gap: 24, position: "relative", zIndex: 1 }}>
                    <motion.div
                      initial={{ scale: 0 }} animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                      style={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(0,255,135,.15)", border: "2px solid #00FF87", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 30px rgba(0,255,135,.4)" }}
                    >
                      <Check size={36} color="#00FF87" />
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ textAlign: "center" }}>
                      <h3 style={{ color: "#fff", fontWeight: 800, fontSize: 24 }}>Booking Confirmed!</h3>
                      <p style={{ color: "#666", fontSize: 14, marginTop: 6 }}>See you on the pitch 🏏</p>
                    </motion.div>

                    {/* Booking card */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                      style={{ width: "100%", background: "#1A1D26", border: "1px solid rgba(0,255,135,.2)", borderRadius: 20, padding: "22px" }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#666", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 14 }}>
                        <span>Booking ID</span>
                        <span style={{ color: "#00FF87", fontWeight: 700 }}>{bookingId}</span>
                      </div>
                      <div style={{ borderTop: "1px solid #2A2D38", paddingTop: 16, display: "flex", flexDirection: "column", gap: 12 }}>
                        {[
                          { l: "Ground", v: "Cairo Box Cricket" },
                          { l: "Date", v: dateInfo?.fullDate ?? "" },
                          { l: "Time", v: slot.timeLabel },
                          { l: "Players", v: String(players) },
                          { l: "Amount Paid", v: `₹${total}` },
                        ].map(({ l, v }) => (
                          <div key={l} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 14 }}>
                            <span style={{ color: "#666" }}>{l}</span>
                            <span style={{ color: "#fff", fontWeight: 600 }}>{v}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>

                    {/* WhatsApp confirmation */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
                      style={{ width: "100%", background: "rgba(37,211,102,.07)", border: "1px solid rgba(37,211,102,.25)", borderRadius: 18, padding: "18px 20px" }}
                    >
                      <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                        <svg viewBox="0 0 24 24" style={{ width: 20, height: 20, fill: "#25D366", flexShrink: 0, marginTop: 2 }}>
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        <div>
                          <p style={{ color: "#25D366", fontWeight: 700, fontSize: 14, marginBottom: 6 }}>WhatsApp Confirmation Sent</p>
                          <p style={{ color: "#aaa", fontSize: 12, lineHeight: 1.6, fontStyle: "italic" }}>
                            "Booking confirmed! See you on the pitch. Slot: {slot.timeLabel} on {dateInfo?.shortDate}. Booking ID: {bookingId}. — Cairo Box Cricket 🏏"
                          </p>
                        </div>
                      </div>
                    </motion.div>

                    <button
                      onClick={onClose}
                      style={{
                        width: "100%", background: "#1A1D26", border: "1px solid #2A2D38",
                        color: "#ccc", fontWeight: 700, fontSize: 14, padding: "15px",
                        borderRadius: 14, cursor: "pointer", transition: "background .15s",
                      }}
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
