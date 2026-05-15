"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/lib/data";

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((p) => (p + 1) % testimonials.length), 4200);
    return () => clearInterval(t);
  }, []);

  const go = (dir: 1 | -1) =>
    setActive((p) => (p + dir + testimonials.length) % testimonials.length);

  return (
    <section ref={ref} className="py-20 md:py-28 px-4 bg-[#0D0D0D] relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-[#00B4FF]/4 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
          <p className="text-[#00FF87] text-[11px] font-bold tracking-[0.25em] uppercase mb-3">What Players Say</p>
          <h2 className="text-5xl md:text-6xl text-white" style={{ fontFamily: "var(--font-bebas), Impact, sans-serif" }}>
            PLAYER REVIEWS
          </h2>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.15 }}>
          <div className="relative bg-[#111111] border border-[#1E1E1E] rounded-2xl p-8 md:p-10 min-h-[200px] overflow-hidden">
            {/* Green accent line */}
            <div className="absolute top-0 left-8 w-16 h-0.5 bg-gradient-to-r from-[#00FF87] to-transparent" />

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.32 }}
              >
                {/* Stars */}
                <div className="flex items-center gap-0.5 mb-5">
                  {Array.from({ length: testimonials[active].rating }).map((_, i) => (
                    <Star key={i} size={15} className="fill-yellow-400 text-yellow-400" />
                  ))}
                  {Array.from({ length: 5 - testimonials[active].rating }).map((_, i) => (
                    <Star key={i} size={15} className="text-[#2A2A2A]" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-gray-200 text-base md:text-lg leading-relaxed mb-7 italic">
                  &ldquo;{testimonials[active].text}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00FF87] to-[#00B4FF] flex items-center justify-center text-black font-black text-sm flex-shrink-0">
                    {testimonials[active].avatar}
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">{testimonials[active].name}</div>
                    <div className="text-gray-500 text-xs">{testimonials[active].location} · {testimonials[active].date}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-5">
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setActive(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === active ? "w-7 bg-[#00FF87]" : "w-2 bg-[#2A2A2A] hover:bg-[#3A3A3A]"
                  }`} />
              ))}
            </div>
            <div className="flex gap-2">
              {([[-1, "prev"], [1, "next"]] as const).map(([dir, label]) => (
                <button key={label} onClick={() => go(dir as 1 | -1)}
                  className="w-9 h-9 rounded-full bg-[#1A1A1A] hover:bg-[#2A2A2A] border border-[#2A2A2A] flex items-center justify-center transition-all">
                  {dir === -1 ? <ChevronLeft size={15} /> : <ChevronRight size={15} />}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
