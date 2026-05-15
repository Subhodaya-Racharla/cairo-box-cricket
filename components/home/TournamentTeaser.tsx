"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Trophy } from "lucide-react";

function useCountdown(targetDate: string) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = new Date(targetDate).getTime() - Date.now();
      if (diff <= 0) return;
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, [targetDate]);
  return timeLeft;
}

export default function TournamentTeaser() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const timeLeft = useCountdown("2025-06-01T00:00:00");

  return (
    <section ref={ref} className="py-16 md:py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="relative rounded-3xl overflow-hidden border border-yellow-400/30 bg-gradient-to-br from-yellow-400/5 via-[#1A1A1A] to-[#1A1A1A] p-8 md:p-12"
        >
          {/* Glow effect */}
          <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-yellow-400/5 blur-3xl" />

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center gap-2 justify-center md:justify-start mb-3">
                <Trophy size={20} className="text-yellow-400" />
                <span className="text-yellow-400 text-xs font-bold tracking-widest uppercase">Cairo Premier League</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white uppercase mb-2" style={{ fontFamily: "Impact, sans-serif" }}>
                SEASON 3
              </h2>
              <p className="text-gray-400 mb-2">Registrations Open · 16 Teams · ₹40,000 Prize Pool</p>
              <p className="text-[#00FF87] font-bold text-sm mb-6">🏆 Winner ₹25K · Runner-up ₹10K · MVP ₹5K</p>

              {/* Countdown */}
              <div className="flex items-center gap-3 justify-center md:justify-start mb-6">
                {[
                  { v: timeLeft.days, l: "Days" },
                  { v: timeLeft.hours, l: "Hrs" },
                  { v: timeLeft.minutes, l: "Mins" },
                  { v: timeLeft.seconds, l: "Secs" },
                ].map(({ v, l }) => (
                  <div key={l} className="text-center bg-[#111] border border-[#2A2A2A] rounded-xl px-3 py-2 min-w-[52px]">
                    <div className="text-white font-black text-xl" style={{ fontFamily: "Impact, sans-serif" }}>{String(v).padStart(2, "0")}</div>
                    <div className="text-gray-500 text-[10px] uppercase">{l}</div>
                  </div>
                ))}
              </div>

              <Link
                href="/tournaments"
                className="inline-block bg-yellow-400 hover:bg-yellow-300 text-black font-black px-8 py-3 rounded-xl uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(255,184,0,0.3)]"
              >
                REGISTER YOUR TEAM
              </Link>
            </div>

            <div className="flex-shrink-0 text-center">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-yellow-400/50 flex items-center justify-center bg-yellow-400/5 shadow-[0_0_40px_rgba(255,184,0,0.2)]">
                <Trophy size={56} className="text-yellow-400" />
              </div>
              <div className="mt-3 text-gray-400 text-sm">11/16 teams registered</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
