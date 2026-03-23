import { motion } from "framer-motion";
import { MapPin, Clock } from "lucide-react";
import Image from "next/image";

const locations = [
  { name: "University of Abuja", time: "5 mins", color: "bg-green-500" },
  { name: "Teaching Hospital", time: "10 mins", color: "bg-blue-500" },
  { name: "Immigration Office", time: "8 mins", color: "bg-amber-500" },
  { name: "City Mart", time: "5 mins", color: "bg-rose-500" },
  { name: "Gwagwalada Town Centre", time: "7 mins", color: "bg-indigo-500" },
  { name: "Abuja City Centre", time: "30 mins", color: "bg-teal-500" },
];

const LocationSection = () => (
  <section id="location" className="py-20 bg-background">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Column: Stylized Map Visual */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative group order-2 lg:order-1"
        >
          <div className="relative z-10 overflow-hidden rounded-2xl aspect-square lg:aspect-[4/5] shadow-2xl border border-gold/20">
            <Image
              src="/map-abuja.png"
              alt="Strategic Location of Sapphire City"
              width={500}
              height={500}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent pointer-events-none" />
            
            {/* Floating 'Strategic' Badge */}
            <div className="absolute top-6 left-6 z-20 bg-gold/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg">
              <span className="font-display text-xs font-bold text-primary-foreground uppercase tracking-widest leading-none flex items-center gap-2">
                <MapPin size={12} /> The Heart of New Abuja
              </span>
            </div>
          </div>

          {/* Decorative Rings (Sync with Trust Section) */}
          <div className="absolute -top-10 -right-10 w-40 h-40 border-2 border-gold/10 rounded-full animate-pulse" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gold/5 rounded-full blur-3xl" />
        </motion.div>

        {/* Right Column: Distance & Proximity Content */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-8 order-1 lg:order-2"
        >
          <div>
            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 px-4 py-2 rounded-full mb-6">
              <span className="font-body text-sm font-semibold text-foreground uppercase tracking-wider">Strategic Accessibility</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Where Convenience <br />
              <span className="text-gradient-gold">Meets Connectivity</span>
            </h2>
            <p className="font-body text-lg text-muted-foreground leading-relaxed">
              Sapphire City is perfectly positioned in Gwagwalada, the rapidly growing educational and commercial hub of Abuja. Experience a sanctuary that keeps you connected to everything that matters.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {locations.map((loc, i) => (
              <motion.div
                key={loc.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-white/40 border border-gold/10 hover:border-gold/30 transition-colors"
              >
                <div className={`w-10 h-10 rounded-lg ${loc.color}/20 flex items-center justify-center shrink-0`}>
                  <MapPin size={18} className={loc.color.replace('bg-', 'text-')} />
                </div>
                <div>
                  <h4 className="font-display text-sm font-semibold text-foreground leading-tight">{loc.name}</h4>
                  <div className="flex items-center gap-1 mt-1 opacity-70">
                    <Clock size={12} />
                    <span className="font-body text-[11px] font-bold uppercase tracking-tighter">{loc.time} Away</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-4 p-4 rounded-2xl bg-charcoal text-warm-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-gold animate-ping" />
              <p className="font-body text-sm font-medium">Site Inspections Daily</p>
            </div>
            <a href="#contact" className="text-xs font-bold uppercase tracking-widest text-gold hover:underline">Book Now</a>
          </div>
        </motion.div>
      </div>
  </section>
);

export default LocationSection;
