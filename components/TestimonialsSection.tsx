import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Engr. Abubakar M.",
    role: "Property Investor",
    text: "I purchased 3 plots in Sapphire City in 2022. The value has doubled already. This is the smartest investment I've made.",
  },
  {
    name: "Mrs. Chidinma O.",
    role: "Business Owner",
    text: "The process was seamless — from inspection to documentation. Sapphire Group truly delivers on their promise.",
  },
  {
    name: "Dr. Ibrahim K.",
    role: "Medical Practitioner",
    text: "The proximity to the Teaching Hospital made this an easy decision. My family and I are building our dream home here.",
  },
];

const TestimonialsSection = () => (
  <section className="py-20 bg-background">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 px-4 py-2 rounded-full mb-6">
          <span className="font-body text-sm font-semibold text-foreground uppercase tracking-wider">Social Proof of Legacy</span>
        </div>
        <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6">
          Stories of <span className="text-gradient-gold">Success</span>
        </h2>
        <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
          Join thousands of families and investors who have secured their wealth through Gtext&apos;s 18-year commitment to excellence.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="glass rounded-2xl p-7 hover:shadow-gold transition-shadow duration-300"
          >
            <Quote size={24} className="text-gold/30 mb-4" />
            <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6">
              "{t.text}"
            </p>
            <div className="flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, j) => (
                <Star key={j} size={14} className="text-gold fill-gold" />
              ))}
            </div>
            <p className="font-display text-sm font-bold text-foreground">{t.name}</p>
            <p className="font-body text-xs text-muted-foreground">{t.role}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
