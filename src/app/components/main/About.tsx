import React from "react";
import ProfileImg from "../../../../public/assets/profile.jpg";
import Image from "next/image";
import Typewriter from "../atoms/Typewriter";

const About = () => {
  return (
    <>
      <section id="about" className="mx-4 mt-6 relative flex flex-col gap-5 md:mx-8 md:mt-12 md:flex-row md:gap-12 lg:mx-24 lg:mt-16 lg:gap-16">
      <div className="flex flex-col relative">
        <h1 className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl">
        Hi I<span className="gradient-text">’</span>m
        </h1>
        <h2 className="gradient-text text-lg sm:text-xl md:text-2xl lg:text-3xl mt-1">
        Ivane
        <br /> Gdzelishvili
        </h2>
        <Typewriter />
        <p className="text-white text-sm sm:text-base md:text-lg mt-4 max-w-[220px] sm:max-w-sm md:max-w-md lg:max-w-lg">
        a passionate Full Stack Web Developer with 2 years of experience in
        building dynamic and scalable web applications. I specialize in both
        front-end and back-end development, working with modern technologies
        to create seamless, user-friendly, and performance-driven solutions.
        </p>
      </div>
      <div className="absolute right-0 top-[0px] flex justify-center items-center md:justify-end md:items-start">
        <div className="w-[150px] sm:w-32 md:w-40 z-10">
        <Image
          priority
          className="rounded-4xl object-cover"
          src={ProfileImg}
          alt="Profile Image"
          layout="responsive"
          width={150}
          height={150}
        />
        </div>
      </div>
      </section>
      {/* <section id="about" className="mx-[16px] mt-[25px] relative">
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
      </section> */}
    </>
  );
};

export default About;
