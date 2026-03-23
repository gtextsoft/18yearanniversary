import { motion } from "framer-motion";
import { MapPin, ArrowDown } from "lucide-react";
import Image from "next/image";
const heroBg = "/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src={heroBg}
          alt="Sapphire City Estate at sunset"
          className="w-full h-full object-cover"
          width={1000}
          height={1000}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/40 to-charcoal/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="inline-flex items-center gap-2 glass-dark px-4 py-2 rounded-full mb-6">
            <MapPin size={14} className="text-gold" />
            <span className="font-body text-sm text-warm-white/90">Gwagwalada, Abuja</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-display text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-6"
          style={{ color: "hsl(var(--warm-white))" }}
        >
          Own Land in Abuja
          <br />
          <span className="text-gradient-gold">at 50% Off</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-body text-lg md:text-xl max-w-2xl mx-auto mb-10"
          style={{ color: "hsla(40,33%,98%,0.8)" }}
        >
          Secure your future in Abuja with Sapphire City, Gwagwalada.
          Verified, strategically accessible, and <span className="text-gold italic font-bold">50% off</span> for our anniversary season.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#contact"
            className="bg-gradient-gold text-primary-foreground px-8 py-4 rounded-full font-body font-semibold text-base shadow-gold hover:scale-105 transition-transform"
          >
            Book a Site Inspection
          </a>
          <a
            href="#pricing"
            className="glass-dark text-warm-white px-8 py-4 rounded-full font-body font-semibold text-base hover:scale-105 transition-transform"
          >
            View Pricing
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ArrowDown size={24} className="text-gold/60" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
