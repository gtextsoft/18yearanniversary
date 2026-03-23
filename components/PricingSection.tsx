import { motion } from "framer-motion";
import { Check, Zap } from "lucide-react";

const plans = [
  {
    title: "Outright Payment",
    oldPrice: "₦10,000,000",
    newPrice: "₦5,000,000",
    features: ["Full plot (600sqm)", "C of O included", "Immediate allocation", "Free survey plan"],
    highlight: false,
  },
  {
    title: "Installment Plan",
    oldPrice: "₦14,000,000",
    newPrice: "₦7,000,000",
    features: ["Full plot (600sqm)", "Up to 12 months", "C of O included", "Flexible payment"],
    highlight: false,
  },
  {
    title: "Mini Estate",
    oldPrice: "₦7,000,000",
    newPrice: "₦3,500,000",
    features: ["300sqm plot", "C of O included", "Gated community", "Good road network"],
    highlight: true,
  },
];

const PricingSection = () => (
  <section id="pricing" className="py-20 bg-gradient-dark">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 px-4 py-2 rounded-full mb-6 text-gold">
          <Zap size={14} className="animate-pulse" />
          <span className="font-body text-sm font-semibold uppercase tracking-wider">Anniversary Flash Sale — 50% Secured</span>
        </div>
        <h2 className="font-display text-4xl md:text-7xl font-bold text-warm-white mb-6 leading-tight">
          Exceptional Value, <br />
          <span className="text-gradient-gold">Limited Opportunity</span>
        </h2>
        <p className="font-body text-lg text-warm-white/60 max-w-2xl mx-auto">
          In honor of Gtext&apos;s 18-year legacy, we are offering an unprecedented entry point into Abuja&apos;s most prestigious development corridor.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className={`rounded-3xl p-8 relative group hover:-translate-y-2 transition-all duration-300 ${
              plan.highlight
                ? "bg-gradient-gold shadow-gold scale-[1.03]"
                : "glass-dark"
            }`}
          >
            {plan.highlight && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-charcoal text-gold text-xs font-body font-bold px-4 py-1 rounded-full">
                MOST POPULAR
              </div>
            )}
            <h3
              className={`font-display text-xl font-bold mb-6 ${
                plan.highlight ? "text-primary-foreground" : "text-warm-white"
              }`}
            >
              {plan.title}
            </h3>
            <div className="mb-6">
              <span
                className={`font-body text-sm line-through ${
                  plan.highlight ? "text-primary-foreground/50" : "text-warm-white/40"
                }`}
              >
                {plan.oldPrice}
              </span>
              <div
                className={`font-display text-4xl font-bold mt-1 ${
                  plan.highlight ? "text-primary-foreground" : "text-gradient-gold"
                }`}
              >
                {plan.newPrice}
              </div>
            </div>
            <ul className="space-y-3 mb-8">
              {plan.features.map((f) => (
                <li
                  key={f}
                  className={`flex items-center gap-2 font-body text-sm ${
                    plan.highlight ? "text-primary-foreground/90" : "text-warm-white/70"
                  }`}
                >
                  <Check size={16} className={plan.highlight ? "text-primary-foreground" : "text-gold"} />
                  {f}
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className={`block text-center font-body font-semibold py-3 rounded-full transition-transform hover:scale-105 ${
                plan.highlight
                  ? "bg-charcoal text-gold"
                  : "bg-gradient-gold text-primary-foreground shadow-gold"
              }`}
            >
              Secure This Plot
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default PricingSection;
