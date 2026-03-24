import { z } from "zod";

export const OFFER_OPTIONS = [
  "Mini Estate - N3,500,000 (6 Plots)",
  "Outright Payment - N5,000,000 (Per Plot)",
  "Installment Plan - N7,000,000 (Per Plot)",
] as const;

export const MINI_ESTATE_OFFER = OFFER_OPTIONS[0];

const sanitize = (value: string) => value.replace(/[<>]/g, "").trim();

export const contactLeadSchema = z
  .object({
    fullName: z
      .string()
      .min(2, "Full name must be at least 2 characters.")
      .max(80, "Full name must be at most 80 characters.")
      .transform(sanitize),
    phone: z
      .string()
      .regex(/^\+?\d{10,15}$/, "Phone number format is invalid.")
      .transform((value) => value.trim()),
    email: z
      .string()
      .email("Email address is invalid.")
      .max(120, "Email address is too long.")
      .transform((value) => value.trim().toLowerCase()),
    offer: z
      .string()
      .refine(
        (value): value is (typeof OFFER_OPTIONS)[number] =>
          OFFER_OPTIONS.includes(value as (typeof OFFER_OPTIONS)[number]),
        "Please select a valid plot package.",
      ),
    quantity: z
      .number({ error: "Quantity must be a number." })
      .int("Quantity must be a whole number.")
      .min(1, "Quantity must be at least 1.")
      .max(20, "Quantity must be 20 or less."),
    message: z
      .string()
      .max(500, "Message must be at most 500 characters.")
      .transform(sanitize)
      .refine(
        (value) => value.length === 0 || value.length >= 10,
        "Message must be at least 10 characters when provided.",
      )
      .optional()
      .default(""),
    website: z
      .string()
      .max(0, "Spam detected.")
      .optional()
      .default(""),
    source: z.string().max(60).optional().default("landing-page-contact-form"),
  })
  .strict();

export type ContactLeadInput = z.infer<typeof contactLeadSchema>;
