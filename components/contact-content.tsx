"use client";

import { useActionState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  heroContainer,
  heroItem,
  staggerContainer,
  fadeInUp,
} from "@/lib/animations";
import { Send } from "lucide-react";
import { submitContactMessage, type ContactFormState } from "@/app/contact/actions";

const initialContactFormState: ContactFormState = {
  status: "idle",
  message: "",
};

interface ContactContentProps {
  email: string;
  location: string;
  socials: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
}

export function ContactContent({ email, location, socials }: ContactContentProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, pending] = useActionState(
    submitContactMessage,
    initialContactFormState,
  );

  useEffect(() => {
    if (state.status === "success" && state.submittedAt) {
      formRef.current?.reset();
    }
  }, [state.status, state.submittedAt]);

  return (
    <div className="flex-grow pt-32 pb-[120px] px-[5vw] max-w-[1280px] mx-auto w-full flex flex-col mt-[120px]">
      {/* Ambient Background */}
      <div className="fixed inset-0 z-[-1] pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.08 }}
          transition={{ duration: 2 }}
          className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-secondary rounded-full blur-[120px]"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.06 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-tertiary rounded-full blur-[150px]"
        />
      </div>

      {/* ═══ Header ═══ */}
      <motion.div
        variants={heroContainer}
        initial="hidden"
        animate="visible"
        className="mb-12 max-w-2xl"
      >
        <motion.h1
          variants={heroItem}
          className="font-[Inter] text-[clamp(40px,6vw,64px)] font-extrabold leading-[1.1] tracking-[-0.04em] text-on-surface mb-3 drop-shadow-lg"
        >
          Let&apos;s Build
          <br />
          The Future.
        </motion.h1>
        <motion.p
          variants={heroItem}
          className="font-[Inter] text-lg leading-[1.6] text-on-surface-variant opacity-80"
        >
          Have a project in mind or seeking technical expertise? Initiate contact
          below. Direct inquiries prioritized.
        </motion.p>
      </motion.div>

      {/* ═══ Bento Grid ═══ */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
      >
        {/* Left Info Panel */}
        <motion.div
          variants={fadeInUp}
          className="lg:col-span-5 glass-panel rounded-xl p-12 flex flex-col justify-between h-full relative overflow-hidden group"
        >
          {/* Internal glow */}
          <div className="absolute -top-32 -left-32 w-64 h-64 bg-secondary rounded-full opacity-5 blur-[80px] group-hover:opacity-10 transition-opacity duration-700" />

          <div className="relative z-10 space-y-6">
            <div>
              <h3 className="font-[Space_Grotesk] text-xs font-bold tracking-[0.1em] text-secondary mb-2 uppercase">
                Direct Line
              </h3>
              <a
                href={`mailto:${email}`}
                className="font-[Inter] text-lg md:text-xl font-semibold text-on-surface hover:text-tertiary transition-colors duration-300"
              >
                {email}
              </a>
            </div>

            <div className="pt-3">
              <h3 className="font-[Space_Grotesk] text-xs font-bold tracking-[0.1em] text-secondary mb-2 uppercase">
                Base of Operations
              </h3>
              <p className="font-[Inter] text-base text-on-surface-variant flex items-center gap-2">
                <span
                  className="material-symbols-outlined text-tertiary text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  location_on
                </span>
                {location}
              </p>
            </div>
          </div>

          <div className="relative z-10 pt-12 mt-12 border-t border-outline-variant/30">
            <h3 className="font-[Space_Grotesk] text-xs font-bold tracking-[0.1em] text-on-surface-variant mb-4 uppercase">
              Network Signals
            </h3>
            <div className="flex gap-4">
              {[
                { icon: "hub", color: "secondary", href: socials.linkedin },
                {
                  icon: "terminal",
                  color: "tertiary",
                  href: socials.github,
                },
                {
                  icon: "photo_camera",
                  color: "tertiary",
                  href: socials.instagram,
                },
              ]
                .filter((social) => social.href)
                .map((social) => (
                  <a
                    key={social.icon}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 rounded-full border border-outline-variant/40 flex items-center justify-center text-on-surface-variant hover:text-${social.color} hover:bg-${social.color}/5 hover:border-${social.color}/30 transition-all duration-300`}
                  >
                    <span className="material-symbols-outlined">
                      {social.icon}
                    </span>
                  </a>
                ))}
            </div>
          </div>
        </motion.div>

        {/* Right Form Panel */}
        <motion.div
          variants={fadeInUp}
          className="lg:col-span-7 glass-panel-strong rounded-xl p-12"
        >
          <form
            ref={formRef}
            action={formAction}
            className="space-y-8 flex flex-col h-full"
          >
            {/* Name */}
            <div className="relative group">
              <label
                htmlFor="name"
                className="font-[Space_Grotesk] text-xs font-bold tracking-[0.1em] text-on-surface-variant uppercase absolute -top-2 left-0 text-[10px] opacity-0 group-focus-within:opacity-100 group-focus-within:-top-4 transition-all duration-300"
              >
                Identification
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Name or Alias"
                required
                minLength={2}
                maxLength={80}
                className="w-full bg-transparent border-0 border-b border-outline-variant/40 py-3 px-0 text-on-surface font-[Inter] text-base focus:ring-0 focus:border-tertiary placeholder:text-on-surface-variant/50 transition-colors duration-300"
              />
              {state.fieldErrors?.name?.[0] ? (
                <p className="mt-2 text-sm text-destructive">
                  {state.fieldErrors.name[0]}
                </p>
              ) : null}
            </div>

            {/* Email */}
            <div className="relative group">
              <label
                htmlFor="email"
                className="font-[Space_Grotesk] text-xs font-bold tracking-[0.1em] text-on-surface-variant uppercase absolute -top-2 left-0 text-[10px] opacity-0 group-focus-within:opacity-100 group-focus-within:-top-4 transition-all duration-300"
              >
                Reply Channel
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                required
                maxLength={120}
                className="w-full bg-transparent border-0 border-b border-outline-variant/40 py-3 px-0 text-on-surface font-[Inter] text-base focus:ring-0 focus:border-tertiary placeholder:text-on-surface-variant/50 transition-colors duration-300"
              />
              {state.fieldErrors?.email?.[0] ? (
                <p className="mt-2 text-sm text-destructive">
                  {state.fieldErrors.email[0]}
                </p>
              ) : null}
            </div>

            {/* Message */}
            <div className="relative group mt-8 flex-grow">
              <label
                htmlFor="message"
                className="font-[Space_Grotesk] text-xs font-bold tracking-[0.1em] text-on-surface-variant uppercase absolute -top-2 left-0 text-[10px] opacity-0 group-focus-within:opacity-100 group-focus-within:-top-4 transition-all duration-300"
              >
                Transmission Data
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Message Protocol..."
                rows={4}
                required
                minLength={10}
                maxLength={2000}
                className="w-full bg-surface-container-lowest/50 border border-outline-variant/30 rounded-lg p-4 mt-2 text-on-surface font-[Inter] text-base focus:ring-0 focus:border-secondary focus:bg-surface-container-low/50 placeholder:text-on-surface-variant/40 transition-all duration-300 resize-none h-40"
              />
              {state.fieldErrors?.message?.[0] ? (
                <p className="mt-2 text-sm text-destructive">
                  {state.fieldErrors.message[0]}
                </p>
              ) : null}
            </div>

            {/* Submit */}
            {state.message ? (
              <p
                aria-live="polite"
                className={`text-sm ${
                  state.status === "success"
                    ? "text-green-400"
                    : "text-destructive"
                }`}
              >
                {state.message}
              </p>
            ) : null}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={pending}
              className="mt-8 w-full bg-gradient-to-r from-secondary to-tertiary text-on-secondary font-[Space_Grotesk] text-xs font-bold tracking-[0.1em] uppercase py-4 px-8 rounded-full hover:shadow-[0_0_40px_rgba(221,183,255,0.25)] transition-all duration-300 flex items-center justify-center gap-2 group border border-outline-variant/20"
            >
              {pending ? "TRANSMITTING..." : "TRANSMIT SIGNAL"}
              <Send
                size={14}
                className="group-hover:translate-x-1 transition-transform"
              />
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
}
