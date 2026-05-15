"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Calendar, Trophy, Images, Phone } from "lucide-react";
import { businessInfo } from "@/lib/data";

const tabs = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/book", icon: Calendar, label: "Book" },
  { href: "/tournaments", icon: Trophy, label: "Cup" },
  { href: "/gallery", icon: Images, label: "Gallery" },
];

export default function MobileNav() {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) return null;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#111111] border-t border-[#2A2A2A] pb-safe">
      <div className="flex items-center justify-around h-16">
        {tabs.map(({ href, icon: Icon, label }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-0.5 px-3 py-2 min-w-[44px] transition-colors ${
                active ? "text-[#00FF87]" : "text-gray-500"
              }`}
            >
              <Icon size={20} strokeWidth={active ? 2.5 : 1.5} />
              <span className="text-[10px] font-semibold">{label}</span>
              {active && (
                <span className="absolute bottom-0 w-8 h-0.5 bg-[#00FF87] rounded-t-full" />
              )}
            </Link>
          );
        })}
        <a
          href={`tel:${businessInfo.phone}`}
          className="flex flex-col items-center gap-0.5 px-3 py-2 min-w-[44px] text-gray-500 hover:text-white transition-colors"
        >
          <Phone size={20} strokeWidth={1.5} />
          <span className="text-[10px] font-semibold">Call</span>
        </a>
      </div>
    </nav>
  );
}
