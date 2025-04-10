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
    <>
      <div
        className={`fixed top-0 left-0 flex justify-between mx-auto w-full max-w-[1920px] px-4 items-center transition-all duration-300 ease-in-out ${
          isScrolled
            ? "backdrop-blur-md bg-[rgba(255, 255, 255, 0.3]"
            : "backdrop-blur-none bg-transparent"
        }`}
        style={{
          zIndex: 9999,
          backdropFilter: isScrolled ? "blur(5px)" : "none",
          WebkitBackdropFilter: isScrolled ? "blur(5px)" : "none",
        }}
      >
        <Logo />
        <BurgerMenu />
      </div>
      <div style={{height:"50px"}}></div>
    </>
  );
};

export default Header;
