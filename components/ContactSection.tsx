import { motion } from "framer-motion";
import { Phone, Mail, MapPin, ChevronDown, Check } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";

type ContactFormData = {
  fullName: string;
  phone: string;
  email: string;
  offer: string;
  plotsNeeded: string;
  message: string;
  website: string;
};
type ContactFormField =
  | "fullName"
  | "phone"
  | "email"
  | "offer"
  | "plotsNeeded"
  | "message";
type FieldErrors = Partial<Record<ContactFormField, string>>;
type FeedbackModalState = {
  isOpen: boolean;
  type: "loading" | "success";
  message: string;
};

const sanitizeInput = (value: string) => value.replace(/[<>]/g, "");
const normalizePhone = (value: string) =>
  value.replace(/[^\d+]/g, "").slice(0, 16);
const offerOptions = [
  "Mini Estate - N3,500,000 (6 Plots)",
  "Outright Payment - N5,000,000 (Per Plot)",
  "Installment Plan - N7,000,000 (Per Plot)",
] as const;
const isOfferOption = (value: string): value is (typeof offerOptions)[number] =>
  offerOptions.includes(value as (typeof offerOptions)[number]);
const getUnitLabel = (offer: string) =>
  offer === "Mini Estate - N3,500,000 (6 Plots)" ? "Estate" : "Plot";

