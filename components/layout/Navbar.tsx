"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { businessInfo } from "@/lib/data";

const links = [
  { href: "/",            label: "Home" },
  { href: "/book",        label: "Book Now" },
  { href: "/tournaments", label: "Tournaments" },
  { href: "/gallery",     label: "Gallery" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  if (pathname?.startsWith("/admin")) return null;

  const navBg = scrolled
    ? "rgba(8,8,10,.94)"
    : "transparent";
  const navBorder = scrolled ? "1px solid #1A1D26" : "1px solid transparent";

  return (
    <nav style={{
      position: "fixed", top: 32, left: 0, right: 0, zIndex: 40,
      background: navBg, backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: navBorder,
      transition: "background .3s, border-color .3s",
      boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,.5)" : "none",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>

        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{
            width: 36, height: 36, borderRadius: "50%",
            background: "#00FF87", display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 18px rgba(0,255,135,.5)",
          }}>
            <span style={{ fontFamily: "var(--font-bebas), Impact, sans-serif", color: "#000", fontSize: 18, lineHeight: 1 }}>C</span>
          </div>
          <div>
            <div style={{ fontFamily: "var(--font-bebas), Impact, sans-serif", color: "#00FF87", fontSize: 20, letterSpacing: ".2em", lineHeight: 1 }}>CAIRO</div>
            <div style={{ color: "#555", fontSize: 9, letterSpacing: ".14em", textTransform: "uppercase", marginTop: 1 }}>Box Cricket</div>
          </div>
        </Link>

        {/* Desktop links */}
        <div style={{ display: "none", gap: 4 }} className="md:flex">
          {links.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link key={href} href={href} style={{
                padding: "8px 16px", borderRadius: 10,
                fontSize: 14, fontWeight: 600, textDecoration: "none",
                color: active ? "#00FF87" : "#999",
                background: active ? "rgba(0,255,135,.08)" : "transparent",
                transition: "color .18s, background .18s",
                position: "relative",
              }}>
                {label}
              </Link>
            );
          })}
        </div>

        {/* Right side */}
        <div style={{ display: "none", alignItems: "center", gap: 16 }} className="md:flex">
          <a href={`tel:${businessInfo.phone}`} style={{ display: "flex", alignItems: "center", gap: 6, color: "#666", fontSize: 12, textDecoration: "none" }}>
            <Phone size={13} style={{ color: "#555" }} />
            {businessInfo.phoneDisplay}
          </a>
          <Link href="/book" className="btn-neon" style={{ padding: "10px 22px", fontSize: 12 }}>
            BOOK NOW
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setOpen(!open)} style={{ display: "flex", background: "none", border: "none", color: "#999", cursor: "pointer", padding: 8 }} className="md:hidden">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div style={{ background: "rgba(8,8,10,.98)", backdropFilter: "blur(20px)", borderTop: "1px solid #1A1D26", padding: "12px 16px 16px" }}>
          {[...links, { href: "/admin", label: "Admin" }].map(({ href, label }) => (
            <Link key={href} href={href} onClick={() => setOpen(false)} style={{
              display: "block", padding: "12px 16px", borderRadius: 12,
              color: pathname === href ? "#00FF87" : "#aaa",
              background: pathname === href ? "rgba(0,255,135,.08)" : "transparent",
              fontSize: 15, fontWeight: 600, textDecoration: "none", marginBottom: 2,
            }}>{label}</Link>
          ))}
          <Link href="/book" onClick={() => setOpen(false)} className="btn-neon" style={{ display: "block", textAlign: "center", marginTop: 8, padding: "14px" }}>
            BOOK NOW
          </Link>
        </div>
      )}
    </nav>
  );
}
