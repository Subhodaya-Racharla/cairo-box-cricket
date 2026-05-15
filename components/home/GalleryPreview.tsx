"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { galleryImages } from "@/lib/data";

export default function GalleryPreview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const preview = galleryImages.slice(0, 6);

  return (
    <section ref={ref} className="py-16 md:py-24 px-4 bg-[#0D0D0D]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <div>
            <span className="text-[#00FF87] text-xs font-bold tracking-widest uppercase">Photo Gallery</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mt-1 uppercase" style={{ fontFamily: "Impact, sans-serif" }}>
              FEEL THE VIBE
            </h2>
          </div>
          <Link href="/gallery" className="text-[#00FF87] font-bold text-sm hover:underline shrink-0">
            View All Photos →
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {preview.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="relative overflow-hidden rounded-xl bg-[#1A1A1A] group cursor-pointer"
              style={{ aspectRatio: i % 3 === 1 ? "1/1.2" : "1/1" }}
            >
              <Image
                src={img.url}
                alt={img.caption}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end p-3">
                <p className="text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 leading-tight">
                  {img.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          <Link
            href="/gallery"
            className="inline-block border border-[#2A2A2A] hover:border-[#00FF87]/50 text-gray-300 hover:text-white font-semibold px-8 py-3 rounded-xl text-sm transition-all"
          >
            See All 15+ Photos
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
