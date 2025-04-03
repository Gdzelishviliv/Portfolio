"use client";
import React, { useState, useEffect } from "react";
import BurgerMenu from "../molecules/BurgerMenu";
import Logo from "../atoms/Logo";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`flex justify-between sticky inset-x-0 mx-auto w-full max-w-[1920px] px-4 items-center pt-2 transition-all duration-300 ease-in-out ${
        isScrolled
          ? "backdrop-blur-md bg-[rgba(0,0,0,0.6)]"
          : "backdrop-blur-none bg-transparent"
      }`}
    >
      <Logo />
      <BurgerMenu />
    </div>
  );
};

export default Header;
