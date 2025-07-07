"use client";
import React from "react";
import styles from "../../BubbleText.module.css";

const BubbleText = () => {
  return (
    <p className="text-amber-50 text-[16px] md:text-[18px] lg:text-xl w-full font-thin mt-1">
      {"a passionate Full Stack Web Developer with 2 years of experience in building dynamic and scalable web applications. I specialize in both front-end and back-end development, working with modern technologies to create seamless, user-friendly, and performance-driven solutions."
        .split("")
        .map((child, idx) => (
          <span className={styles.hoverText} key={idx}>
            {child}
          </span>
        ))}
    </p>
  );
};

export default BubbleText;
