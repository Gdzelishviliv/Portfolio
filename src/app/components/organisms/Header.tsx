"use client";
import React, { useState, useEffect } from "react";
import BurgerMenu from "../molecules/BurgerMenu";
import Logo from "../atoms/Logo";
import { DesctopHeader } from "../molecules/DesctopHeader";
import Button from "../atoms/Button";

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
        className={`fixed top-0 flex justify-between mx-auto w-full max-w-[1920px] px-4 md:px-8 lg:px-24 lg:py-1.5 items-center transition-all duration-300 ease-in-out ${
          isScrolled
            ? "backdrop-blur-md bg-[rgba(255, 255, 255, 0.3)]"
            : "backdrop-blur-none bg-transparent"
        }`}
        style={{
          zIndex: 9999,
          backdropFilter: isScrolled ? "blur(5px)" : "none",
          WebkitBackdropFilter: isScrolled ? "blur(5px)" : "none",
        }}
      >
        <Logo />
        <DesctopHeader />
        <BurgerMenu />
        <Button/>
      </div>
      <div id="home" style={{ height: "50px" }}></div>
    </>
  );
};

export default Header;
