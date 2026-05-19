"use client";
import { memo, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BurgerLine from "../atoms/BurgerLine";
import { Link } from "react-scroll";

const BurgerMenu = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

  const toggleOptions = () => {
    setShowOptions((prev) => !prev);
  };

  const closeMenu = () => {
    setShowOptions(false);
  };

  // Detect active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "skills", "projects", "contact"];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (showOptions) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showOptions]);

  const menuItems = ["about", "skills", "projects", "contact"];

  return (
    <>
      {/* Burger Button */}
      <motion.button
        aria-label="Toggle menu"
        onClick={toggleOptions}
        className="md:hidden relative z-[10001] w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm"
        whileTap={{ scale: 0.95 }}
      >
        <div className="flex flex-col gap-[5px] justify-center items-center">
          <BurgerLine showOptions={showOptions} position="top" />
          <BurgerLine showOptions={showOptions} position="middle" />
          <BurgerLine showOptions={showOptions} position="bottom" />
        </div>
      </motion.button>

      {/* Full Screen Menu Overlay */}
      <AnimatePresence>
        {showOptions && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeMenu}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998] md:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[280px] z-[10000] md:hidden"
              style={{
                background: "linear-gradient(180deg, rgba(10,10,20,0.98), rgba(20,20,35,0.98))",
                borderLeft: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              {/* Menu Content */}
              <div className="flex flex-col h-full pt-24 px-6 pb-8">
                {/* Navigation Links */}
                <nav className="flex-1">
                  <motion.ul
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.08,
                          delayChildren: 0.1,
                        },
                      },
                    }}
                    className="flex flex-col gap-2"
                  >
                    {menuItems.map((section, index) => (
                      <motion.li
                        key={section}
                        variants={{
                          hidden: { opacity: 0, x: 20 },
                          visible: { opacity: 1, x: 0 },
                        }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      >
                        <Link
                          onClick={closeMenu}
                          to={section}
                          smooth={true}
                          duration={300}
                          className={`block py-4 px-4 rounded-xl text-lg font-medium uppercase tracking-wide transition-all duration-200 cursor-pointer ${
                            activeSection === section
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
                        </Link>
                      </motion.li>
                    ))}
                  </motion.ul>
                </nav>

                {/* Bottom Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                  className="pt-6 border-t border-white/10"
                >
                  <p className="text-gray-500 text-sm text-center">
                    Scroll or tap to navigate
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default memo(BurgerMenu);
