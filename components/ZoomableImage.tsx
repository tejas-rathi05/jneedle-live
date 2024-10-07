"use client";

import { useState, useRef } from "react";

export default function ZoomableImage({ src }: { src: string }) {
  const [backgroundPosition, setBackgroundPosition] = useState("50% 50%");
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;

    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const xPos = ((e.clientX - left) / width) * 100;
    const yPos = ((e.clientY - top) / height) * 100;
    setBackgroundPosition(`${xPos}% ${yPos}%`);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden group"
    >
      {/* Static image, visible before hover */}
      <img
        src={src}
        alt="Zoomable"
        className="object-cover w-full h-full transition-opacity duration-300 ease-in-out group-hover:opacity-0"
      />
      {/* Zoomed background image */}
      <div
        className="absolute inset-0 bg-cover bg-no-repeat transition-transform duration-300 ease-in-out group-hover:scale-150"
        style={{
          backgroundImage: `url(${src})`,
          backgroundSize: "100%", // Zoom level
          backgroundPosition,
        }}
      ></div>
    </div>
  );
}
