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
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  if (pathname?.startsWith("/admin")) return null;

  return (
    <nav className={`fixed top-8 left-0 right-0 z-40 transition-all duration-400 ${
      scrolled ? "bg-[#0A0A0A]/92 backdrop-blur-xl border-b border-[#1E1E1E] shadow-[0_4px_30px_rgba(0,0,0,0.5)]" : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-9 h-9 rounded-full bg-[#00FF87] flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(0,255,135,0.6)] transition-all duration-300">
              <span className="text-black font-black text-sm" style={{ fontFamily: "var(--font-bebas), Impact, sans-serif" }}>C</span>
            </div>
            <div>
              <div className="text-[#00FF87] leading-none tracking-[0.2em] text-lg"
                style={{ fontFamily: "var(--font-bebas), Impact, sans-serif" }}>CAIRO</div>
              <div className="text-gray-500 text-[9px] tracking-[0.15em] uppercase -mt-0.5">Box Cricket</div>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={href}
                className={`relative px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  pathname === href
                    ? "text-[#00FF87]"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {label}
                {pathname === href && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#00FF87] rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-4">
            <a href={`tel:${businessInfo.phone}`}
              className="flex items-center gap-1.5 text-gray-500 hover:text-gray-300 text-xs transition-colors">
              <Phone size={13} />
              {businessInfo.phoneDisplay}
            </a>
            <Link href="/book"
              className="btn-neon px-5 py-2.5 text-[13px] rounded-xl">
              BOOK NOW
            </Link>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 text-gray-400 hover:text-white" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="md:hidden bg-[#0A0A0A]/98 backdrop-blur-xl border-t border-[#1E1E1E] pb-4">
          <div className="px-4 pt-2 space-y-1">
            {[...navLinks, { href: "/admin", label: "Admin" }].map(({ href, label }) => (
              <Link key={href} href={href} onClick={() => setMenuOpen(false)}
                className={`flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  pathname === href ? "text-[#00FF87] bg-[#00FF87]/8" : "text-gray-400 hover:text-white hover:bg-white/4"
                }`}>
                {label}
              </Link>
            ))}
            <Link href="/book" onClick={() => setMenuOpen(false)}
              className="block btn-neon text-center px-4 py-3.5 mt-2 rounded-xl text-sm">
              BOOK NOW
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
