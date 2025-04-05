import React from "react";
import TypewritingEffect from "typewriter-effect";

const Typewriter = () => {
  return (
    <h2 className="text-white">
      <TypewritingEffect
        options={{
          strings: [
            "Full Stack Web Developer",
            "Next.js Enthusiast",
            "Software Engineer",
            "Tech Problem Solver",
            "Lifelong Learner",
          ],
          autoStart: true,
          loop: true,
          delay: 100,
        }}
      />
    </h2>
  );
};

export default Typewriter;
