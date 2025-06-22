"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export function CreativeHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let devicePixelRatio: number;
    let isMobile = false;
    let animationTime = 0;

    // Detect mobile device
    const checkMobile = () => {
      isMobile = window.innerWidth < 768 || "ontouchstart" in window;
    };

    checkMobile();

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      devicePixelRatio = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      canvas.width = rect.width * devicePixelRatio;
      canvas.height = rect.height * devicePixelRatio;

      ctx.scale(devicePixelRatio, devicePixelRatio);
    };

    setCanvasDimensions();
    window.addEventListener("resize", () => {
      setCanvasDimensions();
      checkMobile();
    });

    // Mouse/Touch position
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let isInteracting = false;

    // Mouse events for desktop
    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile) return;
      const rect = canvas.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
      isInteracting = true;
    };

    // Touch events for mobile
    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      targetX = touch.clientX - rect.left;
      targetY = touch.clientY - rect.top;
      isInteracting = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      targetX = touch.clientX - rect.left;
      targetY = touch.clientY - rect.top;
      isInteracting = true;
    };

    const handleTouchEnd = () => {
      isInteracting = false;
    };

    // Add event listeners
    window.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("touchstart", handleTouchStart, { passive: false });
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false });
    canvas.addEventListener("touchend", handleTouchEnd);

    class Particle {
      x: number;
      y: number;
      size: number;
      baseX: number;
      baseY: number;
      density: number;
      color: string;
      distance: number;
      waveOffset: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.baseX = x;
        this.baseY = y;
        this.size = isMobile ? Math.random() * 3 + 1.5 : Math.random() * 5 + 2;
        this.density = Math.random() * 30 + 1;
        this.distance = 0;
        this.waveOffset = Math.random() * Math.PI * 2;

        const grayValue = Math.random() * 100 + 155;
        this.color = `rgb(${grayValue}, ${grayValue}, ${grayValue})`;
      }

      update() {
        // Calculate distance between interaction point and particle
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        this.distance = Math.sqrt(dx * dx + dy * dy);

        if (isInteracting) {
          // Interactive mode (mouse hover or touch)
          const forceDirectionX = dx / this.distance;
          const forceDirectionY = dy / this.distance;

          const maxDistance = isMobile ? 80 : 100;
          const force = (maxDistance - this.distance) / maxDistance;

          if (this.distance < maxDistance) {
            const directionX =
              forceDirectionX * force * this.density * (isMobile ? 0.7 : 1);
            const directionY =
              forceDirectionY * force * this.density * (isMobile ? 0.7 : 1);

            this.x -= directionX;
            this.y -= directionY;
          } else {
            this.returnToBase();
          }
        } else {
          // Ambient mode - gentle wave motion for mobile, static for desktop
          if (isMobile) {
            const waveX = Math.sin(animationTime * 0.01 + this.waveOffset) * 2;
            const waveY =
              Math.cos(animationTime * 0.008 + this.waveOffset) * 1.5;

            const targetX = this.baseX + waveX;
            const targetY = this.baseY + waveY;

            this.x += (targetX - this.x) * 0.02;
            this.y += (targetY - this.y) * 0.02;
          } else {
            this.returnToBase();
          }
        }
      }

      returnToBase() {
        if (this.x !== this.baseX) {
          const dx = this.x - this.baseX;
          this.x -= dx / 10;
        }
        if (this.y !== this.baseY) {
          const dy = this.y - this.baseY;
          this.y -= dy / 10;
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }
    }

    // Create particle grid
    const particlesArray: Particle[] = [];
    const gridSize = isMobile ? 40 : 30; // Larger grid spacing on mobile for better performance

    function init() {
      particlesArray.length = 0;

      if (!canvas) return;

      const canvasWidth = canvas.width / devicePixelRatio;
      const canvasHeight = canvas.height / devicePixelRatio;

      const numX = Math.floor(canvasWidth / gridSize);
      const numY = Math.floor(canvasHeight / gridSize);

      for (let y = 0; y < numY; y++) {
        for (let x = 0; x < numX; x++) {
          const posX = x * gridSize + gridSize / 2;
          const posY = y * gridSize + gridSize / 2;
          particlesArray.push(new Particle(posX, posY));
        }
      }
    }

    init();

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      animationTime++;

      // Smooth mouse/touch following
      mouseX += (targetX - mouseX) * 0.1;
      mouseY += (targetY - mouseY) * 0.1;

      // Draw particles and connections
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw(ctx);

        // Draw connections (reduced on mobile for performance)
        const connectionDistance = isMobile ? 25 : 30;
        const maxConnections = isMobile ? 3 : 5;

        let connectionCount = 0;
        for (
          let j = i + 1;
          j < particlesArray.length && connectionCount < maxConnections;
          j++
        ) {
          const dx = particlesArray[i].x - particlesArray[j].x;
          const dy = particlesArray[i].y - particlesArray[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            const opacity = (0.3 - distance / 100) * (isMobile ? 0.8 : 1);
            ctx.strokeStyle = `rgba(200, 200, 200, ${opacity})`;
            ctx.lineWidth = isMobile ? 0.3 : 0.5;
            ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
            ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
            ctx.stroke();
            connectionCount++;
          }
        }
      }
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      setCanvasDimensions();
      checkMobile();
      init();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("resize", setCanvasDimensions);
    };
  }, []);

  return (
    <motion.div
      className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[450px] relative bg-black rounded-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full rounded-lg"
        style={{ display: "block" }}
      />
    </motion.div>
  );
}
