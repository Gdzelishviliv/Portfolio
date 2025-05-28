import { Rancho } from "next/font/google";
import { useTypewriter } from "react-simple-typewriter";

const vt323 = Rancho({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-rancho",
});

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
    <h2 className={`text-white ${vt323.variable} font-secondary md:text-xl lg:text-[22px]`}>
      {text}<span className="font-secondary cursor-blink">|</span>
    </h2>
  );
};

export default Typewriter;
