"use client";
import { memo, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BurgerLine from "../atoms/BurgerLine";
import { Link } from "react-scroll";

const BurgerMenu = () => {
  const [showOptions, setShowOptions] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const toggleOptions = () => {
    setShowOptions((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setShowOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <motion.button
        aria-label="Toggle menu"
        onClick={toggleOptions}
        ref={buttonRef}
        initial={{ rotate: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          backgroundColor: "transparent",
          border: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
        className="lg:hidden"
      >
        <div className="flex flex-col gap-[5px] justify-center items-center">
          <BurgerLine showOptions={showOptions} position="top" />
          <BurgerLine showOptions={showOptions} position="middle" />
          <BurgerLine showOptions={showOptions} position="bottom" />
        </div>
      </motion.button>

      <AnimatePresence>
        {showOptions && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.3, ease: [0.25, 0.8, 0.25, 1] }}
            style={{
              zIndex: 9999,
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              background:
                "linear-gradient(135deg, rgba(0,0,0,0.8), rgba(50,50,50,0.8))",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
            className="absolute top-[50px] right-0 rounded-lg p-6 lg:w-[220px] w-[170px] flex flex-col gap-4 shadow-lg"
          >
            <motion.ul
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              {["about", "skills", "projects", "contact"].map((section) => (
                <motion.li
                  key={section}
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1 },
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <Link
                    onClick={toggleOptions}
                    to={section}
                    smooth={true}
                    duration={300}
                    className="text-lg text-white hover:text-gray-300 transition-colors duration-200"
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default memo(BurgerMenu);
