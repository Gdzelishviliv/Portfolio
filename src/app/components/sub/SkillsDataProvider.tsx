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

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  const animationDelay = 0.3;
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      variants={imageVariants}
      animate={inView ? "visible" : "hidden"}
      custom={index}
      transition={{
        delay: index * animationDelay,
        duration: 0.6,
        ease: "easeOut",
      }}
      whileInView={{
        scale:1.05,
        opacity:1,
        transition:{
          type:"spring",
          stiffness:100,
          damping:10,
          duration:0.5,
        }
      }}
      whileHover={{
        scale:1.1,
        rotate:5,
        transition:{
          duration:0.3,
          ease:"easeInOut",
        }
      }}
    >
      <Image src={src} width={width} height={height} alt="skills image" />
    </motion.div>
  );
};

export default SkillsDataProvider;
