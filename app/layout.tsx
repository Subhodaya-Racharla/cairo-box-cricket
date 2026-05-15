import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import MobileNav from "@/components/layout/MobileNav";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import JustBookedToast from "@/components/shared/JustBookedToast";
import DemoRibbon from "@/components/layout/DemoRibbon";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cairo Box Cricket | Hyderabad's Premium Box Cricket Arena",
  description:
    "Book your box cricket slot at Cairo Box Cricket, Uppal Hyderabad. Open 24/7. Premium turf, floodlit nights, competitive pricing from ₹600/hr.",
  keywords: "box cricket hyderabad, box cricket uppal, cairo box cricket, cricket ground hyderabad",
  openGraph: {
    title: "Cairo Box Cricket | Book Your Slot",
    description: "Hyderabad's Premium Box Cricket Arena. Open 24/7. Book in 30 seconds.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${bebas.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        <DemoRibbon />
        <Navbar />
        <main className="flex-1">{children}</main>
        <MobileNav />
        <WhatsAppButton />
        <JustBookedToast />
      </body>
    </html>
  );
}
