"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { galleryImages } from "@/lib/data";

// Use only images that are known to load well
const preview = [
  galleryImages[0],  // tournaments
  galleryImages[3],  // day matches
  galleryImages[4],  // night
  galleryImages[6],  // day
  galleryImages[7],  // ground
  galleryImages[9],  // night
];

export default function GalleryPreview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} style={{ padding: "80px 16px", background: "#0D0F14" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 16, marginBottom: 36 }}>
          <div>
            <span className="section-label">Photo Gallery</span>
            <h2 style={{ fontFamily: "var(--font-bebas), Impact, sans-serif", fontSize: "clamp(2.8rem,6vw,4rem)", color: "#fff", display: "block", lineHeight: 1 }}>
              FEEL THE VIBE
            </h2>
          </div>
          <Link href="/gallery" style={{ color: "#00FF87", fontWeight: 700, fontSize: 13, letterSpacing: ".05em", textDecoration: "none" }}>
            View All Photos →
          </Link>
        </motion.div>

        {/* 3-column grid — fixed heights, no broken aspect-ratio tricks */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          {preview.map((img, i) => (
            <motion.div key={img.id}
              initial={{ opacity: 0, scale: .96 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.08 }}
              style={{ position: "relative", overflow: "hidden", borderRadius: 16, cursor: "pointer",
                height: i === 0 || i === 5 ? 280 : 220,    // first & last taller
                background: "#1A1D26"
              }}
              whileHover={{ scale: 1.02 }}
            >
              <Image
                src={img.url} alt={img.caption} fill
                style={{ objectFit: "cover", transition: "transform .4s ease" }}
                sizes="(max-width:768px) 50vw, 33vw"
              />
              {/* Hover overlay */}
              <motion.div
                initial={{ opacity: 0 }} whileHover={{ opacity: 1 }}
                style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.5)", display: "flex", alignItems: "flex-end", padding: 14 }}
              >
                <span style={{ color: "#fff", fontSize: 12, fontWeight: 600, lineHeight: 1.4 }}>{img.caption}</span>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: .5 }}
          style={{ textAlign: "center", marginTop: 28 }}>
          <Link href="/gallery" style={{
            display: "inline-block",
            border: "1px solid #2A2D38", color: "#ccc",
            padding: "12px 32px", borderRadius: 12,
            fontWeight: 600, fontSize: 13, textDecoration: "none",
            transition: "border-color .2s, color .2s",
          }}>
            See All 15+ Photos
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
