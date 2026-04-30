"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./theme-provider";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();

  // Show a simple placeholder during SSR to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="theme-toggle-btn" aria-hidden="true">
        <div className="theme-toggle-track">
          <div className="theme-toggle-thumb" />
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle-btn"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {/* Track */}
      <div className="theme-toggle-track">
        {/* Stars / Sun rays decoration */}
        <div className="theme-toggle-decoration">
          <AnimatePresence mode="wait">
            {theme === "dark" ? (
              <motion.div
                key="stars"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="theme-toggle-stars"
              >
                <span className="theme-star theme-star-1" />
                <span className="theme-star theme-star-2" />
                <span className="theme-star theme-star-3" />
              </motion.div>
            ) : (
              <motion.div
                key="rays"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="theme-toggle-rays"
              >
                <span className="theme-ray theme-ray-1" />
                <span className="theme-ray theme-ray-2" />
                <span className="theme-ray theme-ray-3" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Thumb */}
        <motion.div
          className="theme-toggle-thumb"
          layout
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
        >
          <AnimatePresence mode="wait">
            {theme === "dark" ? (
              <motion.div
                key="moon-icon"
                initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
              >
                <Moon size={12} className="theme-toggle-icon-moon" />
              </motion.div>
            ) : (
              <motion.div
                key="sun-icon"
                initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
              >
                <Sun size={12} className="theme-toggle-icon-sun" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </button>
  );
}
