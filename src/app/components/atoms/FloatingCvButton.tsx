"use client";

import { Download } from "lucide-react";
import { useState } from "react";

export default function FloatingCVButton() {
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
    <>
      <button
        onClick={handleDownload}
        disabled={isDownloading}
        className={`fixed bottom-6 right-6 z-50 md:hidden
                   h-14 w-14 ${
                     isDownloading
                       ? "bg-green-600 hover:bg-green-600 scale-95"
                       : "bg-white/10 backdrop-blur-xl hover:bg-green-600/90 hover:backdrop-blur-none"
                   } hover:bg-green-700
                   rounded-full shadow-lg hover:shadow-xl
                   flex items-center justify-center
                   transition-all duration-300 ease-in-out
                   animate-float hover:animate-pulse
                   disabled:opacity-70 disabled:cursor-not-allowed
                   focus:outline-none focus:ring-4 focus:ring-blue-300`}
        aria-label={isDownloading ? "Downloading CV..." : "Download CV"}
        style={{
          backdropFilter: isDownloading ? "none" : "blur(16px)",
          WebkitBackdropFilter: isDownloading ? "none" : "blur(16px)",
        }}
        title="Download CV"
      >
        <Download
          className={`h-6 w-6 text-white transition-all duration-300 relative z-10 ${
            isDownloading ? "animate-bounce scale-110" : "group-hover:scale-110"
          }`}
        />
      </button>
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes shine {
          0% {
            transform: translateY(-100%);
            opacity: ;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(100%);
            opacity: 0;
          }
        }

        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.9);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-shine {
          animation: shine 2.5s ease-in-out infinite;
          animation-delay: 1.5s;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Enhanced touch feedback */
        @media (hover: none) and (pointer: coarse) {
          button:active {
            transform: translateY(-6px) scale(0.98);
            transition: all 0.1s ease-out;
          }
        }

        /* Smooth backdrop filter transition */
        button {
          transition:
            background-color 0.5s cubic-bezier(0.4, 0, 0.2, 1),
            backdrop-filter 0.5s cubic-bezier(0.4, 0, 0.2, 1),
            transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
            box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </>
  );
}
