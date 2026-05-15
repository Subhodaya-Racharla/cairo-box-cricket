"use client";
import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Footer from "@/components/layout/Footer";
import { galleryImages } from "@/lib/data";

const FILTERS = ["all", "day", "night", "tournaments", "ground"] as const;
type Filter = (typeof FILTERS)[number];

const filterLabels: Record<Filter, string> = {
  all: "All",
  day: "Day Matches",
  night: "Night Matches",
  tournaments: "Tournaments",
  ground: "The Ground",
};

export default function GalleryPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const gridRef = useRef(null);
  const inView = useInView(gridRef, { once: true });

  const filtered = filter === "all" ? galleryImages : galleryImages.filter((g) => g.category === filter);

  const prev = () => setLightboxIdx((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length));
  const next = () => setLightboxIdx((i) => (i === null ? null : (i + 1) % filtered.length));

  return (
    <>
      <div className="min-h-screen bg-[#0A0A0A] pt-28 pb-24 md:pb-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <motion.div className="mb-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-[#00FF87] text-xs font-bold tracking-widest uppercase">Cairo Box Cricket</span>
            <h1 className="text-4xl md:text-5xl font-black text-white mt-1 uppercase" style={{ fontFamily: "Impact, sans-serif" }}>
              PHOTO GALLERY
            </h1>
            <p className="text-gray-400 mt-2 text-sm">Behind the scenes and match-day moments.</p>
          </motion.div>

          {/* Filter tabs */}
          <motion.div
            className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
                  filter === f
                    ? "bg-[#00FF87] text-black shadow-[0_0_15px_rgba(0,255,135,0.3)]"
                    : "bg-[#1A1A1A] border border-[#2A2A2A] text-gray-400 hover:border-[#3A3A3A] hover:text-white"
                }`}
              >
                {filterLabels[f]}
              </button>
            ))}
          </motion.div>

          {/* Grid */}
          <motion.div
            ref={gridRef}
            key={filter}
            style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}
            className="md:grid-cols-3 lg:grid-cols-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {filtered.map((img, i) => {
              const rowHeights = [240, 300, 220, 280, 260, 320, 200, 270, 240, 290, 210, 260, 240, 310, 230];
              const h = rowHeights[i % rowHeights.length];
              return (
                <motion.div
                  key={img.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: i * 0.05 }}
                  style={{ position: "relative", height: h, borderRadius: 12, overflow: "hidden", cursor: "pointer", background: "#1A1D26" }}
                  className="group"
                  onClick={() => setLightboxIdx(i)}
                >
                  <Image
                    src={img.url}
                    alt={img.caption}
                    fill
                    style={{ objectFit: "cover", transition: "transform 0.5s ease" }}
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0)", transition: "background 0.3s", display: "flex", alignItems: "flex-end", padding: 12 }}
                    className="group-hover:bg-black/50">
                    <span style={{ background: "rgba(0,0,0,.65)", backdropFilter: "blur(6px)", color: "#fff", fontSize: 11, padding: "4px 10px", borderRadius: 8, opacity: 0, transform: "translateY(8px)", transition: "all 0.3s" }}
                      className="group-hover:opacity-100 group-hover:translate-y-0">
                      {img.caption}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-gray-600">No images in this category yet.</div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxIdx(null)}
            >
              <button
                className="absolute top-4 right-4 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors z-10"
                onClick={() => setLightboxIdx(null)}
              >
                <X size={18} />
              </button>
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors z-10"
                onClick={(e) => { e.stopPropagation(); prev(); }}
              >
                <ChevronLeft size={20} />
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors z-10"
                onClick={(e) => { e.stopPropagation(); next(); }}
              >
                <ChevronRight size={20} />
              </button>

              <motion.div
                key={lightboxIdx}
                className="relative max-w-5xl max-h-[85vh] w-full mx-8"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative" style={{ aspectRatio: "16/9" }}>
                  <Image
                    src={filtered[lightboxIdx].url}
                    alt={filtered[lightboxIdx].caption}
                    fill
                    className="object-contain"
                    sizes="100vw"
                    priority
                  />
                </div>
                <div className="mt-3 text-center">
                  <p className="text-gray-300 text-sm">{filtered[lightboxIdx].caption}</p>
                  <p className="text-gray-600 text-xs mt-1">{lightboxIdx + 1} / {filtered.length}</p>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}
