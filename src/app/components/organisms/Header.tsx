"use client";
import React, { useState, useEffect } from "react";
import BurgerMenu from "../molecules/BurgerMenu";
import Logo from "../atoms/Logo";
import { DesctopHeader } from "../molecules/DesctopHeader";
import Button from "../atoms/Button";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let frameId = 0;

    const updateScrollState = () => {
      frameId = 0;
      const nextIsScrolled = window.scrollY > 50;
      setIsScrolled((current) =>
        current === nextIsScrolled ? current : nextIsScrolled
      );
    };

    const handleScroll = () => {
      if (frameId !== 0) return;
      frameId = window.requestAnimationFrame(updateScrollState);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      if (frameId !== 0) window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 flex justify-between items-center mx-auto w-full max-w-[1920px] px-4 md:px-8 lg:px-24 py-3 md:py-4 gap-4 transition-all duration-300 ease-in-out ${isScrolled
            ? "backdrop-blur-md bg-[rgba(255, 255, 255, 0.3)]"
            : "backdrop-blur-none bg-transparent"
          }`}
        style={{
          zIndex: 60,
          backdropFilter: isScrolled ? "blur(5px)" : "none",
          WebkitBackdropFilter: isScrolled ? "blur(5px)" : "none",
        }}
      >
        <Logo />
        <DesctopHeader />
        <Button />
      </div>
      <BurgerMenu />
      <div id="home" style={{ height: "60px" }} />
    </>
  );
};

export default Header;