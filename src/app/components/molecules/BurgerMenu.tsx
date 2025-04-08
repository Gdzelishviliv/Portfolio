"use client";
import { memo, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BurgerLine from "../atoms/BurgerLine";
import Link from "next/link";

const BurgerMenu = () => {
  const [showOptions, setShowOptions] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const toggleOptions = () => {
    setShowOptions((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      menuRef.current && !menuRef.current.contains(event.target as Node) &&
      buttonRef.current && !buttonRef.current.contains(event.target as Node)
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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ zIndex: 9999 }}
            className="absolute top-[50px] right-0 rounded-md p-4 backdrop-blur-3xl bg-[rgba(0,0,0,0.3)] lg:w-[200px] w-[150px] flex flex-col gap-2 z-50"
          >
            <ul>
              <li>
                <Link
                  href="#about"
                  onClick={toggleOptions}
                  className="text-lg text-white hover:text-gray-300"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#projects"
                  onClick={toggleOptions}
                  className="text-lg text-white hover:text-gray-300"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  onClick={toggleOptions}
                  className="text-lg text-white hover:text-gray-300"
                >
                  Contact Me
                </Link>
              </li>
              <li>
                <Link
                  href="#skills"
                  onClick={toggleOptions}
                  className="text-lg text-white hover:text-gray-300"
                >
                  Skills
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default memo(BurgerMenu);
