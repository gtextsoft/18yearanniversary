import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";

const TARGET_DATE = new Date("2026-03-29T23:59:59").getTime();

const UrgencySection = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, TARGET_DATE - Date.now());
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        mins: Math.floor((diff % 3600000) / 60000),
        secs: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.mins },
    { label: "Seconds", value: timeLeft.secs },
  ];

  return (
    <section className="py-20 bg-gradient-dark relative overflow-hidden">
      {/* Decorative glow (Gold for Anniversary) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, #EAB308 0%, transparent 70%)" }}
      />
      
      {/* Decorative Rings (Sync with Trust Section) */}
      <div className="absolute top-10 left-10 w-96 h-96 border border-gold/10 rounded-full animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-64 h-64 border border-gold/5 rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 px-4 py-2 rounded-full mb-6 text-gold">
            <Zap size={14} className="animate-pulse" />
            <span className="font-body text-sm font-bold uppercase tracking-wider">Gtext 18th Heritage Event</span>
          </div>

          <h2 className="font-display text-4xl md:text-7xl font-bold text-warm-white mb-10 leading-tight">
            The Window of <br />
            <span className="text-gradient-gold">Opportunity is Closing</span>
          </h2>

          <div className="flex justify-center gap-4 md:gap-6 mb-12">
            {units.map((u) => (
              <div key={u.label} className="glass-dark rounded-2xl px-5 py-4 md:px-8 md:py-6 min-w-[70px]">
                <div className="font-display text-3xl md:text-5xl font-bold text-gradient-gold">
                  {String(u.value).padStart(2, "0")}
                </div>
                <div className="font-body text-xs text-warm-white/50 mt-1">{u.label}</div>
              </div>
            ))}
          </div>

          <a
            href="#contact"
            className="inline-block bg-gradient-gold text-primary-foreground px-10 py-4 rounded-full font-body font-bold text-lg shadow-gold hover:scale-105 transition-transform animate-pulse_glow"
          >
            Secure Your Plot Now
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default UrgencySection;
