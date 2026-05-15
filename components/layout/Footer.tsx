"use client";
import Link from "next/link";
import { Phone, MapPin, Clock, Star, ExternalLink } from "lucide-react";
import { businessInfo } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-[#111111] border-t border-[#2A2A2A] pb-20 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-[#00FF87] flex items-center justify-center shadow-[0_0_15px_rgba(0,255,135,0.4)]">
                <span className="text-black font-black text-base">C</span>
              </div>
              <div>
                <div className="text-[#00FF87] font-black text-2xl tracking-widest" style={{ fontFamily: "Impact, sans-serif" }}>CAIRO</div>
                <div className="text-gray-500 text-[10px] tracking-widest uppercase -mt-1">Box Cricket</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Hyderabad's premier box cricket facility. Premium turf, floodlit nights, and unforgettable matches — open 24/7.
            </p>
            <div className="flex items-center gap-1">
              {[1,2,3,4].map(i => <Star key={i} size={13} className="fill-yellow-400 text-yellow-400" />)}
              <Star size={13} className="text-yellow-400" />
              <span className="text-gray-400 text-xs ml-1">{businessInfo.rating} ({businessInfo.totalReviews} reviews)</span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { href: "/book", label: "Book a Slot" },
                { href: "/tournaments", label: "Tournaments" },
                { href: "/gallery", label: "Photo Gallery" },
                { href: "/admin", label: "Admin Dashboard" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-gray-400 hover:text-[#00FF87] text-sm transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-gray-400 text-sm">
                <MapPin size={14} className="text-[#00FF87] mt-0.5 flex-shrink-0" />
                <span>{businessInfo.address}</span>
              </li>
              <li>
                <a href={`tel:${businessInfo.phone}`} className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors">
                  <Phone size={14} className="text-[#00FF87]" />
                  <span>{businessInfo.phoneDisplay}</span>
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <Clock size={14} className="text-[#00FF87]" />
                <span>{businessInfo.hours}</span>
              </li>
              <li>
                <a href={businessInfo.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-pink-400 text-sm transition-colors">
                  <ExternalLink size={14} />
                  <span>@cairoboxcricket (Instagram)</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Map */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Find Us</h4>
            <div className="rounded-xl overflow-hidden border border-[#2A2A2A] h-36">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.3!2d78.559!3d17.406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9921c6b1d4b5%3A0x0!2sCairo%20Box%20Cricket!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Cairo Box Cricket Location"
              />
            </div>
            <p className="text-gray-600 text-xs mt-2">Plus code: {businessInfo.plusCode}</p>
          </div>
        </div>

        <div className="border-t border-[#2A2A2A] mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs">
            © 2025 Cairo Box Cricket. All rights reserved.
          </p>
          <p className="text-gray-700 text-xs">
            Uppal, Hyderabad, Telangana 500039
          </p>
        </div>
      </div>
    </footer>
  );
}
