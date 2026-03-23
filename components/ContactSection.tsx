import { motion } from "framer-motion";
import { Phone, Mail, MapPin, ChevronDown, Check } from "lucide-react";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

type ContactFormData = {
  fullName: string;
  phone: string;
  email: string;
  offer: string;
  plotsNeeded: string;
  message: string;
  website: string;
};

const sanitizeInput = (value: string) => value.replace(/[<>]/g, "").trim();
const normalizePhone = (value: string) =>
  value.replace(/[^\d+]/g, "").slice(0, 16);

const ContactSection = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: "",
    phone: "",
    email: "",
    offer: "",
    plotsNeeded: "1",
    message: "",
    website: "",
  });
  const [status, setStatus] = useState<string>("");
  const [offerOpen, setOfferOpen] = useState(false);
  const offerRef = useRef<HTMLDivElement | null>(null);

  const offerOptions = [
    "Mini Estate - N3,500,000",
    "Outright Payment - N5,000,000",
    "Installment Plan - N7,000,000",
  ];

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (!offerRef.current) return;
      if (!offerRef.current.contains(event.target as Node)) {
        setOfferOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const isValid = useMemo(() => {
    const nameOk =
      formData.fullName.length >= 2 && formData.fullName.length <= 80;
    const phoneOk = /^\+?\d{10,15}$/.test(formData.phone);
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    const offerOk = formData.offer.length > 0;
    const plotsOk =
      /^[1-9]\d*$/.test(formData.plotsNeeded) &&
      Number(formData.plotsNeeded) <= 20;
    const messageOk =
      formData.message.length >= 10 && formData.message.length <= 500;
    return nameOk && phoneOk && emailOk && offerOk && plotsOk && messageOk;
  }, [formData]);

  const updateField = (field: keyof ContactFormData, value: string) => {
    if (field === "phone") {
      setFormData((prev) => ({ ...prev, phone: normalizePhone(value) }));
      return;
    }
    if (field === "plotsNeeded") {
      setFormData((prev) => ({
        ...prev,
        plotsNeeded: value.replace(/[^\d]/g, "").slice(0, 2),
      }));
      return;
    }
    setFormData((prev) => ({ ...prev, [field]: sanitizeInput(value) }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.website) {
      setStatus("Submission blocked.");
      return;
    }

    if (!isValid) {
      setStatus("Please fill all fields correctly before submitting.");
      return;
    }

    const text = `Hello, I'm interested in this particular plot package.
My name is ${formData.fullName}.
Phone: ${formData.phone}
Email: ${formData.email}
Selected Plot Package: ${formData.offer}
Number of Plots Needed: ${formData.plotsNeeded}
Message: ${formData.message}`;
    const whatsAppUrl = `https://wa.me/2349155354626?text=${encodeURIComponent(text)}`;
    window.open(whatsAppUrl, "_blank", "noopener,noreferrer");
    setStatus("Opening WhatsApp with your secure message...");
  };

  return (
    <section id="contact" className="py-20 bg-gradient-dark">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold text-warm-white mb-4">
            Ready to <span className="text-gradient-gold">Invest?</span>
          </h2>
          <p className="font-body text-warm-white/60 mb-10">
            Get in touch today and take advantage of this exclusive 18th
            Anniversary offer.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                icon: Phone,
                label: "+234 809 307 5999",
                href: "tel:+2348093075999",
              },
              {
                icon: Mail,
                label: "info@sapphiregroupestate.com",
                href: "mailto:info@sapphiregroupestate.com",
              },
              { icon: MapPin, label: "Gwagwalada, Abuja", href: "#" },
            ].map((c) => (
              <a
                key={c.label}
                href={c.href}
                className="glass-dark rounded-2xl p-5 flex flex-col items-center gap-3 hover:shadow-gold transition-shadow"
              >
                <c.icon size={22} className="text-gold" />
                <span className="font-body text-sm text-warm-white/80 text-center break-all">
                  {c.label}
                </span>
              </a>
            ))}
          </div>

          <form
            onSubmit={handleSubmit}
            className="glass-dark rounded-3xl p-6 sm:p-7 text-left border border-gold/20 shadow-luxury"
          >
            <div className="mb-5">
              <p className="mt-1 font-body text-sm text-warm-white/65">
                Fill in your details and we will contact you quickly.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={(e) => updateField("fullName", e.target.value)}
                placeholder="Full Name"
                minLength={2}
                maxLength={80}
                required
                className="w-full rounded-xl bg-charcoal/55 text-warm-white placeholder:text-warm-white/45 px-4 py-3 font-body border border-white/15 shadow-inner shadow-black/10 outline-none transition-colors focus:border-gold focus:ring-2 focus:ring-gold/40"
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                placeholder="Phone Number"
                pattern="^\+?\d{10,15}$"
                required
                className="w-full rounded-xl bg-charcoal/55 text-warm-white placeholder:text-warm-white/45 px-4 py-3 font-body border border-white/15 shadow-inner shadow-black/10 outline-none transition-colors focus:border-gold focus:ring-2 focus:ring-gold/40"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
                placeholder="Email Address"
                required
                className="w-full sm:col-span-2 rounded-xl bg-charcoal/55 text-warm-white placeholder:text-warm-white/45 px-4 py-3 font-body border border-white/15 shadow-inner shadow-black/10 outline-none transition-colors focus:border-gold focus:ring-2 focus:ring-gold/40"
              />
              <div className="sm:col-span-2 relative" ref={offerRef}>
                <button
                  type="button"
                  onClick={() => setOfferOpen((prev) => !prev)}
                  className="w-full rounded-2xl bg-white text-charcoal px-4 py-3.5 font-body border border-white/20 shadow-inner shadow-black/25 outline-none transition-all duration-200 hover:border-gold/60 focus:border-gold focus:ring-2 focus:ring-gold/45 focus:shadow-[0_0_0_3px_hsla(var(--gold),0.18)] flex items-center justify-between gap-3 text-left"
                  aria-haspopup="listbox"
                  aria-expanded={offerOpen}
                  aria-label="Select Plot Package"
                >
                  <span className={formData.offer ? "text-charcoal" : "text-charcoal/55"}>
                    {formData.offer || "Select Plot Package"}
                  </span>
                  <span
                    className={`inline-flex h-7 w-7 items-center justify-center rounded-md bg-gold/10 text-gold transition-all ${
                      offerOpen ? "rotate-180 bg-gold/20" : ""
                    }`}
                  >
                    <ChevronDown size={16} />
                  </span>
                </button>
                <input type="hidden" name="offer" value={formData.offer} required />
                {offerOpen && (
                  <div
                    className="absolute z-30 mt-2 w-full rounded-xl border border-gold/30 bg-white shadow-[0_20px_50px_-20px_hsla(var(--gold),0.45)] p-1.5"
                    role="listbox"
                  >
                    {offerOptions.map((option) => {
                      const active = formData.offer === option;
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => {
                            updateField("offer", option);
                            setOfferOpen(false);
                          }}
                          className={`w-full rounded-lg px-3 py-2.5 text-sm flex items-center justify-between gap-3 transition-colors ${
                            active
                              ? "bg-gold/15 text-[#1f1b17]"
                              : "text-[#1f1b17] hover:bg-black/5"
                          }`}
                          role="option"
                          aria-selected={active}
                        >
                          <span>{option}</span>
                          {active && <Check size={16} />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
              <p className="sm:col-span-2 -mt-1 text-xs text-warm-white/60 font-body">
                This selection is for the plot package you want to buy.
              </p>
              <input
                type="number"
                name="plotsNeeded"
                value={formData.plotsNeeded}
                onChange={(e) => updateField("plotsNeeded", e.target.value)}
                placeholder="Number of Plots Needed"
                min={1}
                max={20}
                required
                className="w-full sm:col-span-2 rounded-xl bg-charcoal/55 text-warm-white placeholder:text-warm-white/45 px-4 py-3 font-body border border-white/15 shadow-inner shadow-black/10 outline-none transition-colors focus:border-gold focus:ring-2 focus:ring-gold/40"
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={(e) => updateField("message", e.target.value)}
                placeholder="Additional details (location preference, timeline, questions)"
                minLength={10}
                maxLength={500}
                rows={4}
                required
                className="w-full sm:col-span-2 rounded-xl bg-charcoal/55 text-warm-white placeholder:text-warm-white/45 px-4 py-3 font-body border border-white/15 shadow-inner shadow-black/10 outline-none transition-colors focus:border-gold focus:ring-2 focus:ring-gold/40 resize-none"
              />
            </div>

            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={(e) => updateField("website", e.target.value)}
              autoComplete="off"
              tabIndex={-1}
              className="hidden"
              aria-hidden="true"
            />

            <button
              type="submit"
              disabled={!isValid}
              className="mt-5 w-full bg-gradient-gold disabled:opacity-60 disabled:cursor-not-allowed text-primary-foreground px-8 py-3.5 rounded-xl font-body font-bold shadow-gold hover:scale-[1.01] transition-transform"
            >
              Submit Securely
            </button>

            {status && (
              <p className="mt-3 text-sm text-warm-white/70 text-center">
                {status}
              </p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
