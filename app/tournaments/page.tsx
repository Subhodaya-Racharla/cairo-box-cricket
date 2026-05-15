"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Trophy, Users, X, Check } from "lucide-react";
import Footer from "@/components/layout/Footer";
import { tournaments, pastTournaments, tournamentBracket } from "@/lib/data";

function useCountdown(targetDate: string) {
  const [t, setT] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = new Date(targetDate).getTime() - Date.now();
      if (diff <= 0) return;
      setT({ days: Math.floor(diff/86400000), hours: Math.floor((diff%86400000)/3600000), minutes: Math.floor((diff%3600000)/60000), seconds: Math.floor((diff%60000)/1000) });
    };
    tick(); const id = setInterval(tick, 1000); return () => clearInterval(id);
  }, [targetDate]);
  return t;
}

function RegisterModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ team: "", captain: "", phone: "", players: "10" });
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => setDone(true), 800);
  };

  return (
    <>
      <motion.div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={!done ? onClose : undefined} />
      <motion.div
        className="fixed inset-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-50 bg-[#111] md:rounded-2xl md:border md:border-[#2A2A2A] md:w-full md:max-w-md overflow-y-auto shadow-2xl"
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
      >
        <div className="flex items-center justify-between p-5 border-b border-[#2A2A2A]">
          <h2 className="text-white font-bold text-lg">Register Your Team</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-[#2A2A2A] flex items-center justify-center hover:bg-[#3A3A3A]"><X size={15} /></button>
        </div>
        <div className="p-5">
          {!done ? (
            <form onSubmit={submit} className="space-y-4">
              {[
                { key: "team", label: "Team Name", placeholder: "e.g. Uppal Strikers" },
                { key: "captain", label: "Captain Name", placeholder: "Full name" },
                { key: "phone", label: "Captain's Phone", placeholder: "10-digit mobile number" },
              ].map(({ key, label, placeholder }) => (
                <div key={key}>
                  <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">{label}</label>
                  <input
                    type={key === "phone" ? "tel" : "text"}
                    placeholder={placeholder}
                    required
                    value={form[key as keyof typeof form]}
                    onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
                    className="w-full bg-[#1A1A1A] border border-[#2A2A2A] focus:border-[#00FF87] rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors placeholder:text-gray-600"
                  />
                </div>
              ))}
              <div>
                <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Number of Players</label>
                <select
                  value={form.players}
                  onChange={(e) => setForm((p) => ({ ...p, players: e.target.value }))}
                  className="w-full bg-[#1A1A1A] border border-[#2A2A2A] focus:border-[#00FF87] rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors"
                >
                  {[8,9,10,11,12,13,14,15].map(n => <option key={n} value={n}>{n} players</option>)}
                </select>
              </div>
              <div className="bg-yellow-400/5 border border-yellow-400/20 rounded-xl p-3 text-xs text-gray-400">
                Entry fee: <span className="text-yellow-400 font-bold">₹2,000/team</span>. Payment collected at ground registration.
              </div>
              <button type="submit" className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-black py-4 rounded-xl text-sm uppercase tracking-wider transition-all">
                REGISTER TEAM
              </button>
            </form>
          ) : (
            <div className="flex flex-col items-center py-12 gap-5">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300 }}
                className="w-16 h-16 rounded-full bg-[#00FF87]/20 border-2 border-[#00FF87] flex items-center justify-center">
                <Check size={30} className="text-[#00FF87]" />
              </motion.div>
              <div className="text-center">
                <h3 className="text-white font-bold text-xl">Team Registered!</h3>
                <p className="text-gray-400 text-sm mt-1">We'll contact you on WhatsApp to confirm your spot.</p>
                <p className="text-gray-600 text-xs mt-3">Team: <span className="text-white">{form.team}</span></p>
              </div>
              <button onClick={onClose} className="w-full bg-[#1A1A1A] border border-[#2A2A2A] text-gray-300 font-bold py-3 rounded-xl text-sm hover:bg-[#2A2A2A] transition-colors">Close</button>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
}

function BracketMatch({ match, isLast }: { match: (typeof tournamentBracket.rounds)[0]["matches"][0]; isLast?: boolean }) {
  return (
    <div className={`bg-[#1A1A1A] border rounded-xl overflow-hidden ${match.completed ? "border-[#00FF87]/30" : "border-[#2A2A2A]"}`}>
      {[{ team: match.team1, score: match.score1, won: match.winner === match.team1 },
        { team: match.team2, score: match.score2, won: match.winner === match.team2 }].map((side, i) => (
        <div key={i} className={`flex items-center justify-between px-3 py-2 text-sm ${i === 0 ? "border-b border-[#2A2A2A]" : ""} ${side.won ? "bg-[#00FF87]/5" : ""}`}>
          <span className={`font-semibold truncate max-w-[110px] ${side.won ? "text-[#00FF87]" : side.team === "TBD" ? "text-gray-600" : "text-gray-300"}`}>{side.team}</span>
          {match.completed && <span className={`font-black text-base ml-2 ${side.won ? "text-[#00FF87]" : "text-gray-500"}`} style={{ fontFamily: "Impact, sans-serif" }}>{side.score}</span>}
          {!match.completed && side.team !== "TBD" && <span className="text-gray-600 text-xs">vs</span>}
        </div>
      ))}
    </div>
  );
}

export default function TournamentsPage() {
  const [registerOpen, setRegisterOpen] = useState(false);
  const t = tournaments[0];
  const countdown = useCountdown(t.startDate);
  const bracketRef = useRef(null);
  const bracketInView = useInView(bracketRef, { once: true });

  return (
    <>
      <div className="min-h-screen bg-[#0A0A0A] pt-24 pb-24 md:pb-8">
        {/* Hero banner */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${t.image})` }} />
          <div className="absolute inset-0 bg-black/80" />
          <div className="relative z-10 max-w-5xl mx-auto px-4 py-16 md:py-24">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center gap-2 mb-3">
                <Trophy size={18} className="text-yellow-400" />
                <span className="text-yellow-400 text-xs font-bold tracking-widest uppercase">Cairo Premier League</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white uppercase mb-2" style={{ fontFamily: "Impact, sans-serif" }}>
                SEASON 3
              </h1>
              <p className="text-gray-400 text-lg mb-2">T10 Format · 16 Teams · Uppal, Hyderabad</p>
              <p className="text-[#00FF87] font-bold mb-6">🏆 Winner ₹25,000 · Runner-up ₹10,000 · MVP ₹5,000</p>

              {/* Countdown */}
              <div className="flex gap-3 mb-8">
                {[{ v: countdown.days, l: "Days" }, { v: countdown.hours, l: "Hrs" }, { v: countdown.minutes, l: "Mins" }, { v: countdown.seconds, l: "Secs" }].map(({ v, l }) => (
                  <div key={l} className="bg-black/60 border border-[#2A2A2A] rounded-xl px-4 py-2 text-center min-w-[56px]">
                    <div className="text-white font-black text-2xl" style={{ fontFamily: "Impact, sans-serif" }}>{String(v).padStart(2, "0")}</div>
                    <div className="text-gray-500 text-[10px] uppercase">{l}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button onClick={() => setRegisterOpen(true)} className="bg-yellow-400 hover:bg-yellow-300 text-black font-black px-8 py-3.5 rounded-xl text-sm uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(255,184,0,0.3)]">
                  REGISTER YOUR TEAM
                </button>
                <div className="flex items-center gap-2 bg-black/40 border border-[#2A2A2A] rounded-xl px-5 py-3 text-sm">
                  <Users size={15} className="text-gray-400" />
                  <span className="text-gray-300">{t.registeredTeams}/{t.maxTeams} teams registered</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Prize Pool */}
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="grid grid-cols-3 gap-4 mb-12">
            {[
              { label: "Winner", amount: "₹25,000", icon: "🥇", color: "text-yellow-400 border-yellow-400/30 bg-yellow-400/5" },
              { label: "Runner-up", amount: "₹10,000", icon: "🥈", color: "text-gray-300 border-gray-500/30 bg-gray-500/5" },
              { label: "MVP Award", amount: "₹5,000", icon: "⭐", color: "text-orange-400 border-orange-400/30 bg-orange-400/5" },
            ].map(({ label, amount, icon, color }) => (
              <div key={label} className={`border rounded-2xl p-4 text-center ${color}`}>
                <div className="text-2xl mb-1">{icon}</div>
                <div className="font-black text-xl" style={{ fontFamily: "Impact, sans-serif" }}>{amount}</div>
                <div className="text-xs text-gray-400 mt-0.5">{label}</div>
              </div>
            ))}
          </div>

          {/* Bracket */}
          <div ref={bracketRef}>
            <h2 className="text-3xl font-black text-white uppercase mb-6" style={{ fontFamily: "Impact, sans-serif" }}>
              TOURNAMENT BRACKET
            </h2>
            <div className="overflow-x-auto pb-4">
              <div className="flex gap-4 min-w-max">
                {tournamentBracket.rounds.map((round, ri) => (
                  <motion.div
                    key={round.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={bracketInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: ri * 0.15 }}
                    className="flex flex-col"
                    style={{ width: 200 }}
                  >
                    <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 text-center">{round.name}</div>
                    <div className="flex flex-col gap-3 flex-1 justify-around">
                      {round.matches.map((m) => (
                        <BracketMatch key={m.id} match={m} />
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Past tournaments */}
          <div className="mt-16">
            <h2 className="text-3xl font-black text-white uppercase mb-6" style={{ fontFamily: "Impact, sans-serif" }}>HALL OF FAME</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {pastTournaments.map((pt, i) => (
                <motion.div
                  key={pt.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={bracketInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl overflow-hidden card-hover"
                >
                  <div className="relative h-36">
                    <Image src={pt.image} alt={pt.name} fill className="object-cover" />
                    <div className="absolute inset-0 bg-black/50" />
                    <div className="absolute bottom-3 left-3">
                      <span className="text-xs text-gray-400">{pt.date}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-white font-bold text-sm mb-3">{pt.name}</h3>
                    <div className="space-y-1.5 text-xs">
                      <div className="flex items-center gap-2"><span className="text-yellow-400">🥇</span><span className="text-gray-300">{pt.winner}</span></div>
                      <div className="flex items-center gap-2"><span className="text-gray-400">🥈</span><span className="text-gray-400">{pt.runnerUp}</span></div>
                      <div className="flex items-center gap-2"><span className="text-orange-400">⭐</span><span className="text-gray-400">MVP: {pt.mvp}</span></div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>{registerOpen && <RegisterModal onClose={() => setRegisterOpen(false)} />}</AnimatePresence>
      <Footer />
    </>
  );
}
