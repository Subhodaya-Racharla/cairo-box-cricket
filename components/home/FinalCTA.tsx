"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { businessInfo } from "@/lib/data";

export default function FinalCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-20 md:py-28 px-4 relative overflow-hidden bg-[#0A0A0A]">
      {/* Dual ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_80%,rgba(0,255,135,0.08)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,180,255,0.05)_0%,transparent_60%)]" />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[#00FF87] text-[11px] font-bold tracking-[0.25em] uppercase mb-4">Ready to Play?</p>
          <h2 className="text-5xl md:text-7xl text-white leading-none mb-5"
            style={{ fontFamily: "var(--font-bebas), Impact, sans-serif" }}>
            BOOK YOUR<br />SLOT NOW
          </h2>
          <p className="text-gray-400 text-base md:text-lg mb-10 max-w-lg mx-auto leading-relaxed">
            Join <span className="text-white font-semibold">10,000+</span> players who've already played at Cairo.
            Your pitch is waiting — 24 hours a day.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/book"
              className="btn-neon inline-flex items-center justify-center gap-2 px-10 py-4 text-base rounded-xl">
              🏏 BOOK ONLINE NOW
            </Link>
            <a
              href={`https://wa.me/${businessInfo.whatsapp}?text=Hi%2C%20I%20want%20to%20book%20a%20slot%20at%20Cairo%20Box%20Cricket.`}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1db954] text-white font-bold px-10 py-4 text-base rounded-xl uppercase tracking-wide transition-all shadow-[0_4px_24px_rgba(37,211,102,0.25)] hover:shadow-[0_4px_36px_rgba(37,211,102,0.4)]"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white flex-shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WHATSAPP US
            </a>
          </div>

          <p className="text-gray-600 text-xs mt-8">📍 {businessInfo.address}</p>
        </motion.div>
      </div>
    </section>
  );
}
