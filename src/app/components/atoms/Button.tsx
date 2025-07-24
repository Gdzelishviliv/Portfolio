"use client";
import React, { useState } from "react";

const Button = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const handleDownload = async () => {
    setIsDownloading(true);

    try {
      const cvUrl = "/assets/Cv.pdf";
      const link = document.createElement("a");
      link.href = cvUrl;
      link.download = "Ivane_Gdzelishvili_CV.pdf";
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => {
        setIsDownloading(false);
      }, 1000);
    } catch (error) {
      console.error("Download failed:", error);
      setIsDownloading(false);
    }
  };
  return (
    <button
      onClick={handleDownload}
      disabled={isDownloading}
      aria-label={isDownloading ? "Downloading CV..." : "Download CV"}
      title="Download CV"
      className="hidden md:block rounded-2xl text-[8px] md:text-[10px] lg:text-[12px] cursor-pointer border-2 border-dashed border-white/300 bg-black/70 backdrop-blur-md px-3 py-3 font-semibold uppercase text-white transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_white] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none"
    >
      Download CV
    </button>
  );
};

export default Button;
