"use client";
import React from "react";

const Button = () => {
  return (
    <a href={"/assets/Cv.pdf"} download className="hidden md:block">
      <button className="absolute md:right-[32px] lg:right-[92px] top-[12px] rounded-2xl text-sm cursor-pointer border-2 border-dashed border-white/300 bg-black/70 backdrop-blur-md px-6 py-3 font-semibold uppercase text-white transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_white] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none" onClick={() => alert('CV Downloaded!')}>
        Download CV
      </button>
    </a>
  );
};

export default Button;