const FeedbackModal = ({
  isOpen,
  type,
  message,
  onClose,
}: FeedbackModalState & { onClose: () => void }) => {
  if (!isOpen) return null;

  const isLoading = type === "loading";

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/65 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-gold/25 bg-charcoal p-6 text-center shadow-2xl">
        {isLoading ? (
          <div
            className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center"
            role="status"
            aria-label="Loading"
          >
            <div
              className="absolute inset-0 rounded-full border-[3px]"
              style={{
                borderColor: "hsla(var(--gold), 0.18)",
                boxShadow: "0 0 24px hsla(var(--gold), 0.15)",
              }}
            />
            <div
              className="absolute inset-0 animate-spin rounded-full border-[3px] border-transparent"
              style={{
                borderTopColor: "hsl(var(--gold))",
                borderRightColor: "hsla(var(--gold), 0.45)",
                animationDuration: "0.75s",
                animationTimingFunction: "cubic-bezier(0.5, 0, 0.5, 1)",
                filter: "drop-shadow(0 0 6px hsla(var(--gold), 0.5))",
              }}
            />
            <div
              className="h-2 w-2 animate-pulse rounded-full"
              style={{
                background: "hsl(var(--gold))",
                boxShadow: "0 0 12px hsla(var(--gold), 0.7)",
              }}
            />
          </div>
        ) : (
          <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-gold/20 text-gold">
            <Check size={18} />
          </div>
        )}
        <p className="font-body text-sm text-warm-white/90">{message}</p>
        {!isLoading && (
          <button
            type="button"
            onClick={onClose}
            className="mt-5 w-full rounded-xl bg-gradient-gold px-4 py-2.5 font-body font-bold text-primary-foreground"
          >
            Close
          </button>
        )}
      </div>
    </div>
  );
};

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
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackModal, setFeedbackModal] = useState<FeedbackModalState>({
    isOpen: false,
    type: "loading",
    message: "",
  });
  const [offerOpen, setOfferOpen] = useState(false);
  const offerRef = useRef<HTMLDivElement | null>(null);
  const unitLabel = getUnitLabel(formData.offer);
  const unitLabelLower = unitLabel.toLowerCase();

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

  const getValidationErrors = () => {
    const errors: string[] = [];
    const nextFieldErrors: FieldErrors = {};
    const cleanName = formData.fullName.trim();
    const cleanMessage = formData.message.trim();

    if (cleanName.length < 2 || cleanName.length > 80) {
      const message = "Enter a valid full name (2-80 characters).";
      errors.push(message);
      nextFieldErrors.fullName = message;
    }
    if (!/^\+?\d{10,15}$/.test(formData.phone)) {
      const message = "Enter a valid phone number (10-15 digits).";
      errors.push(message);
      nextFieldErrors.phone = message;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      const message = "Enter a valid email address.";
      errors.push(message);
      nextFieldErrors.email = message;
    }
    if (!isOfferOption(formData.offer)) {
      const message = "Select a plot package.";
      errors.push(message);
      nextFieldErrors.offer = message;
    }
    if (
      !/^[1-9]\d*$/.test(formData.plotsNeeded) ||
      Number(formData.plotsNeeded) > 20
    ) {
      const message = `Number of ${unitLabelLower}s must be between 1 and 20.`;
      errors.push(message);
      nextFieldErrors.plotsNeeded = message;
    }
    if (cleanMessage.length > 0 && cleanMessage.length < 10) {
      const message =
        "Additional details must be at least 10 characters if provided.";
      errors.push(message);
      nextFieldErrors.message = message;
    }

    return { errors, nextFieldErrors };
  };

  const updateField = (field: keyof ContactFormData, value: string) => {
    if (field === "phone") {
      setFieldErrors((prev) => ({ ...prev, phone: undefined }));
      setFormData((prev) => ({ ...prev, phone: normalizePhone(value) }));
      return;
    }
    if (field === "plotsNeeded") {
      setFieldErrors((prev) => ({ ...prev, plotsNeeded: undefined }));
      setFormData((prev) => ({
        ...prev,
        plotsNeeded: value.replace(/[^\d]/g, "").slice(0, 2),
      }));
      return;
    }
    if (field !== "website") {
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    setFormData((prev) => ({ ...prev, [field]: sanitizeInput(value) }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.website) {
      setStatus("Submission blocked.");
      return;
    }

    const validationResult = getValidationErrors();
    const validationErrors = validationResult.errors;
    if (validationErrors.length > 0) {
      setFieldErrors(validationResult.nextFieldErrors);
      setStatus("");
      return;
    }
    setFieldErrors({});

    try {
      setIsSubmitting(true);
      setStatus("");
      setFeedbackModal({
        isOpen: true,
        type: "loading",
        message: "Saving your details...",
      });

      const { plotsNeeded, ...formRest } = formData;
      const payload = {
        ...formRest,
        quantity: Number(plotsNeeded),
        source: "landing-page-contact-form",
      };

      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(
          errorData?.error || `Request failed with status ${response.status}`,
        );
      }

      const text = `Hello, I'm interested in this particular plot package.
My name is ${formData.fullName}.
Phone: ${formData.phone}
Email: ${formData.email}
Selected Plot Package: ${formData.offer}
Number of ${unitLabel}s Needed: ${formData.plotsNeeded}
Additional details: ${formData.message || "N/A"}`;
      const whatsAppUrl = `https://wa.me/2349155354626?text=${encodeURIComponent(text)}`;
      window.open(whatsAppUrl, "_blank", "noopener,noreferrer");

      setFeedbackModal({
        isOpen: true,
        type: "success",
        message: "Saved successfully. Opening WhatsApp with your secure message...",
      });
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        offer: "",
        plotsNeeded: "1",
        message: "",
        website: "",
      });
      setFieldErrors({});
    } catch (error) {
      console.error("Contact form submission failed:", error);
      const message =
        error instanceof Error
          ? error.message
          : "Could not save your details. Please try again.";
      setStatus(message);
      setFeedbackModal((prev) => ({ ...prev, isOpen: false }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-dark">
      <FeedbackModal
        isOpen={feedbackModal.isOpen}
        type={feedbackModal.type}
        message={feedbackModal.message}
        onClose={() =>
          setFeedbackModal((prev) => ({
            ...prev,
            isOpen: false,
          }))
        }
      />
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
            noValidate
            className="glass-dark rounded-3xl p-6 sm:p-7 text-left border border-gold/20 shadow-luxury"
          >
            <div className="mb-5">
              <p className="mt-1 font-body text-sm text-warm-white/65">
                Fill in your details and we will contact you quickly.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="fullName"
                  className="font-body text-sm text-warm-white/65"
                >
                  Full Name
                </label>
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
                {fieldErrors.fullName && (
                  <p className="sm:col-span-2 mt-2 text-xs text-red-300 font-body">
                    {fieldErrors.fullName}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="phone"
                  className="font-body text-sm text-warm-white/65"
                >
                  Phone Number
                </label>
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
                {fieldErrors.phone && (
                  <p className="sm:col-span-2 mt-2 text-xs text-red-300 font-body">
                    {fieldErrors.phone}
                  </p>
                )}
              </div>
              <div className="flex w-full flex-col gap-1 sm:col-span-2">
                <label
                  htmlFor="email"
                  className="font-body text-sm text-warm-white/65"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder="Email Address"
                  required
                  className="w-full sm:col-span-2 rounded-xl bg-charcoal/55 text-warm-white placeholder:text-warm-white/45 px-4 py-3 font-body border border-white/15 shadow-inner shadow-black/10 outline-none transition-colors focus:border-gold focus:ring-2 focus:ring-gold/40"
                />
                {fieldErrors.email && (
                  <p className="sm:col-span-2 mt-2 text-xs text-red-300 font-body">
                    {fieldErrors.email}
                  </p>
                )}
              </div>
              <div className="sm:col-span-2 relative" ref={offerRef}>
                <button
                  type="button"
                  onClick={() => setOfferOpen((prev) => !prev)}
                  className="w-full rounded-2xl bg-white text-charcoal px-4 py-3.5 font-body border border-white/20 shadow-inner shadow-black/25 outline-none transition-all duration-200 hover:border-gold/60 focus:border-gold focus:ring-2 focus:ring-gold/45 focus:shadow-[0_0_0_3px_hsla(var(--gold),0.18)] flex items-center justify-between gap-3 text-left"
                  aria-haspopup="listbox"
                  aria-expanded={offerOpen}
                  aria-label="Select Plot Package"
                >
                  <span
                    className={
                      formData.offer ? "text-charcoal" : "text-charcoal/55"
                    }
                  >
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
                <input
                  type="hidden"
                  name="offer"
                  value={formData.offer}
                  required
                />
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
              {fieldErrors.offer && (
                <p className="sm:col-span-2 -mt-2 text-xs text-red-300 font-body">
                  {fieldErrors.offer}
                </p>
              )}
              <p className="sm:col-span-2 -mt-1 text-xs text-warm-white/60 font-body">
                This selection is for the package you want to buy.
              </p>
              <input
                type="number"
                name="plotsNeeded"
                value={formData.plotsNeeded}
                onChange={(e) => updateField("plotsNeeded", e.target.value)}
                placeholder={`Number of ${unitLabel}s Needed`}
                min={1}
                max={20}
                required
                className="w-full sm:col-span-2 rounded-xl bg-charcoal/55 text-warm-white placeholder:text-warm-white/45 px-4 py-3 font-body border border-white/15 shadow-inner shadow-black/10 outline-none transition-colors focus:border-gold focus:ring-2 focus:ring-gold/40"
              />
              {fieldErrors.plotsNeeded && (
                <p className="sm:col-span-2 -mt-2 text-xs text-red-300 font-body">
                  {fieldErrors.plotsNeeded}
                </p>
              )}
              <textarea
                name="message"
                value={formData.message}
                onChange={(e) => updateField("message", e.target.value)}
                placeholder="Additional details (optional: location preference, timeline, questions)"
                maxLength={500}
                rows={4}
                className="w-full sm:col-span-2 rounded-xl bg-charcoal/55 text-warm-white placeholder:text-warm-white/45 px-4 py-3 font-body border border-white/15 shadow-inner shadow-black/10 outline-none transition-colors focus:border-gold focus:ring-2 focus:ring-gold/40 resize-none"
              />
              {fieldErrors.message && (
                <p className="sm:col-span-2 -mt-2 text-xs text-red-300 font-body">
                  {fieldErrors.message}
                </p>
              )}
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
              disabled={isSubmitting}
              className="mt-5 w-full bg-gradient-gold disabled:opacity-60 disabled:cursor-not-allowed text-primary-foreground px-8 py-3.5 rounded-xl font-body font-bold shadow-gold hover:scale-[1.01] transition-transform"
            >
              {isSubmitting ? "Submitting..." : "Submit Securely"}
            </button>

            {/* {status && (
              <p className="mt-3 text-sm text-warm-white/70 text-center">
                {status}
              </p>
            )} */}
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
