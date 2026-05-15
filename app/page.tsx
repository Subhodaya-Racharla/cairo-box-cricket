import Hero from "@/components/home/Hero";
import StatsBar from "@/components/home/StatsBar";
import WhyCairo from "@/components/home/WhyCairo";
import LiveBookingSnapshot from "@/components/home/LiveBookingSnapshot";
import PricingTiers from "@/components/home/PricingTiers";
import Testimonials from "@/components/home/Testimonials";
import TournamentTeaser from "@/components/home/TournamentTeaser";
import GalleryPreview from "@/components/home/GalleryPreview";
import FinalCTA from "@/components/home/FinalCTA";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <WhyCairo />
      <LiveBookingSnapshot />
      <PricingTiers />
      <TournamentTeaser />
      <Testimonials />
      <GalleryPreview />
      <FinalCTA />
      <Footer />
    </>
  );
}
