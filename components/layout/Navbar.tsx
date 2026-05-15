"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { businessInfo } from "@/lib/data";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/book", label: "Book Now" },
  { href: "/tournaments", label: "Tournaments" },
  { href: "/gallery", label: "Gallery" },
  { href: "/admin", label: "Admin" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Don't show on admin page
  if (pathname?.startsWith("/admin")) return null;

  return (
    <nav
      className={`fixed top-8 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#2A2A2A] shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-full bg-[#00FF87] flex items-center justify-center shadow-[0_0_15px_rgba(0,255,135,0.5)] group-hover:shadow-[0_0_25px_rgba(0,255,135,0.7)] transition-all">
              <span className="text-black font-black text-sm">C</span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-[#00FF87] font-black text-xl tracking-widest uppercase" style={{ fontFamily: "Impact, sans-serif" }}>
                CAIRO
              </span>
              <span className="text-gray-400 text-[10px] tracking-wider uppercase -mt-1">Box Cricket</span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.filter(l => l.href !== "/admin").map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  pathname === link.href
                    ? "text-[#00FF87] bg-[#00FF87]/10"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA + Phone */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={`tel:${businessInfo.phone}`}
              className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors"
            >
              <Phone size={14} />
              <span>{businessInfo.phoneDisplay}</span>
            </a>
            <Link
              href="/book"
              className="bg-[#00FF87] hover:bg-[#00e07a] text-black font-bold px-5 py-2 rounded-lg text-sm transition-all duration-200 shadow-[0_0_15px_rgba(0,255,135,0.3)] hover:shadow-[0_0_25px_rgba(0,255,135,0.5)]"
            >
              BOOK NOW
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-gray-300 hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0A0A0A]/98 backdrop-blur-md border-t border-[#2A2A2A]">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
                  pathname === link.href
                    ? "text-[#00FF87] bg-[#00FF87]/10"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 pb-1">
              <Link
                href="/book"
                onClick={() => setMenuOpen(false)}
                className="block w-full bg-[#00FF87] text-black font-bold px-4 py-3 rounded-lg text-sm text-center"
              >
                BOOK NOW
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
