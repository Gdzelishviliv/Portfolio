"use client";

import { motion } from "framer-motion";

const items = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Tailwind CSS",
  "Node.js",
  "MongoDB",
  "PostgreSQL",
  "Git",
  "Figma",
  "REST API",
  "GraphQL",
  "AWS",
  "Docker",
  "CI/CD",
];

export const InfiniteMarquee = () => {
  const reversedItems = [...items].reverse();

  return (
    <div className="relative w-full overflow-hidden py-2 md:py-4">
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#050508] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#050508] to-transparent z-10" />

      <div className="flex">
        <motion.div
          className="flex gap-4 md:gap-6"
          animate={{ x: ["-50%", "0%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {[...reversedItems, ...items].map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 px-4 py-2 md:px-6 md:py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-colors duration-300"
            >
              <span className="text-sm md:text-base text-gray-300 font-medium whitespace-nowrap">
                {item}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default InfiniteMarquee;