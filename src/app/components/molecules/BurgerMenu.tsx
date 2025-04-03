"use client";
import { memo, useState } from "react";
import { motion } from "framer-motion";
import BurgerLine from "../atoms/BurgerLine";
import Link from "next/link";

const BurgerMenu = () => {
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };
  return (
    <>
      <motion.button
        aria-label="Toggle menu"
        onClick={toggleOptions}
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
      >
        <div className="flex flex-col gap-[5px] justify-center items-center">
          <BurgerLine showOptions={showOptions} position="top" />
          <BurgerLine showOptions={showOptions} position="middle" />
          <BurgerLine showOptions={showOptions} position="bottom" />
        </div>
      </motion.button>
      {/* options section when its toggled*/}
      {showOptions && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute top-[50px] right-0 backdrop-blur-3xl bg-[rgba(0,0,0,0.3)]-lg"
          style={{ minWidth: "200px" }}
        >
          <ul className="flex flex-col gap-2">
            <li>
              <Link
                href="#about"
                onClick={toggleOptions}
                className="text-lg text-white"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="#projects"
                onClick={toggleOptions}
                className="text-lg text-white"
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                href="#contact"
                onClick={toggleOptions}
                className="text- text-white"
              >
                Contact Me
              </Link>
            </li>
            <li>
              <Link
                href="#skills"
                onClick={toggleOptions}
                className="text- text-white"
              >
                Skills
              </Link>
            </li>
          </ul>
        </motion.div>
      )}
    </>
  );
};

export default memo(BurgerMenu);
