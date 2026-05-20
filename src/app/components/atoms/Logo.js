"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const Logo = () => {
  const [rotate, setRotate] = useState(false);

  useEffect(() => {
    setRotate(true);
  }, []);

  return (
    <a href="#home" className="cursor-pointer" aria-label="Go to top of page">
      <motion.svg
        aria-label="Website Logo"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="50 30 40 40"
        width="50"
        height="50"
        role="img"
        aria-labelledby="logoTitle"
      >
        <title id="logoTitle">SkillWill Logo</title>
        <desc id="logoDesc">
          An animated logo of SkillWill, rotating with a path design
        </desc>

        <defs>
          <linearGradient id="animatedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff7e5f">
              <animate
                attributeName="stop-color"
                values="#ff7e5f;#feb47b;#6a11cb;#2575fc;#ff7e5f"
                dur="4s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="50%" stopColor="#6a11cb">
              <animate
                attributeName="stop-color"
                values="#6a11cb;#2575fc;#ff7e5f;#feb47b;#6a11cb"
                dur="4s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor="#2575fc">
              <animate
                attributeName="stop-color"
                values="#2575fc;#ff7e5f;#feb47b;#6a11cb;#2575fc"
                dur="4s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>

          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <motion.path
          d="M55,50 L70,40 L70,60 Z"
          stroke="url(#animatedGradient)"
          strokeWidth="4"
          fill="transparent"
          filter="url(#glow)"
          initial={{ strokeDasharray: 99, strokeDashoffset: 0 }}
          animate={{
            strokeDasharray: 10,
            strokeDashoffset: 0,
            rotate: rotate ? 360 : 0,
          }}
          transition={{
            duration: 1,
            delay: 1.2,
            rotate: {
              repeat: Infinity,
              duration: 20,
              ease: "linear",
            },
          }}
        />
      </motion.svg>
    </a>
  );
};

export default Logo;