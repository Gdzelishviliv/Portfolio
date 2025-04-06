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
    <h2 className="text-white">
      {text}<span className="cursor-blink">|</span>
    </h2>
  );
};

export default Typewriter;
