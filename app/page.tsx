"use client";

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustSection from "@/components/TrustSection";
import LocationSection from "@/components/LocationSection";
import EstateFeatures from "@/components/EstateFeatures";
import PricingSection from "@/components/PricingSection";
import WhyInvestSection from "@/components/WhyInvestSection";
import GallerySection from "@/components/GallerySection";
import UrgencySection from "@/components/UrgencySection";
import ContactSection from "@/components/ContactSection";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <TrustSection />
      <EstateFeatures />
      <LocationSection />
      <PricingSection />
      <WhyInvestSection />
      <GallerySection />
      <UrgencySection />
      <ContactSection />
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
