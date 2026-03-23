import { motion } from "framer-motion";
import { TrendingUp, MapPin, Landmark, BarChart3 } from "lucide-react";

const reasons = [
  { icon: TrendingUp, title: "High ROI Potential", desc: "Property values in Gwagwalada have grown over 300% in the last decade." },
  { icon: MapPin, title: "Strategic Location", desc: "Situated within the Federal Capital Territory with direct access to major highways." },
  { icon: Landmark, title: "Government Hub", desc: "Proximity to federal institutions drives consistent demand and appreciation." },
  { icon: BarChart3, title: "Fast-Developing Area", desc: "Rapid infrastructure development means your investment grows with the area." },
];

const WhyInvestSection = () => (
  <section className="py-20 bg-background">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 px-4 py-2 rounded-full mb-6">
          <span className="font-body text-sm font-semibold text-foreground uppercase tracking-wider">A Gtext Opportunity</span>
        </div>
        <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6">
          Why <span className="text-gradient-gold">Invest with Us?</span>
        </h2>
        <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
          For 18 years, we have mastered the art of identifying high-growth corridors. Your investment isn&apos;t just in land; it&apos;s in a legacy of appreciation.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {reasons.map((r, i) => (
          <motion.div
            key={r.title}
            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="flex gap-5 items-start"
          >
            <div className="w-14 h-14 shrink-0 rounded-2xl bg-gradient-gold flex items-center justify-center shadow-gold">
              <r.icon size={22} className="text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-foreground mb-2">{r.title}</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Growth Visual */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-20 max-w-4xl mx-auto relative group"
      >
        <div className="glass rounded-[2.5rem] p-10 md:p-14 relative z-10 border border-gold/20 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h3 className="font-display text-2xl font-bold text-foreground">
                Value Growth Projection
              </h3>
              <p className="font-body text-sm text-muted-foreground mt-1">Gwagwalada Corridor Appreciation Trend</p>
            </div>
            <div className="bg-gold/10 px-4 py-2 rounded-xl border border-gold/20 flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-gold animate-pulse" />
              <span className="font-body text-xs font-bold text-foreground uppercase tracking-wider">+300% Forecast</span>
            </div>
          </div>
          
          <div className="flex items-end justify-between gap-2 md:gap-4 h-56">
          {[
            { year: "2020", h: "25%", val: "₦2M" },
            { year: "2021", h: "35%", val: "₦3M" },
            { year: "2022", h: "45%", val: "₦4M" },
            { year: "2023", h: "55%", val: "₦5M" },
            { year: "2024", h: "70%", val: "₦7M" },
            { year: "2025", h: "85%", val: "₦9M" },
            { year: "2026", h: "100%", val: "₦12M" },
          ].map((bar, i) => (
            <motion.div
              key={bar.year}
              initial={{ height: 0 }}
              whileInView={{ height: bar.h }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="flex-1 bg-gradient-gold rounded-t-lg relative group cursor-pointer"
            >
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 font-body text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {bar.val}
              </div>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 font-body text-xs text-muted-foreground">
                {bar.year}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative Rings (Sync with Trust Section) */}
      <div className="absolute -top-12 -left-12 w-48 h-48 border border-gold/10 rounded-full animate-pulse pointer-events-none" />
      <div className="absolute -bottom-16 -right-16 w-64 h-64 border border-gold/5 rounded-full pointer-events-none" />
    </motion.div>
  </div>
</section>
);

export default WhyInvestSection;
