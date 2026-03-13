"use client";
import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { SkillsProps } from "@/app/types/skills";
import Image from "next/image";

const SkillsDataProvider = ({ src, width, height, index }: SkillsProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <motion.div
      ref={ref}
      className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        delay: index * 0.05,
        duration: 0.4,
        ease: "easeOut",
      }}
      whileHover={{
        scale: 1.1,
        transition: { duration: 0.2 },
      }}
    >
      <Image
        src={src}
        width={width}
        height={height}
        alt="skill icon"
        style={{
          objectFit: "cover",
          width: "auto",
          height: "auto",
          maxWidth: "50px",
          maxHeight: "50px",
        }}
      />
    </motion.div>
  );
};

export default SkillsDataProvider;
