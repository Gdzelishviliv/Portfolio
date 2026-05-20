"use client";
import { useTypewriter } from "react-simple-typewriter";

const Typewriter = () => {
  const [text] = useTypewriter({
    words: [
      "Full Stack Web Developer",
      "Next.js Enthusiast",
      "Software Engineer",
      "Tech Problem Solver",
      "Lifelong Learner",
    ],
    loop: true,
    typeSpeed: 100,
    deleteSpeed: 50,
    delaySpeed: 1000,
  });

  return (
    <h2 className="text-white font-secondary md:text-xl lg:text-[22px]">
      {text}<span className="font-secondary cursor-blink gradient-text">|</span>
    </h2>
  );
};

export default Typewriter;
