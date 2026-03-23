import { motion } from "framer-motion";
import { Route, ShieldCheck, Droplets, TrendingUp } from "lucide-react";
import Image from "next/image";
const estateRoad = "/estate-road.jpg";
const estateGate = "/estate-gate.jpg";
const estateAerial = "/estate-aerial.jpg";
const heroBg = "/hero-bg.jpg";

const features = [
  { icon: Route, title: "Good Road Network", desc: "Well-paved internal roads", img: estateRoad },
  { icon: ShieldCheck, title: "Secure Environment", desc: "24/7 security & gated access", img: estateGate },
  { icon: Droplets, title: "100% Dry Land", desc: "No flooding — build with confidence", img: estateAerial },
  { icon: TrendingUp, title: "High ROI Potential", desc: "Value appreciates year on year", img: heroBg },
];

const EstateFeatures = () => (
  <section id="features" className="py-20 bg-warm-cream">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
          Estate <span className="text-gradient-gold">Features</span>
        </h2>
        <p className="font-body text-muted-foreground max-w-xl mx-auto">
          A premium development designed for modern living and smart investment.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group relative rounded-2xl overflow-hidden h-64 cursor-pointer"
          >
            <Image
              src={f.img}
              alt={f.title}
              width={500}
              height={500}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-gold flex items-center justify-center">
                  <f.icon size={18} className="text-primary-foreground" />
                </div>
                <h3 className="font-display text-lg font-bold text-warm-white">{f.title}</h3>
              </div>
              <p className="font-body text-sm text-warm-white/70">{f.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default EstateFeatures;
