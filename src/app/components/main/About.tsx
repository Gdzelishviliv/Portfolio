import React from "react";
import ProfileImg from "../../../../public/assets/profile.jpg";
import Image from "next/image";
import Typewriter from "../atoms/Typewriter";

const About = () => {
  return (
    <>
      <section id="about" className="mx-[16px] mt-[25px] relative">
        <div className="flex flex-col relative">
          <h1 className="text-white text-[24px]">
            Hi I<span className="gradient-text">’</span>m
          </h1>
          <h2 className="gradient-text text-[23px] mt-[5px]">
            Ivane
            <br /> Gdzelishvili
          </h2>
          <Typewriter />
          <p className="text-white text-[14px] mt-[15px] min-w-[200px] max-w-[220px]">
            a passionate Full Stack Web Developer with 2 years of experience in
            building dynamic and scalable web applications. I specialize in both
            front-end and back-end development, working with modern technologies
            to create seamless, user-friendly, and performance-driven solutions.
          </p>
        </div>
        <div className="w-[150px] absolute right-0 top-[0px] z-[-1] ">
          <Image
            priority
            className="rounded-4xl"
            src={ProfileImg}
            alt="Profile Image"
          />
        </div>
      </section>
    </>
  );
};

export default About;
