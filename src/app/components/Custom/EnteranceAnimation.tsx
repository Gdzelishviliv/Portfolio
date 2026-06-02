"use client";
import React from "react";
import { motion } from "framer-motion";
export default function Effect() {
  return (
    <>
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: "100%" }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="fixed inset-0 w-full h-full z-[9999] bg-[#000000] pointer-events-none will-change-transform"
        style={{ transform: "translateX(0%)" }}
      />
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: "100%" }}
        transition={{ duration: 1.7, ease: "easeInOut" }}
        className="fixed inset-0 w-full h-full z-[9999] bg-[#ffffff] pointer-events-none will-change-transform"
        style={{ transform: "translateX(0%)" }}
      />
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: "100%" }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="fixed inset-0 w-full h-full z-[9999] bg-[#000000] pointer-events-none will-change-transform"
        style={{ transform: "translateX(0%)" }}
      />
    </>
  );
}
