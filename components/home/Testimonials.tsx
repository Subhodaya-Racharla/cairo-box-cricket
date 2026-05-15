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
    const t = setInterval(() => setActive((p) => (p + 1) % testimonials.length), 4000);
    return () => clearInterval(t);
  }, []);

  const prev = () => setActive((p) => (p - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive((p) => (p + 1) % testimonials.length);

  return (
    <section ref={ref} className="py-16 md:py-24 px-4 bg-[#0D0D0D]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <span className="text-[#00FF87] text-xs font-bold tracking-widest uppercase">Player Reviews</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-2 uppercase" style={{ fontFamily: "Impact, sans-serif" }}>
            WHAT PLAYERS SAY
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          <div className="overflow-hidden rounded-2xl bg-[#1A1A1A] border border-[#2A2A2A] p-8 md:p-10 min-h-[220px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.35 }}
              >
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: testimonials[active].rating }).map((_, i) => (
                    <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                  ))}
                  {Array.from({ length: 5 - testimonials[active].rating }).map((_, i) => (
                    <Star key={i} size={16} className="text-gray-600" />
                  ))}
                </div>
                <p className="text-gray-200 text-base md:text-lg leading-relaxed mb-6 italic">
                  "{testimonials[active].text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00FF87] to-[#00B4FF] flex items-center justify-center text-black font-black text-sm">
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
          <div className="flex items-center justify-between mt-6">
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === active ? "w-8 bg-[#00FF87]" : "w-2 bg-[#2A2A2A]"
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={prev} className="w-9 h-9 rounded-full bg-[#2A2A2A] hover:bg-[#3A3A3A] flex items-center justify-center transition-colors">
                <ChevronLeft size={16} />
              </button>
              <button onClick={next} className="w-9 h-9 rounded-full bg-[#2A2A2A] hover:bg-[#3A3A3A] flex items-center justify-center transition-colors">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
