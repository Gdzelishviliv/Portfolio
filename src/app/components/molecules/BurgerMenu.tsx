"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import BurgerLine from "../atoms/BurgerLine";

const BurgerMenu = () => {
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };
  return (
    <>
      <motion.button
        onClick={toggleOptions}
        initial={{ rotate: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          backgroundColor: "transparent",
          border: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="flex flex-col gap-[5px] justify-center items-center">
          <BurgerLine showOptions={showOptions} position="top" />
          <BurgerLine showOptions={showOptions} position="middle" />
          <BurgerLine showOptions={showOptions} position="bottom" />
        </div>
      </motion.button>
    </>
  );
};

export default BurgerMenu;
