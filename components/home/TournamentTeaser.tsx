"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Trophy, Users } from "lucide-react";

function useCountdown(target: string) {
  const [t, setT] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = new Date(target).getTime() - Date.now();
      if (diff <= 0) return;
      setT({ days: Math.floor(diff / 86400000), hours: Math.floor((diff % 86400000) / 3600000), minutes: Math.floor((diff % 3600000) / 60000), seconds: Math.floor((diff % 60000) / 1000) });
    };
    tick(); const id = setInterval(tick, 1000); return () => clearInterval(id);
  }, [target]);
  return t;
}

export default function TournamentTeaser() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const t = useCountdown("2025-06-01T00:00:00");

  return (
    <section ref={ref} className="py-20 md:py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="relative rounded-3xl overflow-hidden border border-yellow-400/25 bg-[#0E0E0E]"
        >
          {/* Background photo */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-15"
            style={{ backgroundImage: "url(https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1200&q=70)" }}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0E0E0E] via-[#0E0E0E]/80 to-transparent" />
          {/* Gold top border */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-yellow-400/60 via-yellow-400/20 to-transparent" />
          {/* Glow */}
          <div className="absolute top-1/2 left-0 w-[400px] h-[300px] -translate-y-1/2 bg-yellow-400/6 blur-[100px] rounded-full" />

          <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center gap-10">
            {/* Left content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-4">
                <Trophy size={16} className="text-yellow-400" />
                <span className="text-yellow-400 text-[11px] font-bold tracking-[0.22em] uppercase">Cairo Premier League</span>
              </div>

              <h2 className="text-5xl md:text-6xl text-white mb-2 leading-none"
                style={{ fontFamily: "var(--font-bebas), Impact, sans-serif" }}>
                SEASON 3
              </h2>
              <p className="text-gray-400 text-sm mb-1">T10 Format · 16 Teams · Uppal, Hyderabad</p>
              <p className="text-[#00FF87] font-bold text-sm mb-8">
                🏆 Winner ₹25,000 &nbsp;·&nbsp; Runner-up ₹10,000 &nbsp;·&nbsp; MVP ₹5,000
              </p>

              {/* Countdown */}
              <div className="flex items-center gap-3 mb-8 flex-wrap">
                {[{ v: t.days, l: "Days" }, { v: t.hours, l: "Hrs" }, { v: t.minutes, l: "Mins" }, { v: t.seconds, l: "Secs" }].map(({ v, l }) => (
                  <div key={l} className="bg-black/60 border border-yellow-400/20 rounded-xl px-4 py-2.5 text-center min-w-[58px]">
                    <div className="text-white leading-none text-2xl" style={{ fontFamily: "var(--font-bebas), Impact, sans-serif" }}>
                      {String(v).padStart(2, "0")}
                    </div>
                    <div className="text-gray-500 text-[10px] uppercase tracking-wider mt-0.5">{l}</div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4 flex-wrap">
                <Link href="/tournaments"
                  className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black font-black px-8 py-3.5 rounded-xl uppercase tracking-wider text-sm transition-all shadow-[0_0_25px_rgba(255,184,0,0.35)] hover:shadow-[0_0_40px_rgba(255,184,0,0.5)]">
                  <Trophy size={15} /> REGISTER TEAM
                </Link>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Users size={14} />
                  <span className="text-white font-bold">11</span>/16 teams registered
                </div>
              </div>
            </div>

            {/* Right: trophy icon */}
            <div className="hidden md:flex flex-shrink-0 flex-col items-center gap-2">
              <div className="w-32 h-32 rounded-full border-2 border-yellow-400/40 bg-yellow-400/5 flex items-center justify-center shadow-[0_0_50px_rgba(255,184,0,0.15)]">
                <Trophy size={52} className="text-yellow-400" />
              </div>
              <p className="text-gray-500 text-xs text-center">Registration closes<br /><span className="text-yellow-400 font-semibold">May 25, 2025</span></p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
