"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, itemVariant } from "@/lib/animations";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="pt-[140px] px-[5vw] pb-[120px] max-w-[1280px] mx-auto w-full min-h-[70vh] flex items-center justify-center">
      {/* Ambient Background */}
      <div className="fixed inset-0 z-[-1] pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.06 }}
          transition={{ duration: 2 }}
          className="absolute top-1/4 left-1/3 w-[400px] h-[400px] bg-secondary rounded-full blur-[120px]"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.04 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-tertiary rounded-full blur-[150px]"
        />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="text-center"
      >
        {/* 404 Number */}
        <motion.div variants={fadeInUp} className="relative mb-8">
          <span className="font-[Inter] text-[clamp(120px,20vw,240px)] font-extrabold leading-none tracking-[-0.05em] text-on-surface/5 select-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-[Inter] text-[clamp(120px,20vw,240px)] font-extrabold leading-none tracking-[-0.05em] text-gradient">
              404
            </span>
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          variants={itemVariant}
          className="inline-flex items-center gap-2 bg-secondary/5 border border-secondary/10 rounded-full px-4 py-1.5 mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
          <span className="font-[Space_Grotesk] text-xs font-bold tracking-[0.1em] text-secondary uppercase">
            Signal Lost
          </span>
        </motion.div>

        {/* Message */}
        <motion.h1
          variants={itemVariant}
          className="font-[Inter] text-[clamp(28px,4vw,48px)] font-bold leading-[1.2] tracking-[-0.02em] text-on-surface mb-4"
        >
          Page Not Found
        </motion.h1>

        <motion.p
          variants={itemVariant}
          className="font-[Inter] text-lg leading-[1.6] text-on-surface-variant max-w-md mx-auto mb-10"
        >
          The transmission you&apos;re looking for doesn&apos;t exist or has been moved to another frequency.
        </motion.p>

        {/* Actions */}
        <motion.div
          variants={itemVariant}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/"
            className="bg-gradient-to-r from-secondary to-tertiary text-on-secondary font-[Space_Grotesk] text-xs font-bold tracking-[0.1em] uppercase px-8 py-4 rounded-full hover:shadow-[0_0_40px_rgba(221,183,255,0.25)] transition-all duration-300 flex items-center gap-2 group border border-outline-variant/20"
          >
            <Home size={14} />
            Return Home
          </Link>
          <button
            onClick={() => history.back()}
            className="glass-panel font-[Space_Grotesk] text-xs font-bold tracking-[0.1em] text-on-surface uppercase px-8 py-4 rounded-full hover:border-secondary hover:bg-secondary/5 transition-all duration-300 flex items-center gap-2 group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Go Back
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
