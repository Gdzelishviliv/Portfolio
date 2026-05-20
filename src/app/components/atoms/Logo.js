"use client";
import { motion } from "framer-motion";

const Logo = () => {
  return (
    <a href="#home" className="cursor-pointer group" aria-label="Go to top of page">
      <motion.svg
        aria-label="Website Logo"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 50 50"
        width="44"
        height="44"
        role="img"
        aria-labelledby="logoTitle"
        className="md:w-[50px] md:h-[50px]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <title id="logoTitle">SkillWill Logo</title>
        <defs>
          {/* Animated gradient definition */}
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
          
          {/* Glow filter */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {/* Main logo path with animated gradient */}
        <motion.path
          d="M10,25 L25,10 L25,40 Z M25,10 L40,25 L25,40 Z"
          stroke="url(#animatedGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          filter="url(#glow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        
        {/* Rotating outer ring */}
        <motion.circle
          cx="25"
          cy="25"
          r="22"
          stroke="url(#animatedGradient)"
          strokeWidth="1.5"
          strokeDasharray="8 6"
          fill="none"
          opacity="0.6"
          animate={{ rotate: 360 }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ transformOrigin: "center" }}
        />
      </motion.svg>
    </a>
  );
};

export default Logo;
