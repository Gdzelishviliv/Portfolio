"use client"

import { Download } from "lucide-react"
import { useState } from "react"

export default function FloatingCVButton() {
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = async () => {
    setIsDownloading(true)

    try {
      const cvUrl = "/assets/Cv.pdf" 
      const link = document.createElement("a")
      link.href = cvUrl
      link.download = "Ivane_Gdzelishvili_CV.pdf"
      link.target = "_blank"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      setTimeout(() => {
        setIsDownloading(false)
      }, 1000)
    } catch (error) {
      console.error("Download failed:", error)
      setIsDownloading(false)
    }
  }

  return (
    <>
      <button
        onClick={handleDownload}
        disabled={isDownloading}
        className="fixed bottom-6 right-6 z-50 md:hidden
                   h-14 w-14 bg-blue-600 hover:bg-blue-700 
                   rounded-full shadow-lg hover:shadow-xl
                   flex items-center justify-center
                   transition-all duration-300 ease-in-out
                   animate-float hover:animate-pulse
                   disabled:opacity-70 disabled:cursor-not-allowed
                   focus:outline-none focus:ring-4 focus:ring-blue-300"
        aria-label={isDownloading ? "Downloading CV..." : "Download CV"}
        title="Download CV"
      >
        <Download
          className={`h-6 w-6 text-white transition-transform duration-200 ${isDownloading ? "animate-bounce" : ""}`}
        />
      </button>
      {isDownloading && (
        <div
          className="fixed bottom-24 right-6 z-40 md:hidden
                        bg-green-500 text-white px-3 py-2 rounded-lg
                        text-sm font-medium shadow-lg
                        animate-fade-in"
        >
          Downloading CV...
        </div>
      )}
    </>
  )
}
