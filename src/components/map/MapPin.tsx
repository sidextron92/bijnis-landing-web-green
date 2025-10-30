'use client';

import { useState } from 'react';

interface MapPinProps {
  x: number; // SVG x coordinate (percentage or absolute)
  y: number; // SVG y coordinate (percentage or absolute)
  city: string;
  delay?: number; // Animation delay for stagger effect
}

/**
 * Animated Map Pin Component
 * Custom branded pin with hover animations
 */
export function MapPin({ x, y, city, delay = 0 }: MapPinProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <g
      transform={`translate(${x}, ${y})`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="map-pin cursor-pointer"
      style={{
        animation: `pinPopIn 0.5s ease-out ${delay}s both`,
        pointerEvents: 'all'
      }}
    >
      {/* Pin glow effect (visible on hover) */}
      <circle
        cx="0"
        cy="0"
        r={isHovered ? "35" : "25"}
        fill="#078236"
        opacity={isHovered ? "0.6" : "0.4"}
        filter="blur(12px)"
        className="transition-all duration-300"
      />

      {/* Pin body */}
      <g className={`transition-transform duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}>
        {/* Pin circle */}
        <circle
          cx="0"
          cy="0"
          r="14"
          fill="#01B044"
          stroke="#ffffff"
          strokeWidth="3"
          className="transition-all duration-300"
        />

        {/* Pin pointer */}
        <path
          d="M 0,14 L -8,28 L 8,28 Z"
          fill="#01B044"
          stroke="#ffffff"
          strokeWidth="3"
        />

        {/* Inner dot */}
        <circle
          cx="0"
          cy="0"
          r="6"
          fill="#ffffff"
          opacity="0.9"
        />

        {/* Outer ring for extra visibility */}
        <circle
          cx="0"
          cy="0"
          r="18"
          fill="none"
          stroke="#01B044"
          strokeWidth="2"
          opacity="0.5"
          className="animate-pulse"
        />
      </g>

      {/* City name tooltip (visible on hover) */}
      {isHovered && (
        <g className="animate-fadeIn">
          {/* Tooltip background */}
          <rect
            x="-50"
            y="-50"
            width="100"
            height="30"
            rx="6"
            fill="#01B044"
            opacity="0.98"
            stroke="#ffffff"
            strokeWidth="2"
          />

          {/* City name text */}
          <text
            x="0"
            y="-28"
            textAnchor="middle"
            fill="#ffffff"
            fontSize="16"
            fontWeight="700"
            className="select-none"
          >
            {city}
          </text>
        </g>
      )}
    </g>
  );
}
