"use client";

import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BurgerLine from "../atoms/BurgerLine";
import { useActiveSection } from "../hooks/useActiveSection";

const MENU_ITEMS = ["about", "skills", "projects", "contact"] as const;

const SCROLL_OFFSET = 150;

const Z_INDEX = {
  backdrop: 80,
  panel: 90,
  button: 100,
} as const;

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const panelVariants = {
  hidden: { x: "100%" },
  visible: { x: 0 },
  exit: { x: "100%" },
};

const navVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 },
};

const BurgerMenu = () => {
  const [showOptions, setShowOptions] = useState(false);

  const activeSection = useActiveSection(MENU_ITEMS, SCROLL_OFFSET);

  const menuItems = useMemo(() => MENU_ITEMS, []);

  const toggleOptions = useCallback(() => {
    setShowOptions((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setShowOptions(false);
  }, []);

  // Lock body scroll
  useEffect(() => {
    if (!showOptions) return;

    const body = document.body;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    return () => {
      body.style.overflow = previousOverflow;
    };
  }, [showOptions]);

  // ESC close
  useEffect(() => {
    if (!showOptions) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [showOptions, closeMenu]);

  return (
    <>
      <AnimatePresence mode="wait">
        {showOptions && (
          <>
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={backdropVariants}
              transition={{ duration: 0.3 }}
              onClick={closeMenu}
              className="
                fixed inset-0
                bg-black/60 backdrop-blur-sm
                overscroll-none touch-none
                md:hidden
              "
              style={{ zIndex: Z_INDEX.backdrop }}
            />

            <motion.aside
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={panelVariants}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[280px] md:hidden"
              style={{
                zIndex: Z_INDEX.panel,
                background:
                  "linear-gradient(180deg, rgba(10,10,20,0.98), rgba(20,20,35,0.98))",
                borderLeft: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div className="flex h-full flex-col px-6 pb-8 pt-24">
                <nav className="flex-1">
                  <motion.ul
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={navVariants}
                    className="flex flex-col gap-2"
                  >
                    {menuItems.map((section, index) => (
                      <motion.li
                        key={section}
                        variants={itemVariants}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      >
                        <a
                          href={`#${section}`}
                          onClick={closeMenu}
                          className={`block py-4 px-4 rounded-xl text-lg font-medium uppercase tracking-wide transition-all duration-200 cursor-pointer ${activeSection === section
                              ? "text-white nav-active-rgb"
                              : "text-gray-400 hover:text-white hover:bg-white/5"
                            }`}
                        >
                          <span className="flex items-center gap-4">
                            <span className="text-xs text-gray-500 font-mono">
                              0{index + 1}
                            </span>
                            {section.charAt(0).toUpperCase() + section.slice(1)}
                          </span>
                        </a>
                      </motion.li>
                    ))}
                  </motion.ul>
                </nav>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                  className="border-t border-white/10 pt-6"
                >
                  <p className="text-center text-sm text-gray-500">
                    Scroll or tap to navigate
                  </p>
                </motion.div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        aria-label="Toggle menu"
        aria-expanded={showOptions}
        aria-controls="mobile-menu"
        onClick={toggleOptions}
        whileTap={{ scale: 0.96 }}
        className="
          fixed top-4 right-4
          flex h-11 w-11 items-center justify-center
          rounded-xl border border-white/10 bg-white/5 backdrop-blur-md
          md:hidden will-change-transform
        "
        style={{ zIndex: Z_INDEX.button }}
      >
        <div className="flex flex-col items-center justify-center gap-[5px]">
          <BurgerLine showOptions={showOptions} position="top" />
          <BurgerLine showOptions={showOptions} position="middle" />
          <BurgerLine showOptions={showOptions} position="bottom" />
        </div>
      </motion.button>
    </>
  );
};

export default memo(BurgerMenu);