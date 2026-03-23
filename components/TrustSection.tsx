import { motion } from "framer-motion";
import { ShieldCheck, Award, Building2, BadgeCheck } from "lucide-react";
import Image from "next/image";

const badges = [
  { icon: ShieldCheck, title: "C of O Verified", desc: "Area Council / AGIS Verified documentation" },
  { icon: Building2, title: "Sapphire Group", desc: "A Gtext Company — 18 years of trust" },
  { icon: Award, title: "Proven Track Record", desc: "Thousands of satisfied landowners" },
  { icon: BadgeCheck, title: "100% Genuine", desc: "Complete transparency in all dealings" },
];

const trustStats = [
  { value: "18+", label: "Years in Real Estate" },
  { value: "1000+", label: "Happy Landowners" },
  { value: "100%", label: "Verified Documentation" },
];

const TrustSection = () => (
  <section className="py-20 bg-warm-cream">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
        {/* Left Column: Image & Legacy Visual */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative group"
        >
          <div className="relative z-10 overflow-hidden rounded-2xl aspect-[4/3] shadow-2xl">
            <Image
              src="/trust-legacy.png"
              alt="18 Years of Excellence"
              width={500}
              height={500}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>

          {/* Floating '18' Decorative Element */}
          <div className="absolute -bottom-6 -right-6 z-20 bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-xl">
            <span className="font-display text-7xl font-bold text-gradient-gold block leading-none">18</span>
            <span className="font-body text-xs uppercase tracking-widest text-foreground font-bold">Years of Trust</span>
          </div>

          {/* Decorative Rings */}
          <div className="absolute -top-10 -left-10 w-40 h-40 border-2 border-gold/10 rounded-full animate-pulse" />
          <div className="absolute -bottom-20 -right-20 w-60 h-60 border border-gold/5 rounded-full" />
        </motion.div>

        {/* Right Column: Content & Psychology Strategy */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-6"
        >
          <div>
            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 px-4 py-2 rounded-full mb-6">
              <span className="font-body text-sm font-semibold text-foreground uppercase tracking-wider">Est. 2008 — A Legacy of Integrity</span>
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              18 Years of <br />
              <span className="text-gradient-gold">Building Beyond Brick</span>
            </h2>
            <p className="font-body text-lg text-muted-foreground leading-relaxed">
              At Gtext and Sapphire Group, we don&apos;t just sell land; we deliver <span className="text-foreground font-semibold italic">certainty</span>. For nearly two decades, we have been the sanctuary for investors seeking transparency, genuine documentation, and the promise of a future built on solid ground.
            </p>
          </div>

          <div className="flex flex-col gap-4 mt-4">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-white/40 border border-gold/10">
              <div className="w-10 h-10 rounded-lg bg-gold/20 flex items-center justify-center shrink-0">
                <ShieldCheck size={20} className="text-gold" />
              </div>
              <div>
                <h4 className="font-display font-semibold text-foreground">Institutional Credibility</h4>
                <p className="font-body text-sm text-muted-foreground">Backed by Gtext&apos;s 18-year history of transparent transactions across Nigeria.</p>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-8 p-3 border-t border-gold/10">
              <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-[10px] font-bold text-gold border border-gold/20">
                18
              </div>
              <p className="font-body text-[10px] uppercase tracking-tighter text-muted-foreground font-semibold">
                Official Sapphire Sunset Anniversary Edition — 18 Years of Excellence
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
        {trustStats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group relative rounded-3xl border border-gold/10 bg-white/40 backdrop-blur-md p-8 text-center hover:border-gold/30 transition-all duration-500 shadow-xl overflow-hidden"
          >
            {/* Soft Glow */}
            <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <p className="relative z-10 font-display text-5xl font-bold text-gradient-gold mb-2">{stat.value}</p>
            <p className="relative z-10 font-body text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {badges.map((b, i) => (
          <motion.div
            key={b.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group glass-light rounded-[2rem] p-8 text-center hover:shadow-gold transition-all duration-500 border border-gold/5 hover:border-gold/20 flex flex-col items-center"
          >
            <div className="w-16 h-16 mb-6 rounded-2xl bg-gold/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-primary-foreground transform group-hover:rotate-[10deg] transition-all duration-500 shadow-inner">
              <b.icon size={28} strokeWidth={1.5} />
            </div>
            <h3 className="font-display text-lg font-bold text-foreground mb-3">{b.title}</h3>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustSection;
