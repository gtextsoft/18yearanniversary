import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
const estateAerial = "/estate-aerial.jpg";
const estateRoad = "/estate-road.jpg";
const estateGate = "/estate-gate.jpg";
const roadAccessibility = "/gallery-accessibility.png";

const GallerySection = () => {
  const [selected, setSelected] = useState<number | null>(null);

  const images = [
    { src: estateGate, label: "Premium Entrance", className: "md:col-span-2 md:row-span-2" },
    // { src: "/placeholder.svg", label: "Luxury Living", className: "md:col-span-2 md:row-span-2" },
    // { src: "/placeholder.svg", label: "Family Sanctuary", className: "md:col-span-2 md:row-span-1" },
    { src: estateAerial, label: "Aerial Overview", className: "md:col-span-1 md:row-span-1" },
    { src: roadAccessibility, label: "Road Accessibility", className: "md:col-span-1 md:row-span-1" },
    { src: estateRoad, label: "Modern Infrastructure", className: "md:col-span-2 md:row-span-1" },
  ];

  return (
    <section id="gallery" className="py-24 bg-warm-cream overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 px-4 py-2 rounded-full mb-6">
            <span className="font-body text-sm font-semibold text-foreground uppercase tracking-wider">Visual Experience</span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6">
            A Glimpse into <br />
            <span className="text-gradient-gold">Luxury Living</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto">
            Explore the meticulously planned environment where every detail is designed for your comfort and prestige.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[250px]">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              onClick={() => setSelected(i)}
              className={`relative rounded-3xl overflow-hidden cursor-pointer group shadow-xl ${img.className}`}
            >
              <img
                src={img.src}
                alt={img.label}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-6">
                <div>
                  <p className="font-display text-lg font-bold text-warm-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {img.label}
                  </p>
                  <p className="font-body text-xs text-gold font-medium uppercase tracking-widest mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                    View Perspective
                  </p>
                </div>
              </div>
              
              {/* Decorative Border on Hover */}
              <div className="absolute inset-0 border-2 border-gold/0 group-hover:border-gold/30 transition-colors duration-500 rounded-3xl" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-charcoal/95 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <button className="absolute top-6 right-6 text-warm-white" onClick={() => setSelected(null)}>
              <X size={32} />
            </button>
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              src={images[selected].src}
              alt={images[selected].label}
              className="max-w-full max-h-[85vh] rounded-2xl object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
