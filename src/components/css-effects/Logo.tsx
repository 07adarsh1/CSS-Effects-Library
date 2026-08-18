import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export function Logo({ className = '', size = 32 }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 120"
      width={size}
      height={size}
      fill="none"
      className={`shrink-0 transition-transform duration-300 hover:scale-105 ${className}`}
    >
      <defs>
        {/* Background Gradient (Cyan to Purple) */}
        <linearGradient id="site-logo-bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00a6ff" />
          <stop offset="50%" stopColor="#4f46e5" />
          <stop offset="100%" stopColor="#9333ea" />
        </linearGradient>

        {/* Code Symbol Gradient */}
        <linearGradient id="site-logo-code-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="50%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#c084fc" />
        </linearGradient>

        {/* Drop Shadow */}
        <filter id="site-logo-shadow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#000000" floodOpacity="0.35" />
        </filter>
      </defs>

      {/* Back Layer: Tilted Vibrant Gradient Squircle */}
      <rect
        x="12"
        y="12"
        width="68"
        height="68"
        rx="20"
        transform="rotate(-12 46 46)"
        fill="url(#site-logo-bg-grad)"
      />

      {/* Front Layer: Dark Card with Thick White Border */}
      <rect
        x="34"
        y="26"
        width="76"
        height="76"
        rx="24"
        fill="#09090f"
        stroke="#ffffff"
        strokeWidth="7"
        filter="url(#site-logo-shadow)"
      />

      {/* Code Brackets & Slash */}
      {/* Left < bracket */}
      <path
        d="M57 52 L47 64 L57 76"
        fill="none"
        stroke="url(#site-logo-code-grad)"
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Middle / slash */}
      <path
        d="M72 47 L62 81"
        fill="none"
        stroke="url(#site-logo-code-grad)"
        strokeWidth="5.5"
        strokeLinecap="round"
      />

      {/* Right > bracket */}
      <path
        d="M77 52 L87 64 L77 76"
        fill="none"
        stroke="url(#site-logo-code-grad)"
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

