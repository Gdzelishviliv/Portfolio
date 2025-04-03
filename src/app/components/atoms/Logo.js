"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

const Logo = () => {
  const [rotate, setRotate] = useState(false);

  useEffect(() => {
    setRotate(true);
  }, []);

  return (
    <Link href="/#">
      <motion.svg
        aria-label="website logo"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="50 30 40 40"
        width="50"
        height="50"
      >
        <motion.path
          d="M55,50 L70,40 L70,60 Z"
          stroke="white"
          strokeWidth="4"
          fill="transparent"
          initial={{ strokeDasharray: 99, strokeDashoffset: 0 }}
          animate={{
            strokeDasharray: 10,
            strokeDashoffset: 0,
            rotate: rotate ? 360 : 0,
          }}
          transition={{
            duration: 1,
            delay: 0.1,
            rotate: {
              repeat: Infinity,
              duration: 20,
              ease: "linear",
            },
          }}
        />
      </motion.svg>
    </Link>
  );
};

export default Logo;
