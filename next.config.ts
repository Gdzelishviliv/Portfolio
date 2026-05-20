import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  
  // Optimize bundle imports
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react', 'swiper'],
  },
};

export default nextConfig;
